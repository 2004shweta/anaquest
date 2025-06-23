import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { period = 'week', topic = 'All', testType = 'All' } = req.query;
  try {
    const client = await clientPromise;
    const usersCollection = client.db().collection('users');
    // Build filter for topic and testType if needed (placeholder, as scores array is not yet used)
    let filter: any = {};
    // In the future, filter by scores array for period, topic, testType
    // For now, just filter by topic/testType if they exist as top-level fields (not implemented yet)
    // If you want to filter by topic/testType in the future, you can use $elemMatch on scores
    const users = await usersCollection
      .find(filter, { projection: { name: 1, xp: 1, photo: 1, email: 1 } })
      .sort({ xp: -1 })
      .limit(20)
      .toArray();
    // Add mock topic/testType for now
    const withTopicType = users.map((u, i) => ({
      name: u.name,
      xp: u.xp ?? 0,
      photo: u.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'User')}&background=random`,
      topic: ["Quant", "Verbal", "Reasoning"][i % 3],
      testType: ["CAT", "GRE", "SSC"][i % 3],
    })).filter(u =>
      (topic === 'All' || u.topic === topic) &&
      (testType === 'All' || u.testType === testType)
    );
    res.status(200).json(withTopicType);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
} 