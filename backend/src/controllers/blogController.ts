import mongoose from "mongoose";
import { CREATED, NOT_FOUND, OK } from "../constants/http";
import {
  createBlog,
  toggleBookmark,
  toggleLike,
} from "../services/blogService";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { blogSchema } from "./blogSchema";

export const createBlogHandler = catchErrors(async (req, res) => {
  const { title, banner, content } = blogSchema.parse(req.body);
  const { newBlog } = await createBlog({
    banner,
    title,
    content,
    author: req.userId,
  });
  return res.status(CREATED).json(newBlog);
});

export const toggleLikeHandler = catchErrors(async (req, res) => {
  const { blogId } = req.params;
  appAssert(
    mongoose.Types.ObjectId.isValid(blogId),
    NOT_FOUND,
    "Blog not found"
  );
  const { userId } = req;
  const { blog, user } = await toggleLike({
    blogId: new mongoose.Types.ObjectId(blogId),
    userId,
  });
  return res.status(OK).json({ blog, user });
});
export const toggleBookmarkHandler = catchErrors(async (req, res) => {
  const { blogId } = req.params;
  appAssert(
    mongoose.Types.ObjectId.isValid(blogId),
    NOT_FOUND,
    "Blog not found"
  );
  const { userId } = req;
  const { blog, user } = await toggleBookmark({
    blogId: new mongoose.Types.ObjectId(blogId),
    userId,
  });
  return res.status(OK).json({ blog, user });
});
