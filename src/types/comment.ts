import { Types } from "mongoose"

import type { Reply } from "./reply.js";

type Comment = {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  replies: Reply[];
  isEdited: boolean;
  deletedHavingReply: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type { Comment };