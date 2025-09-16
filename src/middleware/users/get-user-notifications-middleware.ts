import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import NotificationModels from "../../mongoose-model/notification-model.js";
import verifyAccessToken from "../../utils/verify-access-token.js";

const getUserNotificationsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);

  const notification = await NotificationModels.findOne({ user_id }).lean();
  if (!notification) {
    return customHttpErrorHandler("알림을 찾을 수 없습니다.", 404, next);
  }

  const notifications = notification.list;

  res.locals.notifications = notifications;
  next();
};

export default getUserNotificationsMiddleware;
