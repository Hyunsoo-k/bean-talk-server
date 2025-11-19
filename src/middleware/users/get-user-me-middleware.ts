import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import { User } from "../../mongoose-models/index.js";

const getUserMeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const userMe = await User
    .findById(
      user_id,
      {
        _id: 1,
        email: 1,
        nickname: 1,
        profileImageUrl: 1,
      }
    )
    .lean();
  if (!userMe) {
    throw new HttpError(404, "사용자를 찾을 수 없습니다.");
  }

  res.locals.userMe = userMe;

  next();
};

export default getUserMeMiddleware;
