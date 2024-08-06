import { Router } from "express";
import {
  createBlogHandler,
  toggleBookmarkHandler,
  toggleLikeHandler,
} from "../controllers/blogController";

const blogRoutes = Router();
blogRoutes.post("/", createBlogHandler);
blogRoutes.post("/liked/:blogId", toggleLikeHandler);
blogRoutes.post("/bookmarked/:blogId", toggleBookmarkHandler);
export default blogRoutes;
