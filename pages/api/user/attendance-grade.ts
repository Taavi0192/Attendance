import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { email } = req.query;

    const client = await clientPromise;
    const db = client.db();

    const attendanceRecords = await db.collection('attendance').find({ email }).toArray();
    const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;

    let grade = 'F';
    if (presentCount >= 28) grade = 'A';
    else if (presentCount >= 20) grade = 'B';
    else if (presentCount >= 15) grade = 'C';
    else if (presentCount >= 10) grade = 'D';

    res.status(200).json({ grade, presentCount });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
