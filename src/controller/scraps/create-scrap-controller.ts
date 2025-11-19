import { Request, Response } from "express";

const createScrapController = async (req: Request, res: Response): Promise<any> => {
  return res.status(201).json();
};

export default createScrapController;