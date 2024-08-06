import mongoose from "mongoose";

export interface IImage {
  url: string;
  publicId: string;
}

export const imageSchema = new mongoose.Schema<IImage>({
  url: {
    type: String,
  },
  publicId: {
    type: String,
  },
});
