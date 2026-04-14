import express from "express";
import expressAsyncHandler from "express-async-handler";

import validateLocalsQueryString from "../middlewares/validate-locals-query-string.js";
import { searchLocalController } from "../controllers/search-local/index.js";

const localsSearchRouter = express.Router({ mergeParams: true });

localsSearchRouter.get(
  "/",
  expressAsyncHandler(validateLocalsQueryString),
  expressAsyncHandler(searchLocalController)
);

export default localsSearchRouter;