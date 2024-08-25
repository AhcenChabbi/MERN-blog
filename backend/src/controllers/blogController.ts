import mongoose from "mongoose";
import { CREATED, FORBIDDEN, NOT_FOUND, OK } from "../constants/http";
import {
  createBlog,
  toggleBookmark,
  toggleLike,
  updateBlog,
} from "../services/blogService";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { blogSchema, stringArraySchema, updateBlogSchema } from "./blogSchema";
import blogModel from "../models/blogModel";
import { authorFieldsProjection } from "../constants/authorFieldsProjection";
import userModel from "../models/userModel";

export const createBlogHandler = catchErrors(async (req, res) => {
  const { title, banner, content } = blogSchema.parse(req.body);
  const { userId } = req;
  const { newBlog } = await createBlog({
    banner,
    title,
    content,
    author: userId,
  });
  return res.status(CREATED).json(newBlog);
});

export const updateBlogHandler = catchErrors(async (req, res) => {
  const { banner, title, content } = updateBlogSchema.parse(req.body);
  const { blogId } = req.params;
  appAssert(mongoose.isValidObjectId(blogId), NOT_FOUND, "Blog not found");
  const { userId } = req;
  const { blog } = await updateBlog({ blogId, banner, title, content, userId });
  return res.status(OK).json(blog);
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

export const getReadingListHandler = catchErrors(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 9;
  const skip = (page - 1) * limit;

  const { blogIds } = stringArraySchema.parse(req.body);
  const totalBookmarkedBlogs = await blogModel.countDocuments({
    _id: { $in: blogIds },
  });
  const blogs = await blogModel
    .find({ _id: { $in: blogIds } })
    .skip(skip)
    .limit(limit)
    .populate(authorFieldsProjection)
    .sort({ createdAt: -1 });
  res.status(OK).json({
    blogs: blogs.map((blog) => blog.toObject()),
    totalPages: Math.ceil(totalBookmarkedBlogs / limit),
  });
});

export const getMyBlogsHandler = catchErrors(async (req, res) => {
  const { userId } = req;
  const userBlogs = await blogModel
    .find({ author: userId })
    .populate(authorFieldsProjection)
    .sort({ createdAt: -1 });
  return res.status(OK).json({
    blogs: userBlogs.map((blog) => blog.toObject()),
  });
});

export const deleteBlogHandler = catchErrors(async (req, res) => {
  const { blogId } = req.params;
  appAssert(
    mongoose.Types.ObjectId.isValid(blogId),
    NOT_FOUND,
    "Blog not found"
  );
  const blog = await blogModel.findById(blogId);
  appAssert(blog, NOT_FOUND, "Blog not found");
  const { userId } = req;
  appAssert(
    blog.author.toString() === userId.toString(),
    FORBIDDEN,
    "You do not have permission to delete this blog"
  );
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");
  user.blogPublished -= 1;
  user.totalReactions -= blog.totalReaction;
  user.totalVisits -= blog.totalVisit;
  const updatedUser = await user.save();
  await blogModel.deleteOne({ _id: blogId });
  return res.status(OK).json({ user: updatedUser.omitPassword() });
});
