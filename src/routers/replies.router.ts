import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  verifyAccessToken,
  validateCategory,
  validateComment
} from "../middlewares/index.js";
import { 
  createReply,
  editReply,
  deleteReply
} from "../controllers/replies/index.js";

const repliesRouter = express.Router({ mergeParams: true });

// CREATE 답글
repliesRouter.post(
  "/",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(validateComment),
  expressAsyncHandler(createReply)
);

// EDIT 답글
repliesRouter.patch(
  "/:reply_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(validateComment),
  expressAsyncHandler(editReply)
);

// DELETE 답글
repliesRouter.delete(
  "/:reply_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateCategory),
  expressAsyncHandler(deleteReply)
);

export default repliesRouter;