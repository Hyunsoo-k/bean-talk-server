import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import UserModel from "../../mongoose-model/user-model.js";

const editUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const user = await UserModel.findById(user_id);
  if (!user) {
    throw new HttpError(404, "유저를 찾을 수 없습니다.");
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
