import express from "express";
import expressAsyncHandler from "express-async-handler";

import getUserMiddleware from "../../middleware/user/get-user-middleware.js";
import getUserController from "../../controller/user/get-user-controller.js";
import editUserMiddleware from "../../middleware/user/edit-user-middkeware.js";
import editUserController from "../../controller/user/edit-user-controller.js";
import deleteUserMiddleware from "../../middleware/user/delete-user-middleware.js";
import deleteUserController from "../../controller/user/delete-user-controller.js";
import getUserNotificationsMiddleware from "../../middleware/user/get-user-notifications-middleware.js";
import getUserNotificationsController from "../../controller/user/get-user-notifications-controller.js";
import checkUserNotificationMiddleware from "../../middleware/user/check-user-notifications-middleware.js";
import checkUserNotificationController from "../../controller/user/check-user-notifications-controller.js";
import deleteUserNotificationMiddleware from "../../middleware/user/delete-user-notification-middleware.js";
import deleteUserNotificationController from "../../controller/user/delete-user-notification-controller.js";

const userRouter = express.Router();

// GET 유저 정보 요청
userRouter.get(
  "/:_id",
  expressAsyncHandler(getUserMiddleware),
  expressAsyncHandler(getUserController)
);

// PATCH 유저 정보 수정
userRouter.patch(
  "/edit",
  expressAsyncHandler(editUserMiddleware),
  expressAsyncHandler(editUserController)
);

// DELETE 유저 정보 삭제
userRouter.delete(
  "/delete",
  expressAsyncHandler(deleteUserMiddleware),
  expressAsyncHandler(deleteUserController)
);


// GET 유저 알림 요청
userRouter.get(
  "notifications",
  expressAsyncHandler(getUserNotificationsMiddleware),
  expressAsyncHandler(getUserNotificationsController)
);

// PATCH 유저 알림 확인
userRouter.patch(
  "notifications/:notification_id",
  expressAsyncHandler(checkUserNotificationMiddleware),
  expressAsyncHandler(checkUserNotificationController)
);

// DELETE 유저 알림 삭제
userRouter.delete(
  "notifications/:notification_id",
  expressAsyncHandler(deleteUserNotificationMiddleware),
  expressAsyncHandler(deleteUserNotificationController)
);

export default userRouter;