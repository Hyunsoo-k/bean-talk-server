import { Request, Response } from "express";

const getMyPostsController = async (req: Request, res: Response): Promise<any> => {
  const { myPostsData } = res.locals;

  return res.status(200).json(myPostsData);
};

export default getMyPostsController;