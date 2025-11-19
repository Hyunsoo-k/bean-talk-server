import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import { User } from "../../mongoose-models/index.js";

const editUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const user = await User.findById(user_id);
  if (!user) {
    throw new HttpError(404, "유저를 찾을 수 없습니다.");
  }

  const { nickname, password, profileImageUrl } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  user.nickname = nickname;
  user.password = hashedPassword;
  user.profileImageUrl = profileImageUrl;
  
  await user.save();

  res.locals.editedUser = user;

  next();
};

export default editUserMiddleware;
