import mongoose from "mongoose";

import NotificationSchema from "../mongoose-schema/notification-schema.js";

const { model } = mongoose;
const NotificationModel = model("Notifications", NotificationSchema);

export default NotificationModel;
