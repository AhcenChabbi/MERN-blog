import { Router } from "express";
import {
  createBlogHandler,
  deleteBlogHandler,
  getReadingListHandler,
  getMyBlogsHandler,
  toggleBookmarkHandler,
  toggleLikeHandler,
  updateBlogHandler,
} from "../controllers/blogController";

const blogRoutes = Router();
blogRoutes.post("/", createBlogHandler);

blogRoutes.post("/liked/:blogId", toggleLikeHandler);
blogRoutes.post("/bookmarked/:blogId", toggleBookmarkHandler);

blogRoutes.post("/readinglist", getReadingListHandler);
blogRoutes.get("/", getMyBlogsHandler);

blogRoutes.delete("/:blogId", deleteBlogHandler);
blogRoutes.patch("/:blogId", updateBlogHandler);
export default blogRoutes;
