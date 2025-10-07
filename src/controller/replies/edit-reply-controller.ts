import type { Request, Response } from "express";

const editReplyController = async (req: Request, res: Response): Promise<any> => {
  return res.status(204).json();
};

export default editReplyController;