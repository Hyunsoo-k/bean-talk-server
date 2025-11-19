import mongoose from "mongoose";

import NotificationSchema from "./notification.js";

const NotificationContainerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  notifications: [NotificationSchema],
});

export default NotificationContainerSchema;