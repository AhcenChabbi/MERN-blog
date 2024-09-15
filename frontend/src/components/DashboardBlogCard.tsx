import { Blog } from "../constants";
import { motion } from "framer-motion";
import { navigate } from "../lib/navigation";
import { formatDate } from "../utils";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { useDeleteBlog } from "../hooks/mutations/useDeleteBlog";
const DashboardBlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
  const { mutate: deleteBlog } = useDeleteBlog();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.2,
        type: "spring",
      }}
      onClick={() => {
        navigate(`/blog/${blog._id}`);
      }}
      className="flex flex-col gap-y-1 sm:flex-row sm:justify-between sm:items-center cursor-pointer dark:bg-gray-800 bg-gray-100 px-3 py-1.5 rounded-md"
    >
      <div className="flex flex-col">
        <p className="text-base dark:text-white text-darkBlue font-medium">
          {blog.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-1 dark:text-gray-300 text-darkBlue text-sm">
          <div className="min-w-fit">
            <span className="font-medium">Published:</span>{" "}
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          |
          <div className="min-w-fit">
            <span className="font-medium">Edited:</span>{" "}
            <span>{formatDate(blog.updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-x-2 dark:text-gray-300 text-darkBlue">
        <div className="flex items-center gap-x-1">
          <FaRegHeart />
          <p>{blog.totalReaction}</p>
        </div>
        <div className="flex items-center gap-x-1">
          <FaRegEye />
          <p>{blog.totalVisit}</p>
        </div>
      </div>

      <div className="flex items-center gap-x-2 justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/createblog", {
              state: {
                defaultValues: {
                  banner: blog.banner.url,
                  title: blog.title,
                  content: blog.content,
                },
                blogId: blog._id,
                isUpdatingState: true,
              },
            });
          }}
          className="text-blue-600 dark:text-blue-500 px-3 py-0.5 rounded-3xl hover:bg-blue-50 transition-colors duration-200 text-base"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteBlog(blog._id);
          }}
          className="text-red-600 dark:text-red-500 px-3 py-0.5 rounded-3xl hover:bg-red-50 transition-colors duration-200 text-base"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default DashboardBlogCard;
