import { z } from "zod";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/http";
import sessionModel from "../models/sessionModel";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getSessionsHandler = catchErrors(async (req, res) => {
  const { userId } = req;
  const sessions = await sessionModel.find(
    {
      userId,
      expiresAt: { $gt: new Date() },
    },
    { _id: 1, userAgent: 1, createdAt: 1 },
    {
      sort: { createdAt: -1 },
    }
  );
  return res.status(OK).json(
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && { isCurrent: true }),
    }))
  );
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id);
  const deleted = await sessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Session not found");
  return res.status(OK).json({ message: "Session removed" });
});
