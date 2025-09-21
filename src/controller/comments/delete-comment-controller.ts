import { Request, Response } from "express";

const deleteCommentController = async (req: Request, res: Response): Promise<any> => {
  res.status(204).json();
};

export default deleteCommentController;