import mongoose from "mongoose";

import NotificationSchema from "./notification.js";

const NotificationContainerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notifications: {
      type: [NotificationSchema],
      default: [],
    },
  },
);

export default NotificationContainerSchema;