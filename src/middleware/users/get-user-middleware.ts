import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import UserModel from "../../mongoose-model/user-model.js";

const getUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { _id: user_id } = req.params;

  const user = await UserModel.findById(user_id).lean();

  if (!user) {
    throw new HttpError(400, "유저를 찾을 수 없습니다.");
  }

  const { email, nickname, profileImageUrl } = user;

  res.locals.user = { email, nickname, profileImageUrl };
  next();
};

export default getUserMiddleware;
