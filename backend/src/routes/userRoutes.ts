import { Router } from "express";
import {
  deleteUserHandler,
  getUserHandler,
  updateUserHandler,
  updateUserPasswordHandler,
} from "../controllers/userController";

const userRoutes = Router();
userRoutes.get("/", getUserHandler);
userRoutes.patch("/", updateUserHandler);
userRoutes.patch("/updatePassword", updateUserPasswordHandler);
userRoutes.delete("/", deleteUserHandler);
export default userRoutes;
