import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import AppError from "../utils/AppError";
import { clearAuthCookies, REFRESH_Path } from "../utils/cookies";

const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};
const handleAppError = (res: Response, error: AppError) => {
  return res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
  });
};
const errHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`PATH ${req.path}`, error);
  if (req.path === REFRESH_Path) {
    clearAuthCookies(res);
  }

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }
  if (error instanceof AppError) {
    handleAppError(res, error);
  }
  return res.status(INTERNAL_SERVER_ERROR).json({
    message: "internal server error",
  });
};

export default errHandler;
