import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { month } = req.query;
    const [year, monthNumber] = (month as string).split('-').map(Number);

    const start = new Date(year, monthNumber - 1, 1);
    const end = new Date(year, monthNumber, 0);

    const client = await clientPromise;
    const db = client.db();

    const attendanceRecords = await db.collection('attendance').find({
      date: {
        $gte: start,
        $lte: end,
      },
    }).toArray();

    const users = await db.collection('users').distinct('email');

    res.status(200).json({ records: attendanceRecords, users });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
