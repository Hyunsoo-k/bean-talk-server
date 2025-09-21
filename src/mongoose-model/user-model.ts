import mongoose from "mongoose";

import UserSchema from "../mongoose-schema/user-schema.js";

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
