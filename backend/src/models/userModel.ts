import mongoose from "mongoose";
import { compareValues, hashValue } from "../utils/bcrypt";
import { IImage, imageSchema } from "../constants/Image";

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
    | "bio"
    | "totalReactions"
    | "totalVisits"
    | "blogPublished"
    | "likedBlogs"
    | "profile"
    | "bookmarkedBlogs"
  >;
  profile: IImage;
  bio: string;
  totalReactions: number;
  totalVisits: number;
  blogPublished: number;
  likedBlogs: mongoose.Types.ObjectId[];
  bookmarkedBlogs: mongoose.Types.ObjectId[];
}
const userSchema = new mongoose.Schema<userDocument>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false, required: true },

    bio: { type: String, default: "" },
    totalReactions: { type: Number, default: 0 },
    totalVisits: { type: Number, default: 0 },
    blogPublished: { type: Number, default: 0 },
    profile: {
      type: imageSchema,
      default: {
        publicId: "",
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
    },
    likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
    bookmarkedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
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
