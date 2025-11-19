import type { Request, Response } from "express";

const editUserController = async(req: Request, res: Response): Promise<any> => {
  const { edtiedUser } = res.locals;

  return res.status(201).json(edtiedUser);
};

export default editUserController;