import type { Request, Response } from "express";

const editCommentController = async (req: Request, res: Response): Promise<any> => {
  const { editedComment } = res.locals;

  res.status(200).json(editedComment);
};

export default editCommentController;