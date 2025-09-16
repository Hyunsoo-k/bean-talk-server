import { Request, Response } from "express";

const getUserController = async (req: Request, res: Response): Promise<any> => {
  const { user } = res.locals;

  return res.status(200).send(user);
};

export default getUserController;
