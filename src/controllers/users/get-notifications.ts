import type { Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import { NotificationContainer } from "../../mongoose-models/index.js";

const getNotifications = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const notificationContainer = await NotificationContainer
    .findOne({ user_id })
    .populate({
      path: "notifications.triggeredBy",
      select: "nickname"
    })
    .lean();
  if (!notificationContainer) {
    throw new HttpError(404, "알림을 찾을 수 없습니다.");
  }

  const notifications = notificationContainer.notifications;

  res.status(200).json(notifications);
};

export default getNotifications;
