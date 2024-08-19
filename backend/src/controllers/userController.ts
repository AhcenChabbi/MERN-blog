import { NOT_FOUND, OK } from "../constants/http";
import blogModel from "../models/blogModel";
import sessionModel from "../models/sessionModel";
import userModel from "../models/userModel";
import { updateUser, updateUserPassword } from "../services/userService";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { deleteFromCloudinary } from "../utils/cloudinary";
import { clearAuthCookies } from "../utils/cookies";
import { updateUserPasswordSchema, updateUserSchema } from "./authSchemas";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await userModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});

export const updateUserHandler = catchErrors(async (req, res) => {
  const { profile, username, email, bio } = updateUserSchema.parse(req.body);
  const { userId } = req;
  const { user } = await updateUser({ userId, profile, username, email, bio });
  return res.status(OK).json(user);
});

export const updateUserPasswordHandler = catchErrors(async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } =
    updateUserPasswordSchema.parse(req.body);
  const { userId } = req;
  const { user } = await updateUserPassword({
    userId,
    oldPassword,
    newPassword,
    confirmNewPassword,
  });
  return res.status(OK).json(user);
});

export const deleteUserHandler = catchErrors(async (req, res) => {
  const { userId } = req;
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");
  await blogModel.deleteMany({ author: userId });
  await sessionModel.deleteMany({ userId });
  await deleteFromCloudinary(user.profile.publicId);
  await user.deleteOne();
  return clearAuthCookies(res).status(OK).json({
    message: "User deleted successfully",
  });
});
