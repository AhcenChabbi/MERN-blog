import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import AppErrorCode from "../constants/AppErrorCode";
const authenticate: RequestHandler = async (req, res, next) => {
  const accesToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accesToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );
  const { payload, error } = verifyToken(accesToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
