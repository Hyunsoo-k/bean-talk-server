import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  verifyAccessToken,
  validateCategory,
  validatePost
} from "../middlewares/index.js";

import {
  getComments,
  createComment,
  editComment,
  deleteComment
} from "../controllers/comments/index.js";
import validateComment from "../middlewares/validate-comment.js";

const commentsRouter = express.Router({ mergeParams: true });

// GET 댓글 목록
commentsRouter.get(
  "/",
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(getComments),
);

// CREATE 댓글
commentsRouter.post(
  "/",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(validateComment),
  expressAsyncHandler(createComment)
);

// EDIT 댓글
commentsRouter.patch(
  "/:comment_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(validateComment),
  expressAsyncHandler(editComment)
)

// DELETE 댓글
commentsRouter.delete(
  "/:comment_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(deleteComment)
);

export default commentsRouter;