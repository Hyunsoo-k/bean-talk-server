import type { Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import { NotificationContainer } from "../../mongoose-models/index.js";

const checkNotification = async (req: Request, res: Response): Promise<any> => {
  const { user_id } = req.payload!;

  const { notification_id } = req.params;

  const updatedNotificationContainer = await NotificationContainer.findOneAndUpdate(
    {
      user_id,
      "notifications._id": notification_id,
    },
    {
      $set: {
        "notifications.$.isChecked": true,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedNotificationContainer) {
    throw new HttpError(404, "알림을 찾을 수 없습니다.");
  }

  res.status(200).json();
};

export default checkNotification;
