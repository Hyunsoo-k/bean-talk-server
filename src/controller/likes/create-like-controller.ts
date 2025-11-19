import { Request, Response } from "express";

const createLikeController = async (req: Request, res: Response): Promise<any> => {
  res.status(201).json();
};

export default createLikeController;