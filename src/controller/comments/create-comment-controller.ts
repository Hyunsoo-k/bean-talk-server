import type { Request, Response } from "express";

const createCommentController = async (req: Request, res: Response): Promise<any> => {
  const { newComment } = res.locals;

  return res.status(201).json(newComment);
};

export default createCommentController;