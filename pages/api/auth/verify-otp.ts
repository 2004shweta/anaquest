import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }
  const normalizedEmail = email.trim().toLowerCase();
  try {
    const client = await clientPromise;
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (user.verified) {
      return res.status(400).json({ message: 'User already verified.' });
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
    await usersCollection.updateOne(
      { email: normalizedEmail },
      { $set: { verified: true }, $unset: { otp: '', otpExpiry: '' } }
    );
    return res.status(200).json({ message: 'Account verified successfully.' });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error?.toString() || 'Unknown error' });
  }
} 