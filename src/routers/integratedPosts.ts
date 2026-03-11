import express from "express";
import expressAsyncHandler from "express-async-handler";

import { validateQuery } from "../middlewares/index.js";
import { getIntegratedPosts } from "../controllers/integratedPosts/index.js"

const integratedPostsRouter = express.Router({ mergeParams: true });

// GET 통합 게시글 목록
integratedPostsRouter.get(
  "/",
  expressAsyncHandler(validateQuery),
  expressAsyncHandler(getIntegratedPosts)
);

export default integratedPostsRouter;