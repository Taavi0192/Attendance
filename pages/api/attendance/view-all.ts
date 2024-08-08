// import type { NextApiRequest, NextApiResponse } from 'next';
// import clientPromise from '../../../lib/mongodb';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const { startDate, endDate } = req.query;

//     const client = await clientPromise;
//     const db = client.db();

//     const start = new Date(startDate as string);
//     const end = new Date(endDate as string);
//     end.setHours(23, 59, 59, 999);

//     const attendanceRecords = await db.collection('attendance').find({
//       date: {
//         $gte: start,
//         $lte: end
//       }
//     }).toArray();

//     res.status(200).json(attendanceRecords);
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
