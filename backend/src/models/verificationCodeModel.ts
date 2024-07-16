import mongoose from "mongoose";
import verificationCodeType from "../constants/verificationCodeType";

export interface verificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: verificationCodeType;
  createdAt: Date;
  expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<verificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    index: true,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const verificationCodeModel = mongoose.model<verificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema,
  "verification_codes" //override the default name of the collection
);

export default verificationCodeModel;
