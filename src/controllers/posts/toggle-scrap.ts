import { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/category.js";
import { POST_MODELS } from "../../variables/index.js";
import HttpError from "../../error/http-error.js";
import { MyScrapContainer } from "../../mongoose-models/index.js";

const toggleScrap = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id
  } = req.params as {
    category: Category,
    post_id: string
  };

  const session = await mongoose.startSession();
  const postObjectId = new mongoose.Types.ObjectId(post_id);

  try {
    session.startTransaction();

    const post = await POST_MODELS[category]
      .findById(post_id)
      .session(session);
    if (!post) {
      throw new HttpError(404, "게시글을 찾을 수 없습니다.");
    }

    const isScrapped = post.scraps.some(
      (userWhoScraped: mongoose.Types.ObjectId) => userWhoScraped.equals(user_id)
    );

    const myScrapContainer = await MyScrapContainer
      .findOne({ user_id })
      .session(session);
    if (!myScrapContainer) {
      throw new HttpError(404, "스크랩 컨테이너를 찾을 수 없습니다.");
    }

    if (!isScrapped) {
      post.scraps.push(user_id);
      myScrapContainer.posts.push(postObjectId);
      
      await Promise.all(
        [
          post.save({ session }),
          myScrapContainer.save({ session })
        ]
      );
    } else if (isScrapped) {
      post.scraps.pull(user_id);
      myScrapContainer.posts.pull(postObjectId);
      
      await Promise.all(
        [
          post.save({ session }),
          myScrapContainer.save({ session })
        ]
      );
    }

    await session.commitTransaction();

    res.status(200).json();
  } catch (error) {
    await session.abortTransaction();
    
    throw error;
  } finally {
    await session.endSession();
  }
};

export default toggleScrap;