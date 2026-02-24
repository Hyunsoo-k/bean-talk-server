import mongoose from "mongoose";

import {
  UserSchema,
  CommentContainerSchema,
  MyPostContainerSchema,
  MyScrapContainerSchema,
  NotificationContainerSchema,
  PostSchema
} from "./schemas/index.js";

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const CommentContainer = mongoose.model("CommentContainer", CommentContainerSchema);
const MyPostContainer = mongoose.model("MyPostContainer", MyPostContainerSchema);
const MyScrapContainer = mongoose.model("MyScrapContainer", MyScrapContainerSchema);
const NotificationContainer = mongoose.model("NotificationContainer", NotificationContainerSchema);

const News = Post.discriminator(
  "news",
  new mongoose.Schema({
    subCategory: {
      type: String,
      enum: ["domestic", "international"],
      required: true
    },
  })
);

const Job = Post.discriminator(
  "job",
  new mongoose.Schema({
    subCategory: {
      type: String,
      enum: ["hiring", "seeking"],
      required: true
    },
    employmentType: {
      type: String,
      enum: ["partTime", "fullTime"],
      required: true
    },
    position: {
      type: String,
      enum: ["barista", "manager"],
      required: true
    },
    payAmount: {
      type: Number,
      required: true
    },
    startTime: {
      type: String
    },
    endTime: {
      type: String
    },
    address: {
      type: String,
      required: function (this: any) {
        return this.subCategory === "hiring";
      },
    },
    latitude: {
      type: Number,
      required: function (this: any) {
        return this.subCategory === "hiring";
      },
    },
    longitude: {
      type: Number,
      required: function (this: any) {
        return this.subCategory === "hiring";
      },
    },
  })
);

const Promotion = Post.discriminator(
  "promotion",
  new mongoose.Schema({
    subCategory: {
      type: String,
      enum: ["cafe", "delivery"],
      required: true
    },
  })
);

const Notice = Post.discriminator("notice", new mongoose.Schema({}));

const Thread = Post.discriminator("thread", new mongoose.Schema({}));

export {
  User,
  Post,
  News,
  Notice,
  Thread,
  Job,
  Promotion,
  CommentContainer,
  MyPostContainer,
  MyScrapContainer,
  NotificationContainer
};