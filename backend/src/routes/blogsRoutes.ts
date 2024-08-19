import { Router } from "express";
import {
  getAllBlogsHandler,
  getBlogByIdHandler,
  getUserAndUserBlogs,
  incrementBlogTotalVisitHandler,
} from "../controllers/blogsController";
const blogsRoutes = Router();

blogsRoutes.get("/", getAllBlogsHandler);
blogsRoutes.get("/:blogId", getBlogByIdHandler);
blogsRoutes.post("/:blogId/visit", incrementBlogTotalVisitHandler);
blogsRoutes.get("/userBlogs/:username", getUserAndUserBlogs);
export default blogsRoutes;
