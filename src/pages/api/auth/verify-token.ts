import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { manageToken } from '@/utils/manageToken';

export type RegisterDto = {
  username: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== 'GET') {
    res.status(405).send('This method is not handled.');
    return;
  }

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token found' });
  }

  try {
    const decoded = jwt.verify(token, '123');
    return res.status(200).json(decoded);
  } catch (err) {
    return res.status(401).json({ error: 'Token invalide' });
  }
}
