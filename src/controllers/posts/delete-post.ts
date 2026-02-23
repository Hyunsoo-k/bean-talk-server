import type { Request, Response } from "express";
import mongoose from "mongoose";

import type { Category } from "../../types/index.js";
import HttpError from "../../error/http-error.js";
import POST_MODELS from "../../variables/post-models.js";
import { CommentContainer, MyPostContainer } from "../../mongoose-models/index.js";

const deletePost = async (req: Request, res: Response) => {
  const { user_id } = req.payload!;

  const {
    category,
    post_id
  } = req.params as {
    category: Category,
    post_id: string,
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
      throw new HttpError(401, "권한이 없습니다.");
    }

    await post.deleteOne({ session });

    const deletedCommentContainer = await CommentContainer
      .findOneAndDelete({ post_id })
      .session(session);
    if (!deletedCommentContainer) {
      throw new HttpError(404, "댓글을 찾을 수 없습니다.");
    }

    const myPostContainerUpdateResult = await MyPostContainer.updateOne(
      {
        user_id
      },
      { 
        $pull: { 
          posts: post_id 
        } 
      },
      {
        session
      }
    );
    if (myPostContainerUpdateResult.matchedCount === 0) {
      throw new HttpError(500, "내 게시글 컨테이너를 찾을 수 없습니다.");
    }

    await session.commitTransaction();

    res.status(204).json();
  } catch (error) {
    await session.abortTransaction();
    
    throw error;
  } finally {
    session.endSession();
  }
};

export default deletePost;
