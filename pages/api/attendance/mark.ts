import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    const client = await clientPromise;
    const db = client.db(); // Use the default database from the connection string

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await db.collection('attendance').findOne({ email, date: today });

    if (existingRecord) {
      return res.status(409).json({ message: 'Attendance already marked for today' });
    }

    await db.collection('attendance').insertOne({ email, date: today, status: 'Present' });

    res.status(201).json({ message: 'Attendance marked successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
