import mongoose from "mongoose";

const NotificationItemSchema = new mongoose.Schema(
  {
    targetUrl: {
      type: String,
      required: true,
    },
    targetTitle: {
      type: String,
      required: true,
    },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
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

export default NotificationItemSchema;