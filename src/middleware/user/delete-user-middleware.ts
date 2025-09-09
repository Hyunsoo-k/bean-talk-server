import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import UserModel from "../../model/user.js";

const deleteUserMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("잘못된 토큰입니다.", 401, next);
  }

  const payload
    = jwt.verify(accessToken, process.env.JWT_SECRET_KEY as string) as { user_id: string};
  const { user_id } = payload;
  const deletedUser = await UserModel
    .findByIdAndDelete(user_id)
    .lean();
  if (!deletedUser) {
    return customHttpErrorHandler("사용자를 찾을 수 없습니다.", 404, next);
  }

  next();
};

export default deleteUserMiddleware;