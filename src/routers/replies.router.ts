import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  createReplyMiddleware,
  editReplyMiddleware,
  deleteReplyMiddleware
} from "../middleware/replies/index.js";

import { 
  createReplyController,
  editReplyController,
  deleteReplyController
} from "../controller/replies/index.js";

const repliesRouter = express.Router({ mergeParams: true });

// CREATE 답글
repliesRouter.post(
  "/",
  expressAsyncHandler(createReplyMiddleware),
  expressAsyncHandler(createReplyController)
);

// EDIT 답글
repliesRouter.patch(
  "/:reply_id",
  expressAsyncHandler(editReplyMiddleware),
  expressAsyncHandler(editReplyController)
);

// DELETE 답글
repliesRouter.delete(
  "/:reply_id",
  expressAsyncHandler(deleteReplyMiddleware),
  expressAsyncHandler(deleteReplyController)
);

export default repliesRouter;