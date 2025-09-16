import mongoose from "mongoose";

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "이메일을 입력해 주세요."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "올바른 이메일 형식이 아닙니다."
      ],
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
  },
  {
    timestamps: true,
  }
);

export default UserSchema;