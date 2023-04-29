import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type RegisterDto = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return res.status(405).send('this method is not handled.');
  }

  const { username, password } = req.body as RegisterDto;

  const prisma = new PrismaClient();

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    await prisma.$disconnect();
    return res.status(309).send('this username is already taken.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
    select: { username: true, role: true },
  });
  await prisma.$disconnect();

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET not found');
    return;
  }
  const token = jwt.sign(user, secret, {
    expiresIn: '1d',
  });

  res.status(201).send({ token, user });
}
