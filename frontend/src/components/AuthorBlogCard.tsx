import { FaRegHeart } from "react-icons/fa6";
import { Blog } from "../constants";
import { navigate } from "../lib/navigation";
import { formatDate } from "../utils";
import { IoBookmarkOutline } from "react-icons/io5";

const AuthorBlogCard = (authorBlog: Blog) => {
  return (
    <div
      onClick={() => navigate(`/blog/${authorBlog._id}`)}
      className="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 cursor-pointer dark:border-gray-700 overflow-hidden hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-300 hover:cursor-pointer "
    >
      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-600">
        <div className="p-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <img
                className="rounded-full size-8 object-cover"
                src={authorBlog.author.profile.url}
                alt="author profile"
                title={authorBlog.author.username}
                loading="lazy"
              />
              <div className="text-sm font-normal ">
                <p className="font-medium text-gray-800 dark:text-gray-300">
                  {authorBlog.author.username}
                </p>
                <p className="text-gray-700 dark:text-gray-400">
                  {formatDate(authorBlog.createdAt)}
                </p>
              </div>
            </div>
            <p className="text-sm font-normal text-gray-800 dark:text-gray-300">
              {authorBlog.readingTime} min read
            </p>
          </div>
          <h2 className="text-gray-800 dark:text-white text-lg font-normal">
            {authorBlog.title}
          </h2>
        </div>
        <div className="flex items-center gap-2 text-base font-normal text-gray-800 dark:text-gray-400 p-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-fit">
            <FaRegHeart />
            <p>{authorBlog.totalReaction} Reactions</p>
          </div>
          <div className="flex items-center gap-2 min-w-fit">
            <IoBookmarkOutline />
            <p>{authorBlog.totalBookmark} Bookmarks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBlogCard;
