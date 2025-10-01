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
import deletePostMiddleware from "../middleware/posts/delete-post-middileware.js";
import deletePostController from "../controller/posts/delete-post-controller.js";
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

const bbsRouter = express.Router();

// GET 게시글 목록 요청
bbsRouter.get(
  "/categories/:category/sub-categories/:subCategory/posts",
  expressAsyncHandler(getPostsMiddleware),
  expressAsyncHandler(getPostsController)
);

// GET 게시글 요청
bbsRouter.get(
  "/categories/:category/posts/:post_id",
  expressAsyncHandler(getPostMiddleware),
  expressAsyncHandler(getPostController)
);

// POST 게시글 작성
bbsRouter.post(
  "/categories/:category/posts",
  expressAsyncHandler(createPostMiddleware),
  expressAsyncHandler(createPostController)
);

// PATCH 게시글 수정
bbsRouter.patch(
  "/categories/:category/posts/:post_id",
  expressAsyncHandler(editPostMiddleware),
  expressAsyncHandler(editPostController)
);

// GET 게시글 삭제
bbsRouter.delete(
  "/categories/:category/posts/:post_id",
  expressAsyncHandler(deletePostMiddleware),
  expressAsyncHandler(deletePostController)
);

// POST 댓글 생성
bbsRouter.post(
  "/categories/:category/posts/:post_id/comments",
  expressAsyncHandler(createCommentMiddleware),
  expressAsyncHandler(createCommentController)
);

// PATCH 댓글 수정
bbsRouter.patch(
  "/categories/:category/posts/:post_id/comments/:comment_id",
  expressAsyncHandler(editCommentMiddleware),
  expressAsyncHandler(editCommentController)
);

// DELETE 댓글 삭제
bbsRouter.delete(
  "/categories/:category/posts/:post_id/comments/:comment_id",
  expressAsyncHandler(deleteCommentMiddleware),
  expressAsyncHandler(deleteCommentController)
);

// POST 답글 생성
bbsRouter.post(
  "/categories/:category/posts/:post_id/comments/:comment_id",
  expressAsyncHandler(createReplyMiddleware),
  expressAsyncHandler(createReplyController)
);

// PATCH 답글 수정
bbsRouter.post(
  "/categories/:category/posts/:post_id/comments/:comment_id/replies/:reply_id",
  expressAsyncHandler(editReplyMiddleware),
  expressAsyncHandler(editReplyController)
);

// DELETE 답글 삭제
bbsRouter.post(
  "/categories/:category/posts/:post_id/comments/:comment_id/replies/:reply_id",
  expressAsyncHandler(deleteReplyMiddleware),
  expressAsyncHandler(deleteReplyController)
);

export default bbsRouter;
