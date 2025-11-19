import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import { User } from "../../mongoose-models/index.js";

const getUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction)
  : Promise<void> => {
  const { user_id } = req.params;

  const user = await User.findById(
    user_id,
    {
      email: 1,
      nickname: 1,
      profileImageUrl: 1,
    }
  ).lean();

  if (!user) {
    throw new HttpError(400, "유저를 찾을 수 없습니다.");
  }

  res.locals.user = user;
  next();
};

export default getUserMiddleware;
