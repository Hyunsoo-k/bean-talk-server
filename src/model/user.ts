import mongoose from "mongoose";

const { Schema, model } = mongoose;
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

UserSchema.pre("save", async function (next) {
  const user = this as any;

  const isEmailExists = await UserModel.exists({ email: user.email })
  if (isEmailExists) return next(new Error("이미 존재하는 이메일입니다."));

  const isNicknameExists = await UserModel.exists({ nickname: user.nickname });
  if (isNicknameExists) return next(new Error("이미 존재하는 닉네임입니다."));

  next();
});

UserSchema.pre("findOneAndUpdate", async function(next) {
  const update = this.getUpdate();
  if (!update) return next();

  if (typeof update === "object" && "nickname" in update) {
    const nickname = (update as any).nickname;
    const isNicknameExists = await UserModel.exists({ nickname });
    if (isNicknameExists) return next(new Error("이미 존재하는 닉네임입니다."));
  }

next();
});

const UserModel = model("User", UserSchema);

export default UserModel;
