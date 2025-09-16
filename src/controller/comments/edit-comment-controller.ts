import { Request, Response } from "express";

const editCommentController = async (req: Request, res: Response): Promise<any> => {
  res.status(201).send();
};

export default editCommentController;