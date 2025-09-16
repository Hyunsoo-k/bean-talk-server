import { Types } from "mongoose";

import type Comment from "./comment.js";

type Post = {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  title: string;
  content: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};

export default Post;