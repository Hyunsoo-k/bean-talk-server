import mongoose from "mongoose";

interface INotice {
  category: string;
  author: mongoose.Types.ObjectId;
  views: number;
  title: string;
  content: string;
  commentCount: number;
  likes: mongoose.Types.DocumentArray<mongoose.Types.ObjectId>;
  scraps: mongoose.Types.DocumentArray<mongoose.Types.ObjectId>;
}

const NoticeSchema = new mongoose.Schema<INotice>(
  {
    category: {
      type: String,
      default: "notice",
      enum: ["notice"],
      required: true,
      immutable: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 40,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 1000000,
      trim: true,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    scraps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
  },
  {
    timestamps: true,
  }
);

export default NoticeSchema;