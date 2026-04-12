import express from "express";
import expressAsyncHandler from "express-async-handler";

import validateSearchLocalQuery from "../middlewares/validate-search-local-query.js";
import { searchLocalController } from "../controllers/search-local/index.js";

const searchLocalRouter = express.Router({ mergeParams: true });

searchLocalRouter.get(
  "/",
  expressAsyncHandler(validateSearchLocalQuery),
  expressAsyncHandler(searchLocalController)
);

export default searchLocalRouter;