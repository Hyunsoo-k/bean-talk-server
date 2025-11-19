import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { User, NotificationContainer } from "../../mongoose-models/index.js";

const signupMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password, nickname } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    nickname,
  });
  
  const { _id: newUser_id } = newUser;

  await NotificationContainer.create({ user_id: newUser_id });

  res.locals.newUser = {
    newUser_id,
    email,
    nickname,
  };

  next();
};

export default signupMiddleware;
