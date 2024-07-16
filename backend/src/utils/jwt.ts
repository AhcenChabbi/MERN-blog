import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { sessionDocument } from "../models/sessionModel";
import { userDocument } from "../models/userModel";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import jwt from "jsonwebtoken";
export type RefreshTokenPayload = {
  sessionId: sessionDocument["_id"];
};
type AccessTokenPayload = {
  sessionId: sessionDocument["_id"];
  userId: userDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};
const defaults: SignOptions = {
  audience: ["user"],
};
const accessTokenSignOptionsAndSecret: SignOptionsAndSecret = {
  secret: JWT_SECRET,
  expiresIn: "15m",
};
export const RefreshTokenSignOptionsAndSecret: SignOptionsAndSecret = {
  secret: JWT_REFRESH_SECRET,
  expiresIn: "30d",
};

export const signToken = (
  Payload: RefreshTokenPayload | AccessTokenPayload,
  Options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = Options || accessTokenSignOptionsAndSecret;
  return jwt.sign(Payload, secret, { ...defaults, ...signOpts });
};
export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = JWT_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...verifyOpts,
    }) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
