import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  validateSignup,
  validateLogin
} from "../middlewares/index.js";
import {
  signup,
  login
} from "../controllers/auth/index.js";

const authRouter = express.Router();

// POST 회원 가입
authRouter.post(
  "/signup",
  expressAsyncHandler(validateSignup),
  expressAsyncHandler(signup)
);

// POST 로그인
authRouter.post(
  "/login",
  expressAsyncHandler(validateLogin),
  expressAsyncHandler(login)
);

export default authRouter;
