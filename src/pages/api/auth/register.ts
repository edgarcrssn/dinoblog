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
    res.status(405).send('This method is not handled.');
    return;
  }

  const { username, password } = req.body as RegisterDto;

  const prisma = new PrismaClient();

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    res.status(309).send('This username is already taken.');
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, password: hashedPassword },
    select: { username: true, role: true },
  });

  await prisma.$disconnect();

  const token = jwt.sign(user, '123', {
    expiresIn: '1d',
  });

  res.status(201).send({ token, user });
}
