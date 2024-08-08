import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    const client = await clientPromise;
    const db = client.db();

    await db.collection('attendance').deleteOne({ _id: new ObjectId(id as string) });

    res.status(200).json({ message: 'Attendance removed successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
