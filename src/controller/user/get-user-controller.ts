import { Request, Response } from "express";

type Locals = {
  nickname: string;
  profileImageUrl: string | null;
};

const getUserController = async(req: Request, res: Response): Promise<any> => {
  return res.status(200).json({ ...res.locals as Locals });
};

export default getUserController;