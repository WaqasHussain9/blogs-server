import { Response } from 'express';
import { CustomRequest } from '../interfaces/request';
import sendResponse from '../helpers/responseHelper';
import { createPostSchema } from '../validationSchemas/postsSchema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const addPost = async (req: CustomRequest, res: Response) => {
  await createPostSchema.validate(req.body);
  const userId = req.userId as string;
  const { title, content } = req.body;
  await prisma.post.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });
  sendResponse(res);
};

export const getPosts = async (req: CustomRequest, res: Response) => {
  const title = req.query.title as string;

  const whereOptions: any = {};

  if (title) {
    whereOptions.title = {
      contains: title,
      mode: 'insensitive',
    };
  }

  const posts = await prisma.post.findMany({
    where: whereOptions,
  });

  sendResponse(res, posts);
};
