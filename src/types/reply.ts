import mongoose from "mongoose";

type Reply = {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId;
  content: string;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type { Reply };
