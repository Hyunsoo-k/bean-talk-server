import type { Model } from "mongoose";
import mongoose from "mongoose";

import HttpError from "../../error/http-error.js";
import { User } from "../../types/user.js";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "이메일을 입력해 주세요."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다."],
    },
    nickname: {
      type: String,
      required: [true, "닉네임을 입력해 주세요."],
      unique: true,
      trim: true,
      minLength: [2, "닉네임은 2글자 이상이어야 합니다."],
      maxLength: [7, "닉네임은 7글자 이하여야 합니다."],
      match: [/^[가-힣a-zA-Z0-9]+$/, "한글, 영어, 숫자만 입력할 수 있습니다."],
    },
    password: {
      type: String,
      required: [true, "비밀번호를 입력해 주세요."],
      /** can't validate hashed password length */
      trim: true,
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    role: {
    type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (): Promise<void> {
  const Model = this.constructor as Model<User>;

  const sameEmailUser = await Model.findOne({ email: this.email });
  if (sameEmailUser && !sameEmailUser._id.equals(this._id)) {
    throw new HttpError(400, "이미 존재하는 이메일 입니다.");
  }

  const sameNicknameUser = await Model.findOne({ nickname: this.nickname });
  if (sameNicknameUser && !sameNicknameUser._id.equals(this._id)) {
    throw new HttpError(400, "이미 존재하는 닉네임 입니다.");
  }
});

async function checkDuplicate(this: any) {
  const Model = this.model;
  const update = this.getUpdate() as any;
  const query = this.getQuery();

  if (!update) {
    return;
  }

  const data = update.$set ?? update;

  const current = await Model.findOne(query);
  if (!current) {
    return;
  }

  if (data.email) {
    const sameEmailUser = await Model.findOne({ email: data.email });

    if (sameEmailUser && !sameEmailUser._id.equals(current._id)) {
      throw new HttpError(400, "이미 존재하는 이메일 입니다.");
    }
  }

  if (data.nickname) {
    const sameNicknameUser = await Model.findOne({ nickname: data.nickname });

    if (sameNicknameUser && !sameNicknameUser._id.equals(current._id)) {
      throw new HttpError(400, "이미 존재하는 닉네임 입니다.");
    }
  }
}

UserSchema.pre("findOneAndUpdate", checkDuplicate);
UserSchema.pre("updateOne", checkDuplicate);

export default UserSchema;
