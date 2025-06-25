import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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
    // Generate OTP and expiry
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
    await usersCollection.insertOne({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      xp: 0,
      photo: '',
      scores: [],
      admin: isAdmin,
      verified: false,
      otp,
      otpExpiry
    });

    // Send OTP email
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
      subject: 'Your Anaquest OTP Verification Code',
      text: `Hi ${name},\n\nYour OTP code for Anaquest registration is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.`,
      html: `<p>Hi <strong>${name}</strong>,</p><p>Your OTP code for Anaquest registration is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p><p>If you did not request this, please ignore this email.</p>`
    });
    return res.status(201).json({ message: 'OTP sent to email. Please verify to complete registration.' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error?.toString() || 'Unknown error' });
  }
} 