import mongoose from "mongoose";

const MyPostContainerSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    posts: [mongoose.Schema.Types.ObjectId],
  }
);

export default MyPostContainerSchema;