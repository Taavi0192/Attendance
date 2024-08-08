import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { status } = req.body;

    const client = await clientPromise;
    const db = client.db();

    await db.collection('leaveRequests').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { status } }
    );

    res.status(200).json({ message: 'Leave request updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
