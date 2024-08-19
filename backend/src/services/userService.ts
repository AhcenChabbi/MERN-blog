import mongoose from "mongoose";
import userModel from "../models/userModel";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from "../constants/http";
import appAssert from "../utils/appAssert";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { hashValue } from "../utils/bcrypt";

type UpdateUserCredentials = {
  userId: mongoose.Types.ObjectId;
  profile: string | undefined;
  username: string | undefined;
  email: string | undefined;
  bio: string | undefined;
};
export const updateUser = async ({
  userId,
  profile,
  username,
  email,
  bio,
}: UpdateUserCredentials) => {
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  if (username && username !== user.username) {
    const existingUser = await userModel.findOne({ username });
    appAssert(!existingUser, NOT_FOUND, "Username already taken");
    user.username = username;
  }

  if (email && email !== user.email) {
    const existingUser = await userModel.findOne({ email });
    appAssert(!existingUser, NOT_FOUND, "Email already taken");
    user.email = email;
  }

  if (bio) {
    user.bio = bio;
  }
  if (profile) {
    if (user.profile.publicId) {
      await deleteFromCloudinary(user.profile.publicId);
    }
    user.profile = await uploadToCloudinary(profile);
  }
  const updatedUser = await user.save();
  return { user: updatedUser.omitPassword() };
};
type UpdateUserPassword = {
  userId: mongoose.Types.ObjectId;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export const updateUserPassword = async ({
  userId,
  oldPassword,
  newPassword,
  confirmNewPassword,
}: UpdateUserPassword) => {
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");
  const isMatch = await user.comparePassword(oldPassword);
  appAssert(isMatch, UNAUTHORIZED, "Old password is incorrect");
  appAssert(
    newPassword === confirmNewPassword,
    BAD_REQUEST,
    "Passwords do not match"
  );
  const updatedUser = await userModel.findByIdAndUpdate(userId, {
    password: await hashValue(newPassword),
  });
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to update password");
  return { user: updatedUser.omitPassword() };
};
