import type { NextApiRequest, NextApiResponse } from 'next';
import { Dinosaur, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ dinosaurs: Dinosaur[] }>
) {
  const dinosaurs = await prisma.dinosaur.findMany();
  res.status(200).json({ dinosaurs });
}
