import type { Request, Response, NextFunction } from "express";
import mongoose, { Types } from "mongoose";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import { CommentContainer, MyPostContainer } from "../../mongoose-models/index.js";

const deletePostMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  const { category, post_id } = req.params;

  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  } else if (!post.author.equals(user_id)) {
    throw new HttpError(401, "권한이 없습니다.");
  }

  await post.deleteOne();
  
  const deletedCommentContainer = await CommentContainer.findOneAndDelete({ post_id });
  if (!deletedCommentContainer) {
    throw new HttpError(404, "댓글을 찾을 수 없습니다.");
  }

  const myPostContainer = await MyPostContainer.findOne({ user_id });
  if (!myPostContainer) {
    throw new HttpError(500, "내 게시글 컨테이너를 찾을 수 없습니다.");
  }

  await MyPostContainer.updateOne(
    { user_id },
    { 
      $pull: { 
        posts: {
          _id: new Types.ObjectId(post_id as string),
        } 
      } 
    }
  );

  next();
};

export default deletePostMiddleware;
