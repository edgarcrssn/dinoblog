import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CommentI } from '@/pages/dinosaurs/[dinosaur]';

export type GetCommentsDto = {
  dinosaur: string;
  skip: number;
  take: number;
};
export type PostCommentDto = {
  dinosaur: string;
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const { dinosaur, skip, take } = req.query;

    if (
      !dinosaur ||
      typeof dinosaur !== 'string' ||
      !skip ||
      typeof skip !== 'string' ||
      !take ||
      typeof take !== 'string'
    ) {
      res.status(400).send('Bad Request');
      return;
    }

    const prisma = new PrismaClient();

    const comments = await prisma.comment.findMany({
      where: {
        dinosaur: {
          name: dinosaur,
        },
      },
      orderBy: {
        postedAt: 'desc',
      },
      skip: +skip,
      take: +take,
      select: {
        postedAt: true,
        content: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    await prisma.$disconnect();

    res.status(200).send({
      comments,
    });
  } else if (req.method === 'POST') {
    const { content } = req.body;
    const { dinosaur } = req.query;

    if (
      !dinosaur ||
      typeof dinosaur !== 'string' ||
      !content ||
      typeof content !== 'string'
    ) {
      return res.status(400).send('Bad Request');
    }

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('No token found');
    const { username } = jwt.verify(token, '123') as JwtPayload;

    const prisma = new PrismaClient();

    try {
      const comment = await prisma.comment.create({
        data: {
          content,
          author: {
            connect: {
              username: username as string,
            },
          },
          dinosaur: {
            connect: {
              name: dinosaur,
            },
          },
        },
        select: {
          author: {
            select: {
              username: true,
            },
          },
          content: true,
          postedAt: true,
        },
      });

      const formattedComment: CommentI = {
        ...comment,
        postedAt: comment.postedAt.toISOString(),
      };

      res.status(201).send(formattedComment);
    } catch (error) {
      res.status(500).send(error);
    }
    await prisma.$disconnect();
  } else {
    res.status(405).send('This method is not handled.');
  }
}
