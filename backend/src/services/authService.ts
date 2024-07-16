import { APP_ORIGIN, JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import {
  CONFLICT,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/http";
import verificationCodeType from "../constants/verificationCodeType";
import sessionModel from "../models/sessionModel";
import userModel from "../models/userModel";
import verificationCodeModel from "../models/verificationCodeModel";
import appAssert from "../utils/appAssert";
import {
  fiveMinutesAgo,
  ONE_DAY_MS,
  oneHourFromNow,
  oneYearFromNow,
  thirtyDaysFromNow,
} from "../utils/date";
import jwt from "jsonwebtoken";
import {
  RefreshTokenPayload,
  RefreshTokenSignOptionsAndSecret,
  signToken,
  verifyToken,
} from "../utils/jwt";
import { sendMail } from "../utils/sendMail";
import {
  getPasswordResetTemplate,
  getVerifyEmailTemplate,
} from "../utils/emailTemplates";
import { hashValue } from "../utils/bcrypt";

type CreateAccountParams = {
  username: string;
  email: string;
  password: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // check if the user exists
  const userExists = await userModel.exists({
    $or: [{ username: data.username }, { email: data.email }],
  });

  appAssert(
    !userExists,
    CONFLICT,
    "User already exists with that username or email"
  );

  const user = await userModel.create({
    username: data.username,
    email: data.email,
    password: data.password,
  });

  const userId = user._id;

  const verificationCode = await verificationCodeModel.create({
    userId,
    type: verificationCodeType.EmailVerification,
    expireAt: oneYearFromNow(),
  });

  const url = `${APP_ORIGIN}/verify/email/${verificationCode._id}`;
  const { error } = await sendMail({
    to: user.email,
    ...getVerifyEmailTemplate(url),
  });
  if (error) {
    console.log(error);
  }

  const session = await sessionModel.create({
    userId,
    userAgent: data.userAgent,
  });

  const refreshToken = signToken(
    { sessionId: session._id },
    RefreshTokenSignOptionsAndSecret
  );
  const accessToken = signToken({ userId, sessionId: session._id });

  return { user: user.omitPassword(), refreshToken, accessToken };
};
type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};
export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await userModel.findOne({ email });

  appAssert(user, UNAUTHORIZED, "Invalid email or password");

  const isMatch = await user.comparePassword(password);

  appAssert(isMatch, UNAUTHORIZED, "Invalid email or password");
  const userId = user._id;
  const session = await sessionModel.create({
    userId,
    userAgent,
  });
  const sessionInfo = {
    sessionId: session._id,
  };
  const refreshToken = signToken(sessionInfo, RefreshTokenSignOptionsAndSecret);
  const accessToken = signToken({ userId, ...sessionInfo });
  return { user: user.omitPassword(), refreshToken, accessToken };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: RefreshTokenSignOptionsAndSecret.secret,
  });

  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await sessionModel.findById(payload.sessionId);
  const now = Date.now();
  appAssert(
    session && session.expiresAt.getTime() > now,
    UNAUTHORIZED,
    "Session expired"
  );

  const needsRefreshToken = session.expiresAt.getTime() - now <= ONE_DAY_MS;

  if (needsRefreshToken) {
    session.expiresAt = thirtyDaysFromNow();
    session.save();
  }

  const newRefreshToken = needsRefreshToken
    ? signToken(
        {
          sessionId: session._id,
        },
        RefreshTokenSignOptionsAndSecret
      )
    : undefined;

  const accessToken = signToken({
    sessionId: session._id,
    userId: session.userId,
  });

  return { newRefreshToken, accessToken };
};

export const verifyEmail = async (code: string) => {
  const validCode = await verificationCodeModel.findOne({
    _id: code,
    type: verificationCodeType.EmailVerification,
    expireAt: { $gt: new Date() },
  });

  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await userModel.findByIdAndUpdate(
    validCode.userId,
    {
      verified: true,
    },
    { new: true }
  );

  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");
  await validCode.deleteOne();
  return {
    user: updatedUser.omitPassword(),
  };
};

export const sendPasswordResetEmail = async (email: string) => {
  const user = await userModel.findOne({ email });
  appAssert(user, NOT_FOUND, "User not found");
  const userId = user._id;

  const fiveMinAgo = fiveMinutesAgo();
  const count = await verificationCodeModel.countDocuments({
    userId,
    type: verificationCodeType.PasswordReset,
    createdAt: { $gt: fiveMinAgo },
  });
  appAssert(
    count <= 1,
    TOO_MANY_REQUESTS,
    "Too many requests, please try again later"
  );

  const expireAt = oneHourFromNow();
  const verificationCode = await verificationCodeModel.create({
    userId,
    type: verificationCodeType.PasswordReset,
    expireAt,
  });

  const url = `${APP_ORIGIN}/password/reset?code=${
    verificationCode._id
  }&exp=${expireAt.getTime()}`;
  const { data, error } = await sendMail({
    to: user.email,
    ...getPasswordResetTemplate(url),
  });
  appAssert(
    data?.id,
    INTERNAL_SERVER_ERROR,
    `${error?.name} - ${error?.message}`
  );
  return {
    url,
    emailId: data.id,
  };
};
type ResetPasswordParams = {
  verificationCode: string;
  password: string;
};
export const resetPassword = async ({
  verificationCode,
  password,
}: ResetPasswordParams) => {
  const validCode = await verificationCodeModel.findOne({
    _id: verificationCode,
    type: verificationCodeType.PasswordReset,
    expireAt: { $gt: new Date() },
  });

  appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");

  const updatedUser = await userModel.findByIdAndUpdate(validCode.userId, {
    password: await hashValue(password),
  });
  appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");
  await validCode.deleteOne();
  await sessionModel.deleteMany({ userId: validCode.userId });
  return {
    user: updatedUser.omitPassword(),
  };
};
