import { NextFunction, Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import UserModel from "../../mongoose-model/user-model.js";

const deleteUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const isUserExists = !!(await UserModel.exists({ _id: user_id }));
  if (!isUserExists) {
    throw new HttpError(404, "사용자를 찾을 수 없습니다.");
  }

  await UserModel.findByIdAndDelete(user_id);

  next();
};

export default deleteUserMiddleware;
