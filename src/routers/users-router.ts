import express from "express";
import expressAsyncHandler from "express-async-handler";

import {
  validateUserMe,
  verifyAccessToken
} from "../middlewares/index.js";
import {
  getUserMe,
  editUserMe,
  deleteUserMe,
  getNotifications,
  checkNotification,
  deleteNotification,
  getMyPosts,
  getMyScraps
} from "../controllers/users/index.js";


const usersRouter = express.Router();

// GET 내 정보 요청
usersRouter.get(
  "/",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(getUserMe)
)

// PATCH 내 정보 수정
usersRouter.patch(
  "/",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(validateUserMe),
  expressAsyncHandler(editUserMe)
);

// DELETE 내 정보 삭제
usersRouter.delete(
  "/",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(deleteUserMe)
);

// GET 내 알림 요청
usersRouter.get(
  "/notifications",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(getNotifications)
);

// PATCH 유저 알림 확인
usersRouter.patch(
  "/notifications/:notification_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(checkNotification)
);

// DELETE 유저 알림 삭제
usersRouter.delete(
  "/notifications/:notification_id",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(deleteNotification),
);

// GET 내 게시글 목록 요청
usersRouter.get(
  "/my-posts",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(getMyPosts)
);

// GET 내 스크랩 목록 요청
usersRouter.get(
  "/my-scraps",
  expressAsyncHandler(verifyAccessToken),
  expressAsyncHandler(getMyScraps)
);

export default usersRouter;
