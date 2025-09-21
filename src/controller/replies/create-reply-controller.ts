import { Request, Response } from "express";

const createReplyController = async (req: Request, res: Response): Promise<any> => {
  res.status(201).json();
};

export default createReplyController;