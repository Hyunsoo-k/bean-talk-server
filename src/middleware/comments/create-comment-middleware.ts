import { NextFunction, Request, Response } from "express";

import customHttpErrorHandler from "../../error-handler/custom-http-error-handler.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import NotificationModel from "../../mongoose-model/notification-model.js";

const createCommentMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return customHttpErrorHandler("권한이 없습니다.", 401, next);
  }

  const { user_id } = verifyAccessToken(accessToken);

  const { category, post_id } = req.params;
  if (!isValidCategory(category)) {
    return customHttpErrorHandler("잘못된 카테고리 입니다.", 400, next);
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    return customHttpErrorHandler("게시글을 찾을 수 없습니다.", 404, next);
  }

  const { content } = req.body;
  post.comments.push({ author: user_id, content });
  const newComment = post.comments[post.comments.length - 1];

  await NotificationModel.findOneAndUpdate(
    { user_id: post.author },
    {
      $push: {
        list: {
          targetUrl: `/bbs/categories/${category}/post/${post_id}?element_id=${newComment._id}`,
          targetTitle: post.title,
          triggerdBy: user_id,
          type: "댓글",
        },
      },
    }
  );

  await post.save();
  
  next();
};

export default createCommentMiddleware;
