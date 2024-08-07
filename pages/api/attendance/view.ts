import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query;

    const client = await clientPromise;
    const db = client.db(); // Use the default database from the connection string

    const attendanceRecords = await db.collection('attendance').find({ email }).toArray();

    res.status(200).json(attendanceRecords);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
