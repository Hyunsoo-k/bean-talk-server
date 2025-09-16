import express from "express";
import expressAsyncHandler from "express-async-handler";

import getUserMiddleware from "../middleware/users/get-user-middleware.js";
import getUserController from "../controller/users/get-user-controller.js";
import editUserMiddleware from "../middleware/users/edit-user-middleware.js";
import editUserController from "../controller/users/edit-user-controller.js";
import deleteUserMiddleware from "../middleware/users/delete-user-middleware.js";
import deleteUserController from "../controller/users/delete-user-controller.js";
import getUserNotificationsMiddleware from "../middleware/users/get-user-notifications-middleware.js";
import getUserNotificationsController from "../controller/users/get-user-notifications-controller.js";
import checkUserNotificationMiddleware from "../middleware/users/check-user-notifications-middleware.js";
import checkUserNotificationController from "../controller/users/check-user-notifications-controller.js";
import deleteUserNotificationMiddleware from "../middleware/users/delete-user-notification-middleware.js";
import deleteUserNotificationController from "../controller/users/delete-user-notification-controller.js";

const usersRouter = express.Router();

// GET 유저 정보 요청
usersRouter.get(
  "/:_id",
  expressAsyncHandler(getUserMiddleware),
  expressAsyncHandler(getUserController)
);

// PATCH 유저 정보 수정
usersRouter.patch(
  "/edit",
  expressAsyncHandler(editUserMiddleware),
  expressAsyncHandler(editUserController)
);

// DELETE 유저 정보 삭제
usersRouter.delete(
  "/delete",
  expressAsyncHandler(deleteUserMiddleware),
  expressAsyncHandler(deleteUserController)
);

// GET 유저 알림 요청
usersRouter.get(
  "/notifications",
  expressAsyncHandler(getUserNotificationsMiddleware),
  expressAsyncHandler(getUserNotificationsController)
);

// PATCH 유저 알림 확인
usersRouter.patch(
  "/notifications/:notification_id",
  expressAsyncHandler(checkUserNotificationMiddleware),
  expressAsyncHandler(checkUserNotificationController)
);

// DELETE 유저 알림 삭제
usersRouter.delete(
  "/notifications/:notification_id",
  expressAsyncHandler(deleteUserNotificationMiddleware),
  expressAsyncHandler(deleteUserNotificationController)
);

export default usersRouter;
