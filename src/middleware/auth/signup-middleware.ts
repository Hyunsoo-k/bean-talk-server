import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../../mongoose-model/user-model.js";
import NotificationModels from "../../mongoose-model/notification-model.js";

const signupMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({ ...req.body, password: hashedPassword });
  const { _id: newUser_id } = newUser;
  await NotificationModels.create({ user_id: newUser_id });

  next();
};

export default signupMiddleware;
