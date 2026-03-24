import express from "express";
import expressAsyncHandler from "express-async-handler";

import { validateQueryString } from "../middlewares/index.js";
import { getIntegratedSearch } from "../controllers/integratedPosts/index.js"

const integratedSearchRouter = express.Router({ mergeParams: true });

// GET 통합 게시글 목록
integratedSearchRouter.get(
  "/",
  expressAsyncHandler(validateQueryString),
  expressAsyncHandler(getIntegratedSearch)
);

export default integratedSearchRouter;