import { Types } from "mongoose";

type Reply = {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export default Reply;
