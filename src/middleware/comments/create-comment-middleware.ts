import type { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import HttpError from "../../error/http-error.js";
import postModelMap from "../../variables/post-model-map.js";
import { CommentContainer, NotificationContainer } from "../../mongoose-models/index.js";

const createCommentMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id } = verifyAccessToken(req);

  console.log(user_id)

  const { category, post_id } = req.params;
  
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const commentContainer = await CommentContainer.findOne({ post_id });
  if (!commentContainer) {
    throw new HttpError(404, "댓글 컨테이너를 찾을 수 없습니다.");
  }

  const { content } = req.body;
  const newComment_id = new mongoose.Types.ObjectId();

  commentContainer.comments.push({
    _id: newComment_id,
    author: user_id,
    content,
  });

  const createdComment = commentContainer.comments.id(newComment_id);
  if (!createdComment) {
    throw new HttpError(500, "댓글 생성을 실패하였습니다.");
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
  }

  post.commentCount += 1;

  const notificationContainer = await NotificationContainer.findOne({ user_id: post.author });
  if (!notificationContainer) {
    throw new HttpError(404, "알림 컨테이너를 찾을 수 없습니다.");
  }

  const newNotification_id = new mongoose.Types.ObjectId();

  notificationContainer.notifications.push({
    _id: newNotification_id,
    targetUrl: `/bbs/categories/${category}/post/${post_id}?element_id=${newComment_id}`,
    targetTitle: post.title,
    triggeredBy: user_id,
    type: "댓글",
  });

  const createdNotification = notificationContainer.notifications.id(newNotification_id);
  if (!createdNotification) {
    throw new HttpError(500, "알림 생성을 실패하였습니다.");
  }

  await commentContainer.save();
  await post.save();
  await notificationContainer.save();

  res.locals.createdComment = createdComment;

  next();
};

export default createCommentMiddleware;
