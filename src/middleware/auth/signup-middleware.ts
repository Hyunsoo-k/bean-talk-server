import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../../model/user.js";
import NotificationModel from "../../model/notification.js";

const signupMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
  const { _id: newUser_id } = newUser;
  await NotificationModel.create({ user_id: newUser_id });
  
  next();
};

export default signupMiddleware;