import type { Request, Response } from "express";

const editPostController = async (req: Request, res: Response): Promise<any> => {
  const { editedPost } = res.locals;

  return res.status(200).json(editedPost);
};

export default editPostController;
