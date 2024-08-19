import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { FaEye, FaHeart } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { useGetCurrentUserBlogs } from "../hooks/queries/useBlogs";
import { Error, Spinner } from "../components";
import { FaRegHeart, FaRegEye } from "react-icons/fa";
import { formatDate } from "../utils";
import { useDeleteBlog } from "../hooks/mutations/mutations";
import { Link } from "react-router-dom";
import { navigate } from "../lib/navigation";
import { motion } from "framer-motion";
import { variants } from "../constants/constants";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth() as { user: User };
  useEffect(() => {
    document.title = "Dashboard | " + user.username;
  }, [user]);
  const statistics = [
    {
      number: user.totalVisits,
      title: "Total visits",
      icon: <FaEye className="text-darkBlue size-6" />,
    },
    {
      number: user.totalReactions,
      title: "Total reactions",
      icon: <FaHeart className="text-darkBlue size-6" />,
    },
    {
      number: user.blogPublished,
      title: "Total blogs",
      icon: <TiDocumentText className="text-darkBlue size-7" />,
    },
  ];
  const { data, isPending, isError } = useGetCurrentUserBlogs();
  const { mutate: deleteBlog } = useDeleteBlog();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col gap-y-2 flex-grow max-w-3xl mx-auto p-3"
    >
      <div className="space-y-2">
        <h1 className="dark:text-white text-darkBlue font-medium text-xl">
          Dashboard:
        </h1>
        <div className="w-full flex flex-col gap-x-2 gap-y-3 sm:flex-row">
          {statistics.map((statistic, ind) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: ind * 0.2, type: "spring" }}
              key={statistic.title}
              className="flex items-center gap-x-2 dark:bg-gray-700 bg-gray-100 rounded-md py-4 px-3 flex-grow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-pink-300 rounded-md">
                {statistic.icon}
              </div>
              <div className="flex flex-col flex-grow">
                <p className="text-xl font-bold dark:text-white text-darkBlue">
                  {statistic.number}
                </p>
                <p className="text-base dark:text-white text-darkBlue">
                  {statistic.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        {isPending ? (
          <div className="flex items-center justify-center flex-grow">
            <Spinner size={10} />
          </div>
        ) : isError ? (
          <Error />
        ) : data.blogs.length ? (
          <div className="space-y-2">
            <h1 className="dark:text-white text-darkBlue font-medium text-xl">
              Blogs:
            </h1>
            <div className="flex flex-col gap-y-2">
              {data.blogs.map((blog, ind) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: ind * 0.2,
                    type: "spring",
                  }}
                  key={blog._id}
                  onClick={() => {
                    navigate(`/blog/${blog._id}`);
                  }}
                  className="flex flex-col gap-y-1 sm:flex-row sm:justify-between sm:items-center cursor-pointer dark:bg-gray-700 bg-gray-100 px-3 py-1.5 rounded-md"
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
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-grow flex-col">
            <h1 className="text-darkBlue dark:text-white font-medium text-lg">
              You haven't created any blog yet
            </h1>
            <Link to="/createblog" className="link">
              Create one
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
