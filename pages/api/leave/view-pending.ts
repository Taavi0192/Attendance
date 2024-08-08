import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const client = await clientPromise;
    const db = client.db();

    const leaveRequests = await db.collection('leaveRequests').find({ status: 'Pending' }).toArray();

    res.status(200).json(leaveRequests);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
