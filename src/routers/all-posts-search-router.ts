import express from "express";
import expressAsyncHandler from "express-async-handler";

import { validatePostsQueryString } from "../middlewares/index.js";
import { getAllPostsSearch } from "../controllers/get-all-posts-search/index.js"

const allPostsSearchRouter = express.Router({ mergeParams: true });

// GET 통합 게시글 목록
allPostsSearchRouter.get(
  "/",
  expressAsyncHandler(validatePostsQueryString),
  expressAsyncHandler(getAllPostsSearch)
);

export default allPostsSearchRouter;