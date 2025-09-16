import { Request, Response } from "express";

const createCommentController = async (req: Request, res: Response): Promise<any> => {
  return res.status(201).send();
};

export default createCommentController;