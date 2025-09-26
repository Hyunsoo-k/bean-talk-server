import { NextFunction, Request, Response } from "express";

import HttpError from "../../error/http-error.js";
import verifyAccessToken from "../../utils/verify-access-token.js";
import isValidCategory from "../../utils/is-valid-category.js";
import postModelMap from "../../variables/post-model-map.js";
import NotificationModel from "../../mongoose-model/notification-model.js";

const createCommentMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { user_id } = verifyAccessToken(req);

  const { category, post_id } = req.params;
  if (!isValidCategory(category)) {
    throw new HttpError(400, "잘못된 카테고리 입니다.");
  }

  const post = await postModelMap[category].findById(post_id);
  if (!post) {
    throw new HttpError(404, "게시글을 찾을 수 없습니다.");
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
