import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword || typeof newPassword !== 'string' || newPassword.trim().length < 6) {
    return res.status(400).json({ message: 'Email, OTP, and new password (min 6 chars) are required.' });
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
    if (!user.otp || !user.otpExpiry) {
      return res.status(400).json({ message: 'No OTP found. Please request a new one.' });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }
    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ message: 'OTP expired.' });
    }
    const hashedPassword = await hash(newPassword, 10);
    await usersCollection.updateOne(
      { email: normalizedEmail },
      { $set: { password: hashedPassword }, $unset: { otp: '', otpExpiry: '' } }
    );
    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error?.toString() || 'Unknown error' });
  }
} 