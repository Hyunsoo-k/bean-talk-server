import { Request, Response } from "express";

const getMyScrapsController = async (req: Request, res: Response): Promise<any> => {
const { myScrapsData } = res.locals;

  return res.status(200).json(myScrapsData);
};

export default getMyScrapsController;