import type { Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import HttpError from "../../error/http-error.js";
import UserModel from "../../mongoose-model/user-model.js";

dotenv.config();

const loginMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new HttpError(404, "등록되지 않은 이메일 입니다.");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError(400, "비밀번호가 일치하지 않습니다.");
  }

  const { _id: user_id } = user;
  const payload = { user_id };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY!, { expiresIn: "24h" });
  
  res.locals.accessToken = accessToken;
  next();
};

export default loginMiddleware;
