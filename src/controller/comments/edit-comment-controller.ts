import { Request, Response } from "express";

const editCommentController = async (req: Request, res: Response): Promise<any> => {
  res.status(201).json();
};

export default editCommentController;