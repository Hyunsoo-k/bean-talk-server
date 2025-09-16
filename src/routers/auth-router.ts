import express from "express";
import expressAsyncHandler from "express-async-handler";

import signupMiddleware from "../middleware/auth/signup-middleware.js";
import signupController from "../controller/auth/signup-controller.js";
import loginMiddleware from "../middleware/auth/login-middleware.js";
import loginController from "../controller/auth/login-controller.js";

const authRouter = express.Router();

// POST 회원 가입
authRouter.post(
  "/signup",
  expressAsyncHandler(signupMiddleware),
  expressAsyncHandler(signupController)
);

// POST 로그인
authRouter.post(
  "/login",
  expressAsyncHandler(loginMiddleware),
  expressAsyncHandler(loginController)
);

export default authRouter;
