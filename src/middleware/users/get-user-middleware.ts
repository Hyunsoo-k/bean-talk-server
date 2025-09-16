import { Request, Response, NextFunction } from "express";

import UserModel from "../../mongoose-model/user-model.js";
import customErrorHandler from "../../error-handler/custom-http-error-handler.js";

const getUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { _id: user_id } = req.params;

  const user = await UserModel.findById(user_id).lean();

  if (!user) {
    return customErrorHandler("유저를 찾을 수 없습니다.", 400, next);
  }

  const { email, nickname, profileImageUrl } = user;

  res.locals.user = { email, nickname, profileImageUrl };
  
  next();
};

export default getUserMiddleware;
