import { MdError } from "react-icons/md";
import { useGetBlogs } from "../hooks/queries/useBlogs";
import BlogCard from "./BlogCard";
import Spinner from "./Spinner";
import { useState } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const BlogsList = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isPending, isSuccess, isPlaceholderData } =
    useGetBlogs(page, 9);
  return (
    <div>
      {isPending ? (
        <div className="flex justify-center items-center h-full">
          <Spinner size={10} />
        </div>
      ) : isError ? (
        <div className="bg-red-50 dark:bg-gray-800 text-red-800 dark:text-red-400 border border-red-300 dark:border-red-800 text-lg gap-2 flex items-center justify-center rounded-lg p-2 max-w-fit flex-wrap text-center mx-auto">
          <MdError className="text-2xl" />
          <p>An error occured please check your network or refresh the page</p>
        </div>
      ) : (
        isSuccess &&
        data && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {data.blogs.map((blog) => (
                <BlogCard key={blog._id} {...blog} />
              ))}
            </div>
            <div className="mx-auto w-full max-w-xs flex items-center justify-between bg-white border border-gray-200 rounded-full shadow dark:bg-gray-800 dark:border-gray-700 py-2.5 px-4 dark:text-white text-darkBlue text-base">
              <button
                disabled={page <= 1 || isPlaceholderData}
                onClick={() => {
                  setPage((prev) => Math.max(prev - 1, 1));
                }}
                className="dark:bg-gray-700 bg-gray-200 rounded-full p-2 flex items-center justify-center gap-x-1"
              >
                <GrFormPrevious className="size-6" />
              </button>
              <p className="dark:bg-gray-700 bg-gray-200 rounded-full py-2 px-3 flex items-center justify-center">
                {page} / {data.totalPages}
              </p>
              <button
                onClick={() => {
                  if (!isPlaceholderData && page < data.totalPages) {
                    setPage((prev) => prev + 1);
                  }
                }}
                disabled={isPlaceholderData || page >= data.totalPages}
                className="dark:bg-gray-700 bg-gray-200 rounded-full p-2 flex items-center justify-center gap-x-1"
              >
                <GrFormNext className="size-6" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default BlogsList;
