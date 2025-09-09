import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../../model/user.js";

const signupMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
  
  res.locals.newUser = newUser;
  next();
};

export default signupMiddleware;