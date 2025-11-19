import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  getPostsMiddleware,
  getPostMiddleware,
  createPostMiddleware,
  editPostMiddleware,
  deletePostMiddleware
} from "../middleware/posts/index.js"
import {
  getPostsController,
  getPostController,
  createPostController,
  editPostController,
  deletePostController
} from "../controller/posts/index.js";

const postsRouter = express.Router({ mergeParams: true });

// GET 게시글 목록
postsRouter.get(
  "/",
  expressAsyncHandler(getPostsMiddleware),
  expressAsyncHandler(getPostsController)
);

// GET 게시글
postsRouter.get(
  "/:post_id",
  expressAsyncHandler(getPostMiddleware),
  expressAsyncHandler(getPostController)
);

// CREATE 게시글
postsRouter.post(
  "/",
  expressAsyncHandler(createPostMiddleware),
  expressAsyncHandler(createPostController)
);

// EDIT 게시글
postsRouter.patch(
  "/:post_id",
  expressAsyncHandler(editPostMiddleware),
  expressAsyncHandler(editPostController)
);

// DELETE 게시글
postsRouter.delete(
  "/:post_id",
  expressAsyncHandler(deletePostMiddleware),
  expressAsyncHandler(deletePostController)
);

export default postsRouter;