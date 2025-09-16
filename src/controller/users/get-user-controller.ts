import { Request, Response } from "express";

const getUserController = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).send({ ...(res.locals) });
};

export default getUserController;
