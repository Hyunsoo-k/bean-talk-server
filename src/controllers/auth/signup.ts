import type { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import {
  User,
  NotificationContainer,
  MyPostContainer,
  MyScrapContainer
} from "../../mongoose-models/index.js";

const signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    nickname
  } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newUser = await User.create(
      [
        {
          email,
          password: hashedPassword,
          nickname,
        }
      ],
      {
        session,
      }
    );

    const { _id: newUser_id } = newUser[0];

    await NotificationContainer.create(
      [
        {
          user_id: newUser_id,
        }
      ],
      {
        session,
      }
    );

    await MyPostContainer.create(
      [
        {
          user_id: newUser_id,
        }
      ],
      {
        session,
      }
    );

    await MyScrapContainer.create(
      [
        {
          user_id: newUser_id,
        }
      ],
      {
        session,
      }
    );

    await session.commitTransaction();

    res.status(201).json();
  } catch (error) {
    await session.abortTransaction();
    
    throw error;
  }finally {
    session.endSession();
  }
};

export default signup;