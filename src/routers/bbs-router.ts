import express from "express";
import expressAsyncHandler from "express-async-handler";

import getPostsMiddleware from "../middleware/posts/get-posts-middleware.js";
import getPostsController from "../controller/posts/get-posts-controller.js";
import getPostMiddleware from "../middleware/posts/get-post-middleware.js";
import getPostController from "../controller/posts/get-post-controller.js";
import createPostMiddleware from "../middleware/posts/create-post-middleware.js";
import createPostController from "../controller/posts/create-post-controller.js";
import editPostMiddleware from "../middleware/posts/edit-post-middleware.js";
import editPostController from "../controller/posts/edit-post-controller.js";
import deletePostMiddleware from "../middleware/posts/delete-post-middleware.js";
import deletePostController from "../controller/posts/delete-post-controller.js";
import getCommentsMiddleware from "../middleware/comments/get-comments-middleware.js";
import getCommentsController from "../controller/comments/get-comments-controller.js";
import createCommentMiddleware from "../middleware/comments/create-comment-middleware.js";
import createCommentController from "../controller/comments/create-comment-controller.js";
import editCommentMiddleware from "../middleware/comments/edit-comment-middleware.js";
import editCommentController from "../controller/comments/edit-comment-controller.js";
import deleteCommentMiddleware from "../middleware/comments/delete-comment-middleware.js";
import deleteCommentController from "../controller/comments/delete-comment-controller.js";
import createReplyMiddleware from "../middleware/replies/create-reply-middleware.js";
import createReplyController from "../controller/replies/create-reply-controller.js";
import editReplyMiddleware from "../middleware/replies/edit-reply-middleware.js";
import editReplyController from "../controller/replies/edit-reply-controller.js";
import deleteReplyMiddleware from "../middleware/replies/delete-reply-middleware.js";
import deleteReplyController from "../controller/replies/delete.reply-controller.js";
import createLikeMiddleware from "../middleware/likes/create-like-middleware.js";
import createLikeController from "../controller/likes/create-like-controller.js";
import deleteLikeMiddleware from "../middleware/likes/delete-like-middleware.js";
import deleteLikeController from "../controller/likes/delete-like-controller.js";
import createScrapMiddleware from "../middleware/scraps/create-scrap-middleware.js";
import createScrapController from "../controller/scraps/create-scrap-controller.js";
import deleteScrapMiddleware from "../middleware/scraps/delete-scrap-middleware.js";
import deleteScrapController from "../controller/scraps/delete-scrap-controller.js";

const bbsRouter = express.Router();

// GET 게시글 목록
bbsRouter.get(
  "/categories/:category/posts",
  expressAsyncHandler(getPostsMiddleware),
  expressAsyncHandler(getPostsController)
);

// GET 게시글
bbsRouter.get(
  "/categories/:category/posts/:post_id",
  expressAsyncHandler(getPostMiddleware),
  expressAsyncHandler(getPostController)
);

// CREATE 게시글
bbsRouter.post(
  "/categories/:category/posts",
  expressAsyncHandler(createPostMiddleware),
  expressAsyncHandler(createPostController)
);

// PATCH 게시글
bbsRouter.patch(
  "/categories/:category/posts/:post_id",
  expressAsyncHandler(editPostMiddleware),
  expressAsyncHandler(editPostController)
);

// DELETE 게시글
bbsRouter.delete(
  "/categories/:category/posts/:post_id",
  expressAsyncHandler(deletePostMiddleware),
  expressAsyncHandler(deletePostController)
);

// GET 댓글 컨테이너
bbsRouter.get(
  "/categories/:category/posts/:post_id/comment-container",
  expressAsyncHandler(getCommentsMiddleware),
  expressAsyncHandler(getCommentsController)
);

// CREATE 댓글
bbsRouter.post(
  "/categories/:category/posts/:post_id/comments",
  expressAsyncHandler(createCommentMiddleware),
  expressAsyncHandler(createCommentController)
);

// PATCH 댓글
bbsRouter.patch(
  "/categories/:category/posts/:post_id/comments/:comment_id",
  expressAsyncHandler(editCommentMiddleware),
  expressAsyncHandler(editCommentController)
);

// DELETE 댓글
bbsRouter.delete(
  "/categories/:category/posts/:post_id/comments/:comment_id",
  expressAsyncHandler(deleteCommentMiddleware),
  expressAsyncHandler(deleteCommentController)
);

// CREATE 답글
bbsRouter.post(
  "/categories/:category/posts/:post_id/comments/:comment_id/replies",
  expressAsyncHandler(createReplyMiddleware),
  expressAsyncHandler(createReplyController)
);

// PATCH 답글
bbsRouter.patch(
  "/categories/:category/posts/:post_id/comments/:comment_id/replies/:reply_id",
  expressAsyncHandler(editReplyMiddleware),
  expressAsyncHandler(editReplyController)
);

// DELETE 답글
bbsRouter.delete(
  "/categories/:category/posts/:post_id/comments/:comment_id/replies/:reply_id",
  expressAsyncHandler(deleteReplyMiddleware),
  expressAsyncHandler(deleteReplyController)
);

// CREATE 좋아요
bbsRouter.post(
  "/categories/:category/posts/:post_id/likes",
  expressAsyncHandler(createLikeMiddleware),
  expressAsyncHandler(createLikeController)
);

// DELETE 좋아요
bbsRouter.delete(
  "/categories/:category/posts/:post_id/likes",
  expressAsyncHandler(deleteLikeMiddleware),
  expressAsyncHandler(deleteLikeController)
);

// CREATE 스크랩
bbsRouter.post(
  "/categories/:category/posts/:post_id/scraps",
  expressAsyncHandler(createScrapMiddleware),
  expressAsyncHandler(createScrapController)
);

// DELETE 스크랩
bbsRouter.delete(
  "/categories/:category/posts/:post_id/scraps",
  expressAsyncHandler(deleteScrapMiddleware),
  expressAsyncHandler(deleteScrapController)
);

export default bbsRouter;
