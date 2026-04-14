import express from "express";
import expressAsyncHandler from "express-async-handler";

import { validatePostsQueryString } from "../middlewares/index.js";
import { getIntegratedSearch } from "../controllers/integratedPosts/index.js"

const allPostsSearchRouter = express.Router({ mergeParams: true });

// GET 통합 게시글 목록
allPostsSearchRouter.get(
  "/",
  expressAsyncHandler(validatePostsQueryString),
  expressAsyncHandler(getIntegratedSearch)
);

export default allPostsSearchRouter;