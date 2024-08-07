import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, date, reason } = req.body;

    const client = await clientPromise;
    const db = client.db(); // Use the default database from the connection string

    await db.collection('leaveRequests').insertOne({ email, date, reason, status: 'Pending' });

    res.status(201).json({ message: 'Leave request submitted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
