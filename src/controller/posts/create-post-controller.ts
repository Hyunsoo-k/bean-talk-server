import { Request, Response } from "express";

const createPostController = async (req: Request, res: Response): Promise<any> => {
  return res.status(201).json();
};

export default createPostController;
