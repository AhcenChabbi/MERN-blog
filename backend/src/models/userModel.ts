import mongoose from "mongoose";
import { compareValues, hashValue } from "../utils/bcrypt";

export interface userDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  comparePassword: (val: string) => Promise<boolean>;
  omitPassword: () => Pick<
    userDocument,
    | "username"
    | "email"
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "verified"
    | "__v"
  >;
}
const userSchema = new mongoose.Schema<userDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashValue(this.password, 8);
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return compareValues(value, this.password);
};
userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const userModel = mongoose.model<userDocument>("User", userSchema);

export default userModel;
