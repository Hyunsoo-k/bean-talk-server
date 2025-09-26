import { NextFunction, Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import UserModel from "../../mongoose-model/user-model.js";

const getUserMeMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const userMe = await UserModel.findById(user_id).lean();
  if (!userMe) {
    throw new HttpError(404, "유저를 찾을 수 없습니다.");
  }

  const { _id, email, nickname, profileImageUrl } = userMe;

  res.locals.userMe = { _id, email, nickname, profileImageUrl };
  next();
};

export default getUserMeMiddleware;
