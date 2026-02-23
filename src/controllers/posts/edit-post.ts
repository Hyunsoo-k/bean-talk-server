import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/category.js";
import HttpError from "../../error/http-error.js";
import POST_MODELS from "../../variables/post-models.js";

const editPost = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id
  } = req.params as {
    category: Category,
    post_id: string
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const post = await POST_MODELS[category]
    .findById(post_id)
    .session(session);
    if (!post) {
      throw new HttpError(404, "게시글을 찾을 수 없습니다.");
    } else if (!post.author.equals(user_id)) {
      throw new HttpError(403, "권한이 없습니다.");
    }

    Object.assign(post, req.body);

    await post.save({ session });

    await session.commitTransaction();

    res.status(200).json();
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    await session.endSession();
  }
};

export default editPost;
