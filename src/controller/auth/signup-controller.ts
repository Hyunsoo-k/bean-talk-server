import { Request, Response } from "express";

const signupController = async (req: Request, res: Response): Promise<any> => {
  const { newUser } = res.locals;
  
  return res.status(201).send(newUser);
};

export default signupController;