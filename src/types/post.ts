import mongoose from "mongoose";

import { SubCategory } from "./category.js";

type Post = {
  __v: number;
  _id: mongoose.Types.ObjectId;
  views: number;
  author: mongoose.Types.ObjectId;
  subCategory?: SubCategory; 
  thumbanilUrl?: string | null;
  title: string;
  content: string;
  employmentType?: "partTime" | "fullTime";
  position?: "barista" | "manager";
  payAmount?: number;
  startTime?: string;
  endTime?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  commentCount: number;
  likes: mongoose.Types.ObjectId[];
  scraps: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export type { Post };