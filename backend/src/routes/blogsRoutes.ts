import { Router } from "express";
import {
  getAllBlogsHandler,
  getBlogByIdHandler,
} from "../controllers/blogsController";
const blogsRoutes = Router();

blogsRoutes.get("/", getAllBlogsHandler);
blogsRoutes.get("/:blogId", getBlogByIdHandler);
export default blogsRoutes;
