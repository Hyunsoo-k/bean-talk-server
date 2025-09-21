import { Request, Response } from "express";

const editUserController = async(req: Request, res: Response): Promise<any> => {
  return res.status(201).json();
};

export default editUserController;