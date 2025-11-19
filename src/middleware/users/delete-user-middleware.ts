import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import { User } from "../../mongoose-models/index.js";

const deleteUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const user = await User.findById(user_id);
  if (!user) {
    throw new HttpError(404, "사용자를 찾을 수 없습니다.");
  }

  await user.deleteOne();

  next();
};

export default deleteUserMiddleware;
