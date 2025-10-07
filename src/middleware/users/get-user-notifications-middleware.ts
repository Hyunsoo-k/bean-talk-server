import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import NotificationModels from "../../mongoose-model/notification-model.js";
import verifyAccessToken from "../../utils/verify-access-token.js";

const getUserNotificationsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const notification = await NotificationModels.findOne({ user_id }).lean();
  if (!notification) {
    throw new HttpError(404, "알림을 찾을 수 없습니다.");
  }

  const notifications = notification.list;

  res.locals.notifications = notifications;
  next();
};

export default getUserNotificationsMiddleware;
