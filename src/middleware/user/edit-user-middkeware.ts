import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import UserModel from "../../model/user.js";
import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";

dotenv.config();

const editUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const payload
    = jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as { user_id: string };
  const { user_id } = payload;
  const editedUser = await UserModel
    .findByIdAndUpdate(
      { _id: user_id },
      { $set: { ...req.body } }
    )
    .lean();
  if (!editedUser) {
    return customHttpErrorHandler("사용자를 찾을 수 없습니다.", 404, next);
  }

  next();
};

export default editUserMiddleware;
