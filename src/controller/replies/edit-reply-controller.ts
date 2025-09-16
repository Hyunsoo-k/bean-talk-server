import { Request, Response } from "express";

const editReplyController = async (req: Request, res: Response): Promise<any> => {
  return res.status(204).send();
};

export default editReplyController;