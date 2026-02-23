import type { Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import { NotificationContainer } from "../../mongoose-models/index.js";

const deleteNotification = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const { notification_id } = req.params;

  const deleteNotificationContainer = await NotificationContainer.findOneAndUpdate(
    {
      user_id,
    },
    {
      $pull: {
        notifications: {
          _id: notification_id,
        }
      },
    },
    {
      new: true,
    }
  );
  if (!deleteNotificationContainer) {
    throw new HttpError(404, "알림 컨테이너를 찾을 수 없습니다.");
  }

  res.status(204).json();
};

export default deleteNotification;
