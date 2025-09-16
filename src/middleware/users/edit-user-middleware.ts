import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import UserModel from "../../mongoose-model/user-model.js";


const editUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);

  const user = await UserModel.findById(user_id);
  if (!user) {
    return customHttpErrorHandler("유저를 찾을 수 없습니다.", 404, next);
  }

  const { nickname, password, profileImageUrl } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  user.nickname = nickname;
  user.password = hashedPassword;
  user.profileImageUrl = profileImageUrl;

  await user.save();

  next();
};

export default editUserMiddleware;
