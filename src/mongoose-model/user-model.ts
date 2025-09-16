import mongoose from "mongoose";

import UserSchema from "../mongoose-schema/user-schema.js";
import CustomHttpError from "../types/custom-http-error.js";

const { model } = mongoose;

UserSchema.pre("save", async function () {
  const user = this as any;
  const Model = this.constructor as typeof UserModel;

  const sameEmailUser = await Model.findOne({ email: user.email });
  if (sameEmailUser && !sameEmailUser._id.equals(user._id)) {
    const err = new Error("이미 존재하는 이메일 입니다.") as CustomHttpError;
    err.status = 400;
    throw err;
  }

  const sameNicknameUser = await Model.findOne({ nickname: user.nickname });
  if (sameNicknameUser && !sameNicknameUser._id.equals(user._id)) {
    const err = new Error("이미 존재하는 닉네임 입니다.") as CustomHttpError;
    err.status = 400;
    throw err;
  }
});

const UserModel = model("User", UserSchema);

export default UserModel;
