import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  sendPasswordResetHandler,
  verifyEmailHandler,
} from "../controllers/authController";

const authRoute = Router();

authRoute.post("/register", registerHandler);
authRoute.post("/login", loginHandler);
authRoute.get("/logout", logoutHandler);
authRoute.get("/refresh", refreshHandler);
authRoute.get("/email/verify/:code", verifyEmailHandler);
authRoute.get("/password/forgot", sendPasswordResetHandler);
authRoute.post("/password/reset", resetPasswordHandler);

export default authRoute;
