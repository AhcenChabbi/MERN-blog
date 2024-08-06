import mongoose from "mongoose";
import { NOT_FOUND, OK } from "../constants/http";
import blogModel from "../models/blogModel";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

const authorFieldsProjection = {
  path: "author",
  select: "username profile _id",
};

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
    blogs: latestBlogs.map((blog) => blog.getPublicFields()),
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
  blog.totalVisit += 1;
  await blog.save();
  const authorBlogs = await blogModel
    .find({ author: blog.author, _id: { $ne: blogId } })
    .populate(authorFieldsProjection)
    .sort({ createdAt: "descending" })
    .limit(3);

  res.status(OK).json({
    blog: blog.getPublicFields(),
    authorBlogs: authorBlogs.map((authorBlog) => authorBlog.getPublicFields()),
  });
});
