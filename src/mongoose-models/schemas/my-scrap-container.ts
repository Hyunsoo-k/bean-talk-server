import mongoose from "mongoose";

interface IMyScrapContainer extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  posts: mongoose.Types.DocumentArray<mongoose.Types.ObjectId>;
}

const MyScrapContainerSchema = new mongoose.Schema<IMyScrapContainer>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    posts: [mongoose.Schema.Types.ObjectId]
  }
);

export default MyScrapContainerSchema;