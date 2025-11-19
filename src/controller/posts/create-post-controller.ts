import type { Request, Response } from "express";

const createPostController = async (req: Request, res: Response): Promise<any> => {
  const { newPost } = res.locals;

  return res.status(201).json(newPost);
};

export default createPostController;
