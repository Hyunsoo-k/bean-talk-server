import type { Request, Response, NextFunction } from "express";

import verifyAccessToken from "../../utils/verify-access-token.js";
import HttpError from "../../error/http-error.js";
import { NotificationContainer } from "../../mongoose-models/index.js";

const deleteNotificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { notification_id } = req.params;

  const notificationContainer = await NotificationContainer.findOne({ user_id });
  if (!notificationContainer) {
    throw new HttpError(404, "알림 컨테이너를 찾을 수 없습니다.");
  }

  await NotificationContainer.findOneAndUpdate(
    { user_id },
    {
      $pull: {
        notifications: { _id: notification_id }
      },
    },
  );

  next();
};

export default deleteNotificationMiddleware;
