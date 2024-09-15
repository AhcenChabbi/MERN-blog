import { FaHeart } from "react-icons/fa6";
import { IoBookmark } from "react-icons/io5";
import { useAuth } from "../hooks/queries/useAuth";
import { useLikeBlog } from "../hooks/mutations/useLikeBlog";
import { useBookmarkBlog } from "../hooks/mutations/useBookmarkBlog";
type LikeAndBookmarkBlogProps = {
  blogId: string;
  showModal: () => void;
  totalReaction: number;
  totalBookmark: number;
};
const LikeAndBookmarkBlog = ({
  blogId,
  showModal,
  totalReaction,
  totalBookmark,
}: LikeAndBookmarkBlogProps) => {
  const { mutate: likeBlogHandler } = useLikeBlog();
  const { mutate: bookMarkBlogHandler } = useBookmarkBlog();
  const { user } = useAuth();
  const hasLiked = user && user.likedBlogs.includes(blogId);
  const hasBookmarked = user && user.bookmarkedBlogs.includes(blogId);
  const handleClick = (fn: () => void) => {
    if (user) {
      fn();
    } else {
      showModal();
    }
  };
  return (
    <div className="mx-auto w-full max-w-xs bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 py-2.5 flex items-center justify-center gap-x-3 mt-2.5 flex-wrap gap-y-2">
      <div className="flex items-center gap-2.5 dark:text-white text-darkBlue min-w-fit">
        <button
          onClick={() =>
            handleClick(() => {
              likeBlogHandler(blogId);
            })
          }
          className="dark:bg-gray-700 bg-gray-100 rounded-full p-2 flex items-center justify-center"
        >
          <FaHeart className={`${hasLiked && "text-red-600"}`} />
        </button>
        <span>{totalReaction} Reactions</span>
      </div>
      <div className="flex items-center gap-2.5 dark:text-white text-darkBlue min-w-fit">
        <button
          onClick={() => {
            handleClick(() => {
              bookMarkBlogHandler(blogId);
            });
          }}
          className="dark:bg-gray-700 bg-gray-100 rounded-full p-2 flex items-center justify-center"
        >
          <IoBookmark className={`${hasBookmarked && "text-purple-600"} `} />
        </button>
        <span>{totalBookmark} Bookmarks</span>
      </div>
    </div>
  );
};

export default LikeAndBookmarkBlog;
