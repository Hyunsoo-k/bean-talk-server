import { Request, Response } from "express";

const createPostController = async (req: Request, res: Response): Promise<any> => {
  return res.status(201).send();
};

export default createPostController;
