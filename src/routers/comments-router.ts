import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  getCommentsMiddleware,
  createCommentMiddleware,
  editCommentMiddleware,
  deleteCommentMiddleware
} from "../middleware/comments/index.js";

import {
  getCommentsController,
  createCommentController,
  editCommentController,
  deleteCommentController
} from "../controller/comments/index.js";

const commentsRouter = express.Router({ mergeParams: true });

// GET 댓글 목록
commentsRouter.get(
  "/",
  expressAsyncHandler(getCommentsMiddleware),
  expressAsyncHandler(getCommentsController)
);

// CREATE 댓글
commentsRouter.post(
  "/",
  expressAsyncHandler(createCommentMiddleware),
  expressAsyncHandler(createCommentController)
);

// EDIT 댓글
commentsRouter.patch(
  "/:comment_id",
  expressAsyncHandler(editCommentMiddleware),
  expressAsyncHandler(editCommentController)
)

// DELETE 댓글
commentsRouter.delete(
  "/:comment_id",
  expressAsyncHandler(deleteCommentMiddleware),
  expressAsyncHandler(deleteCommentController)
);

export default commentsRouter;