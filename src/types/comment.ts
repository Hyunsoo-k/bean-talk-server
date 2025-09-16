import { Types, Document } from "mongoose";

import Reply from "./reply.js";

interface Comment extends Document {
  _id: Types.ObjectId;
  subCategory?: "카페" | "납품" | "구인" | "구직";
  author: Types.ObjectId;
  content: string;
  replies: Reply[];
  deletedHavingReply: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default Comment;