import { Request, Response } from "express";

const getPostController = async (req: Request, res: Response): Promise<any> => {
  const { post } = res.locals;
  
  res.status(200).json(post);
};

export default getPostController;
