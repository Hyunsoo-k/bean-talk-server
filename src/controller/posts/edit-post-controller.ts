import { Request, Response } from "express";

const editPostController = async (req: Request, res: Response): Promise<any> => {
  return res.status(204).send();
};

export default editPostController;
