import mognoose from "mongoose";

import { Comment } from "./comment.js";

interface CommentContainer extends mognoose.Document {
  _id: mognoose.Types.ObjectId;
  post_id: mognoose.Types.ObjectId;
  comment: Comment[];
};

export type { CommentContainer };