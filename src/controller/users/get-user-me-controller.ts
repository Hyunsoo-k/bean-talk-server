import { Request, Response } from "express";

const getUserMeController = async (req: Request, res: Response): Promise<any> => {
  const { userMe } = res.locals;

  return res.status(200).json(userMe);
};

export default getUserMeController;