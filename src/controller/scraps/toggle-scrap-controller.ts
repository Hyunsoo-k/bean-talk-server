import { Request, Response } from "express";

const toggleScrapController = async (req: Request, res: Response): Promise<any> => {
  return res.status(200).json();
};

export default toggleScrapController;