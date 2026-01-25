import mongoose from "mongoose";

const JobPostSchema = new mongoose.Schema(
  {
    subCategory: {
      type: String,
      enum: ["hiring", "seeking"],
      required: true,
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
    employmentType: {
      type: String,
      enum: ["partTime", "fullTime"],
      required: true,
    },
    position: {
      type: String,
      enum: ["barista", "manager"],
      required: true,
    },
    payAmount: {
      type: Number,
      required: true,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
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
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    scraps: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default JobPostSchema;