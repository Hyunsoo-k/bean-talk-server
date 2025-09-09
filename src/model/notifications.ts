import mongoose from "mongoose";

const { Schema, model } = mongoose;

const NotificationItemSchema = new Schema(
  {
    target_id: {
      type: Schema.Types.ObjectId,
    },
    targetUrl: {
      type: String,
      required: true,
    },
    targetTitle: {
      type: String,
      required: true,
    },
    triggeredBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "댓글",
        "답글",
        "좋아요",
        "스크랩"
      ],
      required: true,
    },
    isChecked: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const NotificationsSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  list: [NotificationItemSchema],
});

const NotificationsModel = model("Notifications", NotificationsSchema);

export default NotificationsModel;
