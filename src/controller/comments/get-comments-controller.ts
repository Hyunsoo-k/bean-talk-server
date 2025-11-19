import { Request, Response } from "express";

const getCommentsController = async (req: Request, res: Response): Promise<any> => {
  const { comments } = res.locals;

  return res.status(200).json(comments);
};

export default getCommentsController;