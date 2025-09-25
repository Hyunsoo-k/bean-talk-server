import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import UserModel from "../../mongoose-model/user-model.js";

const deleteUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("잘못된 토큰입니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(req, next);

  const isUserExists = !!(await UserModel.exists({ _id: user_id }));
  if (!isUserExists) {
    return customHttpErrorHandler("사용자를 찾을 수 없습니다.", 404, next);
  }

  await UserModel.findByIdAndDelete(user_id);

  next();
};

export default deleteUserMiddleware;
