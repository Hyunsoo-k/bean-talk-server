import type { Request, Response, NextFunction } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import { NotificationContainer } from "../../mongoose-models/index.js";

const getNotificationsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const notificationContainer = await NotificationContainer
    .findOne({ user_id })
    .lean();
  if (!notificationContainer) {
    throw new HttpError(404, "알림을 찾을 수 없습니다.");
  }

  const notifications = notificationContainer.notifications;

  res.locals.notifications = notifications;
  
  next();
};

export default getNotificationsMiddleware;
