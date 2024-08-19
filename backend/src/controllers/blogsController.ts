import mongoose from "mongoose";
import { NOT_FOUND, OK } from "../constants/http";
import blogModel, { blogDocument } from "../models/blogModel";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { authorFieldsProjection } from "../constants/authorFieldsProjection";
import userModel from "../models/userModel";

export const getAllBlogsHandler = catchErrors(async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 9;
  const skip = (page - 1) * limit;
  const totalBlogs = await blogModel.countDocuments();
  const latestBlogs = await blogModel
    .find()
    .skip(skip)
    .limit(limit)
    .populate(authorFieldsProjection)
    .sort({ createdAt: -1 });
  return res.status(OK).json({
    blogs: latestBlogs.map((blog) => blog.toObject()),
    totalPages: Math.ceil(totalBlogs / limit),
  });
});

export const getBlogByIdHandler = catchErrors(async (req, res) => {
  const { blogId } = req.params;
  appAssert(
    mongoose.Types.ObjectId.isValid(blogId),
    NOT_FOUND,
    "Blog not found"
  );
  const blog = await blogModel
    .findById(blogId)
    .populate(authorFieldsProjection);
  appAssert(blog, NOT_FOUND, "Blog not found");
  const authorBlogs = await blogModel
    .find({ author: blog.author, _id: { $ne: blogId } })
    .populate(authorFieldsProjection)
    .sort({ createdAt: "descending" })
    .limit(3);

  res.status(OK).json({
    blog: blog.toObject(),
    authorBlogs: authorBlogs.map((authorBlog) => authorBlog.toObject()),
  });
});

export const incrementBlogTotalVisitHandler = catchErrors(async (req, res) => {
  const { blogId } = req.params;
  appAssert(
    mongoose.Types.ObjectId.isValid(blogId),
    NOT_FOUND,
    "Blog not found"
  );
  const visitedBlog = (await blogModel.findById(blogId).populate({
    path: "author",
    select: "totalVisits",
  })) as blogDocument;
  visitedBlog.totalVisit++;
  visitedBlog.author.totalVisits++;
  visitedBlog.author.save();
  visitedBlog.save();
  return res.status(OK).json(blogId);
});

export const getUserAndUserBlogs = catchErrors(async (req, res) => {
  const { username } = req.params;
  const user = await userModel
    .findOne({ username })
    .select("username profile _id bio createdAt blogPublished");
  appAssert(user, NOT_FOUND, "User not found");
  const userBlogs = await blogModel
    .find({ author: user._id })
    .populate(authorFieldsProjection)
    .sort({ createdAt: -1 });
  return res.status(OK).json({
    blogs: userBlogs.map((blog) => blog.toObject()),
    user: user,
  });
});
