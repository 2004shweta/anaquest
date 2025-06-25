import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const client = await clientPromise;
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (!user.verified) {
      return res.status(400).json({ message: 'User is not verified.' });
    }
    // Generate OTP and expiry
    const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await usersCollection.updateOne(
      { email: normalizedEmail },
      { $set: { otp, otpExpiry } }
    );
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
      subject: 'Your Anaquest Password Reset OTP',
      text: `Hi,\n\nYour OTP code for Anaquest password reset is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request this, please ignore this email.`,
      html: `<p>Hi,</p><p>Your OTP code for Anaquest password reset is: <strong>${otp}</strong></p><p>This code will expire in 10 minutes.</p><p>If you did not request this, please ignore this email.</p>`
    });
    return res.status(200).json({ message: 'OTP sent to email for password reset.' });
  } catch (error) {
    console.error('Password reset OTP error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error?.toString() || 'Unknown error' });
  }
} 