import mongoose from "mongoose";

import NotificationItemSchema from "./notification-item-schema.js";

const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  list: [NotificationItemSchema],
});

export default NotificationSchema;