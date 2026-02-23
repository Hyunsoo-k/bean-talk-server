import { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/category.js";
import HttpError from "../../error/http-error.js";
import POST_MODELS from "../../variables/post-models.js";

const toggleLike = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id
  } = req.params as {
    category: Category;
    post_id: string;
  };

  const post = await POST_MODELS[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }

  const isLiked = post.likes.some(
    (userWhoLiked: mongoose.Types.ObjectId) => userWhoLiked.equals(user_id)
  );

  if (!isLiked) {
    post.likes.push(user_id);
  } else if (isLiked) {
    post.likes.pull(user_id);
  }

  await post.save();

  res.status(200).json();
};

export default toggleLike;