import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import NotificationModels from "../../mongoose-model/notification-model.js";

const deleteUserNotificationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);

  const { notification_id } = req.params;

  await NotificationModels.findOneAndUpdate(
    { user_id },
    { $pull: { list: { _id: notification_id } } }
  );
  
  next();
};

export default deleteUserNotificationMiddleware;
