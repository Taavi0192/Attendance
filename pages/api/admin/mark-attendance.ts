import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, date, status } = req.body;

    const client = await clientPromise;
    const db = client.db();

    const newRecord = await db.collection('attendance').insertOne({ email, date: new Date(date), status });

    res.status(201).json({ _id: newRecord.insertedId, email, date, status });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
