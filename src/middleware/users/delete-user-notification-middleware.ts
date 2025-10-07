import type { Request, Response, NextFunction } from "express";

import verifyAccessToken from "../../utils/verify-access-token.js";
import NotificationModels from "../../mongoose-model/notification-model.js";

const deleteUserNotificationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const { notification_id } = req.params;

  await NotificationModels.findOneAndUpdate(
    { user_id },
    { $pull: { list: { _id: notification_id } } }
  );

  next();
};

export default deleteUserNotificationMiddleware;
