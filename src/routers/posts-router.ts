import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  verifyAccessToken,
  validateCategory,
  validatePost
} from "../middlewares/index.js";
import {
  getPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
  toggleLike,
  toggleScrap
} from "../controllers/posts/index.js";

const postsRouter = express.Router({ mergeParams: true });

// GET 게시글 목록
postsRouter.get(
  "/",
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(getPosts)
);

// GET 게시글
postsRouter.get(
  "/:post_id",
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(getPost),
);

// CREATE 게시글
postsRouter.post(
  "/",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(validatePost),
  expressAsyncHandler(createPost)
);

// EDIT 게시글
postsRouter.patch(
  "/:post_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(validatePost),
  expressAsyncHandler(editPost)
);

// DELETE 게시글
postsRouter.delete(
  "/:post_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(deletePost)
);

// PATCH 게시글 좋아요 토글
postsRouter.patch(
  "/:post_id/likes",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(toggleLike)
);

// PATCH 게시글 스크랩 토글
postsRouter.patch(
  "/:post_id/scraps",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(toggleScrap)
);

export default postsRouter;