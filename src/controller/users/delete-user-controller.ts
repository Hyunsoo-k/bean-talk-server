import { Request, Response } from "express";

const deleteUserController = async(req: Request, res: Response): Promise<any> => {
  return res.status(204).send();
};

export default deleteUserController;