import { Request, Response } from "express";

const getPostController = async (req: Request, res: Response): Promise<any> => {
  const { post } = res.locals;
  
  res.status(200).send(post);
};

export default getPostController;
