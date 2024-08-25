import mongoose from "mongoose";
import blogModel, { blogDocument } from "../models/blogModel";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";
import { getReadingTime } from "../utils/readingTime";
import { NOT_FOUND, UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import userModel from "../models/userModel";
import { authorFieldsProjection } from "../constants/authorFieldsProjection";

interface CreateBlogParams {
  banner: string;
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
}
export const createBlog = async ({
  banner,
  title,
  content,
  author,
}: CreateBlogParams) => {
  const uploadedImage = await uploadToCloudinary(banner);
  const newBlog = await blogModel.create({
    banner: uploadedImage,
    title,
    content,
    author,
    readingTime: getReadingTime(content),
  });
  await userModel.findByIdAndUpdate(author, { $inc: { blogPublished: 1 } });
  return { newBlog };
};

type toggleParams = {
  blogId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
};

export const toggleLike = async ({ blogId, userId }: toggleParams) => {
  const blog = (await blogModel.findById(blogId).populate({
    path: "author",
    select: "totalReactions",
  })) as blogDocument;
  appAssert(blog, NOT_FOUND, "Blog not found");
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");
  const hasLiked = user.likedBlogs.includes(blogId);
  if (hasLiked) {
    blog.totalReaction -= 1;
    blog.author.totalReactions -= 1;
    user.likedBlogs = user.likedBlogs.filter((id) => !id.equals(blogId));
  } else {
    blog.totalReaction += 1;
    blog.author.totalReactions += 1;
    user.likedBlogs.push(blogId);
  }
  blog.author.save();
  const [updatedUser, updatedBlog] = await Promise.all([
    user.save(),
    blog.save(),
  ]);

  return {
    blog: (await updatedBlog.populate(authorFieldsProjection)).toObject(),
    user: updatedUser.omitPassword(),
  };
};

export const toggleBookmark = async ({ blogId, userId }: toggleParams) => {
  const blog = await blogModel.findById(blogId);
  appAssert(blog, NOT_FOUND, "Blog not found");
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");
  const hasBookmarked = user.bookmarkedBlogs.includes(blogId);
  if (hasBookmarked) {
    blog.totalBookmark -= 1;
    user.bookmarkedBlogs = user.bookmarkedBlogs.filter(
      (id) => !id.equals(blogId)
    );
  } else {
    blog.totalBookmark += 1;
    user.bookmarkedBlogs.push(blogId);
  }

  const [updatedUser, updatedBlog] = await Promise.all([
    user.save(),
    blog.save(),
  ]);

  return {
    blog: (await updatedBlog.populate(authorFieldsProjection)).toObject(),
    user: updatedUser.omitPassword(),
  };
};

type UpdateBlogParams = {
  blogId: string;
  banner?: string;
  title?: string;
  content?: string;
  userId: mongoose.Types.ObjectId;
};
export const updateBlog = async ({
  blogId,
  banner,
  title,
  content,
  userId,
}: UpdateBlogParams) => {
  const blog = await blogModel.findById(blogId).populate({
    path: "author",
    select: "_id",
  });
  appAssert(blog, NOT_FOUND, "Blog not found");
  appAssert(blog.author._id.equals(userId), UNAUTHORIZED, "Unauthorized");
  if (banner && banner !== blog.banner.url) {
    await deleteFromCloudinary(blog.banner.publicId);
    blog.banner = await uploadToCloudinary(banner);
  }
  if (title && title !== blog.title) {
    blog.title = title;
  }
  if (content && content !== blog.content) {
    blog.content = content;
    blog.readingTime = getReadingTime(content);
  }
  const updatedBlog = await blog.save();
  return { blog: updatedBlog.toObject() };
};
