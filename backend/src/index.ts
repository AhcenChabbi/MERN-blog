import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import connectToDatabase from "./config/db";
import errHandler from "./middleware/errHandler";
import { OK } from "./constants/http";
import authRoute from "./routes/authRoutes";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/userRoutes";
import sessionRoutes from "./routes/sessionRoutes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/auth", authRoute);

//protected routes
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);
// health check
app.get("/", async (_, res) => {
  return res.status(OK).json({
    status: "healthy",
  });
});
app.use(errHandler);
app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
