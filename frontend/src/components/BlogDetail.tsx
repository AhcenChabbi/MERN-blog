import { Link } from "react-router-dom";
import { Blog } from "../constants";
import { formatDate } from "../utils";
import { AUTH, useAuth } from "../hooks/queries/useAuth";
import { MdCreate } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import Highlight from "react-highlight";
import { useMutation } from "@tanstack/react-query";
import { BlogReaction, bookMarkBlog, likeBlog } from "../lib/api";
import queryClient from "../config/queryClient";
import { blog } from "../hooks/queries/useBlogs";
import AuthorBlogs from "./AuthorBlogs";

const BlogDetail = ({
  blog: {
    author: {
      username,
      profile: { url: authorProfile },
      //_id: userId,
    },
    banner: { url },
    title,
    createdAt,
    content,
    totalBookmark,
    totalReaction,
    _id: blogId,
  },
  authorBlogs,
}: {
  blog: Blog;
  authorBlogs: Blog[];
}) => {
  const { user } = useAuth();
  const isCurrentUserAuthor = user && user.username === username;
  const hasLiked = user && user.likedBlogs.includes(blogId);
  const hasBookmarked = user && user.bookmarkedBlogs.includes(blogId);
  const onSuccess = (data: BlogReaction) => {
    queryClient.setQueryData([blog, blogId], {
      blog: data.blog,
      authorBlogs,
    });
    queryClient.setQueryData([AUTH], data.user);
  };
  const { mutate: likeBlogHandler } = useMutation({
    mutationFn: likeBlog,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });
  const { mutate: bookMarkBlogHandler } = useMutation({
    mutationFn: bookMarkBlog,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 px-2.5">
      <div className="flex flex-col gap-y-2.5">
        <img
          src={url}
          alt={title + "banner"}
          className="rounded-xl w-full max-h-80 object-cover"
        />
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-2.5">
            <img
              className="rounded-full size-9 object-cover"
              src={authorProfile}
              alt="author profile"
            />
            <div>
              <Link
                to="/"
                className="dark:text-blue-400 text-blue-600  hover:underline font-medium"
              >
                {username}
              </Link>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Posted on {formatDate(createdAt)}
              </p>
            </div>
          </div>
          {isCurrentUserAuthor && (
            <Link
              to=""
              className="flex items-center gap-1 px-4 py-1.5 rounded-3xl border dark:border-blue-400  border-darkBlue hover:bg-blue-50 dark:hover:bg-blue-50/10 transition-colors duration-300"
            >
              <MdCreate className="dark:text-blue-400 text-blue-600 " />
              <span className="dark:text-blue-400 text-blue-600 font-medium">
                Edit
              </span>
            </Link>
          )}
        </div>
        <h1 className="text-xl dark:text-white text-darkBlue font-semibold">
          {title}
        </h1>

        <Highlight
          innerHTML={true}
          className="ProseMirror dark:text-white text-darkBlue"
        >
          {content}
        </Highlight>

        <div className="mx-auto w-full max-w-xs bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 py-2.5 flex items-center justify-center gap-x-3 mt-2.5 flex-wrap gap-y-2">
          <div className="flex items-center gap-2.5 dark:text-white text-darkBlue min-w-fit">
            <button
              onClick={() => {
                likeBlogHandler(blogId);
              }}
              disabled={!user}
              className="dark:bg-gray-700 bg-gray-100 rounded-full p-2 flex items-center justify-center"
            >
              <FaHeart className={`${hasLiked && "text-red-600"}`} />
            </button>
            <span>{totalReaction} Reactions</span>
          </div>
          <div className="flex items-center gap-2.5 dark:text-white text-darkBlue min-w-fit">
            <button
              onClick={() => {
                bookMarkBlogHandler(blogId);
              }}
              disabled={!user}
              className="dark:bg-gray-700 bg-gray-100 rounded-full p-2 flex items-center justify-center"
            >
              <IoBookmark
                className={`${hasBookmarked && "text-purple-600"} `}
              />
            </button>
            <span>{totalBookmark} Bookmarks</span>
          </div>
        </div>
      </div>
      <AuthorBlogs authorBlogs={authorBlogs} />
    </div>
  );
};

export default BlogDetail;
