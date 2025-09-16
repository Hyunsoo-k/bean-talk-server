import { Request, Response } from "express";

const getPostsController = async (req: Request, res: Response): Promise<any> => {
  const { postsData } = res.locals;

  return res.status(200).send(postsData);
};

export default getPostsController;