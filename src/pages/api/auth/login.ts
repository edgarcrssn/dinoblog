import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type LoginDto = {
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

  const { username, password } = req.body as LoginDto;

  const prisma = new PrismaClient();

  const userFound = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
      password: true,
      role: true,
    },
  });
  await prisma.$disconnect();

  if (!userFound) {
    return res.status(401).send('Wrong credentials');
  }

  const isPasswordCorrect = await bcrypt.compare(password, userFound.password);
  if (!isPasswordCorrect) {
    return res.status(401).send('Wrong credentials');
  }

  const token = jwt.sign(
    { username: userFound.username, role: userFound.role },
    '123',
    { expiresIn: '1h' }
  );

  res
    .status(200)
    .send({
      token,
      user: { username: userFound.username, role: userFound.role },
    });
}
