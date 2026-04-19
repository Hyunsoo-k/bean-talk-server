import express from "express";
import expressAsyncHandler from "express-async-handler";

import { validatePostsQueryString } from "../middlewares/index.js";
import { getIntegratedSearch } from "../controllers/get-integrated-search/index.js"

const integratedSearchRouter = express.Router({ mergeParams: true });

// GET 통합 게시글 목록
integratedSearchRouter.get(
  "/",
  expressAsyncHandler(validatePostsQueryString),
  expressAsyncHandler(getIntegratedSearch)
);

export default integratedSearchRouter;