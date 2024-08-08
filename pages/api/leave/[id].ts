import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { status, email, date } = req.body;

    const client = await clientPromise;
    const db = client.db();

    // Update leave request status
    await db.collection('leaveRequests').updateOne(
      { _id: new ObjectId(id as string) },
      { $set: { status } }
    );

    // If the leave is approved, update the attendance
    if (status === 'Approved') {
      await db.collection('attendance').updateOne(
        { email, date: new Date(date) },
        { $set: { status: 'Leave' } },
        { upsert: true }
      );
    }

    // Delete the leave request
    await db.collection('leaveRequests').deleteOne({ _id: new ObjectId(id as string) });

    res.status(200).json({ message: 'Leave request updated and attendance adjusted successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
