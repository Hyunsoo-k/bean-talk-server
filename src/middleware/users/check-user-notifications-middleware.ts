import type { Request, Response, NextFunction } from "express";

import NotificationModel from "../../mongoose-model/notification-model.js";
import verifyAccessToken from "../../utils/verify-access-token.js";

const checkUserNotificationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const { notification_id } = req.params;

  await NotificationModel.findOneAndUpdate(
    { user: user_id, "list._id": notification_id },
    { $set: { "list.$.isChecked": true } }
  );

  next();
};

export default checkUserNotificationMiddleware;
