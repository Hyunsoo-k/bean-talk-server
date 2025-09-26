import { Request, Response } from "express";

const loginController = async (req: Request, res: Response): Promise<any> => {
  const { accessToken } = res.locals;

  return res.status(200).json({ accessToken });
};

export default loginController;
