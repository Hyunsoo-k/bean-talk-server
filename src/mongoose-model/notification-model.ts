import mongoose from "mongoose";

import NotificationSchema from "../mongoose-schema/notification-schema.js";

const NotificationModel = mongoose.model("Notifications", NotificationSchema);

export default NotificationModel;
