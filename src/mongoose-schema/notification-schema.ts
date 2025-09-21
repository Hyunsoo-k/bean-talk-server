import mongoose from "mongoose";

import NotificationItemSchema from "./notification-item-schema.js";

const NotificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  list: [NotificationItemSchema],
});

export default NotificationSchema;