import express from "express";
import expressAsyncHandler from "express-async-handler";

import signupMiddleware from "../../middleware/auth/signup-middleware.js";
import signupController from "../../controller/auth/signup-controller.js";
import loginMiddleware from "../../middleware/auth/login-middleware.js";
import loginController from "../../controller/auth/login-controller.js";

const authRouter = express.Router();
authRouter.post(
  "/signup",
  expressAsyncHandler(signupMiddleware),
  expressAsyncHandler(signupController)
);

authRouter.post(
  "/login",
  expressAsyncHandler(loginMiddleware),
  expressAsyncHandler(loginController)
);

export default authRouter;
