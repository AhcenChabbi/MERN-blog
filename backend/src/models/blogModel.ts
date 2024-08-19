import mongoose from "mongoose";
import { IImage, imageSchema } from "../constants/Image";
import { userDocument } from "./userModel";

export interface blogDocument extends mongoose.Document {
  banner: IImage;
  title: string;
  content: string;
  author: userDocument;
  readingTime: number;
  totalReaction: number;
  totalBookmark: number;
  createdAt: Date;
  totalVisit: number;
  updatedAt: Date;
}

const blogSchema = new mongoose.Schema<blogDocument>(
  {
    banner: {
      type: imageSchema,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    totalReaction: {
      type: Number,
      default: 0,
    },
    totalBookmark: {
      type: Number,
      default: 0,
    },
    totalVisit: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model<blogDocument>("Blog", blogSchema);
export default blogModel;
