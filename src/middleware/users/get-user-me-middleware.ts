import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import UserModel from "../../mongoose-model/user-model.js";

const getUserMeMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(req, next);

  const userMe = await UserModel.findById(user_id).lean();
   if (!userMe) {
    return customHttpErrorHandler("유저를 찾을 수 없습니다.", 404, next);
  }
  
  const { _id, email, nickname, profileImageUrl } = userMe;

  res.locals.userMe = { _id, email, nickname, profileImageUrl };
  next();
};

export default getUserMeMiddleware;