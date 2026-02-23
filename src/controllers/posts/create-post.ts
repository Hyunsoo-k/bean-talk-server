import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/category.js";
import POST_MODELS from "../../variables/post-models.js";
import HttpError from "../../error/http-error.js";
import { CommentContainer, MyPostContainer } from "../../mongoose-models/index.js";

const createPost = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;
  const { category } = req.params as { category: Category };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const [newPost] = await POST_MODELS[category].create(
      [
        {
          author: user_id,
          ...req.body,
        }
      ],
      {
        session,
      }
    );

    await CommentContainer.create(
      [
        {
          post_id: newPost._id,
        }
      ],
      {
        session,
      }
    );

    const myPostContainerUpdateResult  = await MyPostContainer.updateOne(
      {
        user_id
      },
      {
        $push: {
          posts: newPost._id
        }
      },
      {
        session,
      }
    );

    if (myPostContainerUpdateResult.matchedCount === 0) {
      throw new HttpError(404, "내 게시글 컨테이너를 찾을 수 없습니다.");
    }

    await session.commitTransaction();

    res.status(201).json(
      {
        post: newPost
      }
    );
  } catch (error) {
    await session.abortTransaction();
    
    throw error;
  } finally {
    await session.endSession();
  }
};

export default createPost;
