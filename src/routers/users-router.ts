import express from "express";
import expressAsyncHandler from "express-async-handler";

import getUserMiddleware from "../middleware/users/get-user-middleware.js";
import getUserController from "../controller/users/get-user-controller.js";
import getUserMeMiddleware from "../middleware/users/get-user-me-middleware.js";
import getUserMeController from "../controller/users/get-user-me-controller.js";
import editUserMiddleware from "../middleware/users/edit-user-middleware.js";
import editUserController from "../controller/users/edit-user-controller.js";
import deleteUserMiddleware from "../middleware/users/delete-user-middleware.js";
import deleteUserController from "../controller/users/delete-user-controller.js";
import getNotificationsMiddleware from "../middleware/notifications/get-notifications-middleware.js";
import getUserNotificationsController from "../controller/users/get-user-notifications-controller.js";
import checkNotificationMiddleware from "../middleware/notifications/check-notification-middleware.js";
import checkUserNotificationController from "../controller/users/check-user-notifications-controller.js";
import deleteUserNotificationMiddleware from "../middleware/notifications/delete-notification-middleware.js";
import deleteUserNotificationController from "../controller/users/delete-user-notification-controller.js";
import getMyPostsMiddleware from "../middleware/users/get-my-posts-middleware.js";
import getMyPostsController from "../controller/users/get-my-posts-controller.js";

const usersRouter = express.Router();

// GET 내 정보 요청
usersRouter.get(
  "/",
  expressAsyncHandler(getUserMeMiddleware),
  expressAsyncHandler(getUserMeController)
)

// PATCH 내 정보 수정
usersRouter.patch(
  "/",
  expressAsyncHandler(editUserMiddleware),
  expressAsyncHandler(editUserController)
);

// DELETE 내 정보 삭제
usersRouter.delete(
  "/",
  expressAsyncHandler(deleteUserMiddleware),
  expressAsyncHandler(deleteUserController)
);

// GET 내 알림 요청
usersRouter.get(
  "/notifications",
  expressAsyncHandler(getNotificationsMiddleware),
  expressAsyncHandler(getUserNotificationsController)
);

// PATCH 유저 알림 확인
usersRouter.patch(
  "/notifications/:notification_id",
  expressAsyncHandler(checkNotificationMiddleware),
  expressAsyncHandler(checkUserNotificationController)
);

// DELETE 유저 알림 삭제
usersRouter.delete(
  "/notifications/:notification_id",
  expressAsyncHandler(deleteUserNotificationMiddleware),
  expressAsyncHandler(deleteUserNotificationController)
);

// GET 내 게시글 목록 요청
usersRouter.get(
  "/my-posts",
  expressAsyncHandler(getMyPostsMiddleware),
  expressAsyncHandler(getMyPostsController)
);

// GET 내 스크램 목록 요청
// usersRouter.get(
//   "/my-posts",
//   expressAsyncHandler(deleteUserMiddleware),
//   expressAsyncHandler(deleteUserController)
// );

// GET 유저 정보 요청
usersRouter.get(
  "/:user_id",
  expressAsyncHandler(getUserMiddleware),
  expressAsyncHandler(getUserController)
);

export default usersRouter;
