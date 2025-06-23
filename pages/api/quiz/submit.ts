import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const { email, score, topic, testType, timestamp } = req.body;
  if (!email || score == null || !topic || !testType || !timestamp) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const client = await clientPromise;
    const usersCollection = client.db().collection('users');
    // XP logic: 10 XP per correct answer (example)
    const xpToAdd = Number(score) * 10;
    await usersCollection.updateOne(
      { email },
      {
        $inc: { xp: xpToAdd },
        $push: {
          scores: {
            score: Number(score),
            topic,
            testType,
            timestamp: new Date(timestamp),
          },
        },
      }
    );
    return res.status(200).json({ message: 'Score and XP updated' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
} 