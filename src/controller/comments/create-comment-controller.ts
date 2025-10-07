import type { Request, Response } from "express";

const createCommentController = async (req: Request, res: Response): Promise<any> => {
  return res.status(201).json();
};

export default createCommentController;