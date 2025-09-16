import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import NotificationModel from "../../mongoose-model/notification-model.js";
import verifyAccessToken from "../../utils/verify-access-token.js";

const checkUserNotificationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);

  const { notification_id } = req.params;

  await NotificationModel.findOneAndUpdate(
    { user: user_id, "list._id": notification_id },
    { $set: { "list.$.isChecked": true } }
  );
  
  next();
};

export default checkUserNotificationMiddleware;
