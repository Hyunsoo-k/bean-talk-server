import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import NotificationModels from "../../model/notifications.js";

dotenv.config();

const checkUserNotificationMiddleware = async(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const payload =
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY!) as { user_id: string };
  const { user_id } = payload;

  const { notification_id } = req.params;
  await NotificationModels.findOneAndUpdate(
    {
      user: user_id,
      "list._id": notification_id
    },
    { $set: { "list.$.isChecked": true } }
  );

  next();
};

export default checkUserNotificationMiddleware;