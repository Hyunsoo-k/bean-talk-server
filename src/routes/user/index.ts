import express from "express";
import expressAsyncHandler from "express-async-handler";

import getUserMiddleware from "../../middleware/user/get-user-middleware.js";
import getUserController from "../../controller/user/get-user-controller.js";
import editUserMiddleware from "../../middleware/user/edit-user-middkeware.js";
import editUserController from "../../controller/user/edit-user-controller.js";
import deleteUserMiddleware from "../../middleware/user/delete-user-middleware.js";
import deleteUserController from "../../controller/user/delete-user-controller.js";

const userRouter = express.Router();
userRouter.get(
  "/:_id",
  expressAsyncHandler(getUserMiddleware),
  expressAsyncHandler(getUserController)
);

userRouter.patch(
  "/edit",
  expressAsyncHandler(editUserMiddleware),
  expressAsyncHandler(editUserController)
);

userRouter.delete(
  "/delete",
  expressAsyncHandler(deleteUserMiddleware),
  expressAsyncHandler(deleteUserController)
);

export default userRouter;