import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password || typeof password !== 'string' || password.trim().length < 6) {
    return res.status(400).json({ message: 'Missing required fields or password too short (min 6 chars)' });
  }
  const normalizedEmail = email.trim().toLowerCase();

  const adminEmails = ["harshvardhan7274@gmail.com", "superuser@example.com"];

  try {
    const client = await clientPromise;
    const usersCollection = client.db().collection('users');
    const existingUser = await usersCollection.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await hash(password, 10);
    const isAdmin = adminEmails.includes(normalizedEmail);
    await usersCollection.insertOne({ name, email: normalizedEmail, password: hashedPassword, xp: 0, photo: '', scores: [], admin: isAdmin });

    // Send welcome email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_GMAIL_USER,
        pass: process.env.CONTACT_GMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"Anaquest" <${process.env.CONTACT_GMAIL_USER}>`,
      to: email,
      subject: '🎉 Welcome to Anaquest – Your Learning Journey Begins! 🚀',
      text: `Hi ${name},\n\nThank you for registering with Anaquest. We are delighted to welcome you to our learning community. 🎓\n\nWith Anaquest, you can access a wide range of quizzes and resources designed to help you achieve your academic goals. If you have any questions or need assistance, our support team is here to help.\n\nWishing you success on your learning journey! 🌟\n\nBest regards,\nThe Anaquest Team`,
      html: `<p>Hi <strong>${name}</strong>,</p><p>Thank you for registering with <strong>Anaquest</strong>. We are delighted to welcome you to our learning community. 🎓</p><p>With Anaquest, you can access a wide range of quizzes and resources designed to help you achieve your academic goals. If you have any questions or need assistance, our support team is here to help.</p><p>Wishing you success on your learning journey! <span style="font-size:1.2em;">🌟</span></p><p>Best regards,<br/>The Anaquest Team</p>`
    });
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
} 