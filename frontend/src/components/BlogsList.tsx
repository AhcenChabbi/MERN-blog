import { useGetBlogs } from "../hooks/queries/useBlogs";
import BlogCard from "./BlogCard";
import Spinner from "./Spinner";
import { useState } from "react";
import PaginationBar from "./PaginationBar";
import { Link } from "react-router-dom";
import Error from "./Error";

const BlogsList = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isPending, isPlaceholderData } = useGetBlogs(page, 9);
  return (
    <div className="flex-grow flex flex-col">
      {isPending ? (
        <div className="flex flex-grow justify-center items-center">
          <Spinner size={10} />
        </div>
      ) : isError ? (
        <Error />
      ) : data.blogs.length ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {data.blogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>
          <PaginationBar
            decrement={() => {
              setPage((prev) => Math.max(prev - 1, 1));
            }}
            increment={() => {
              if (!isPlaceholderData && page < data.totalPages) {
                setPage((prev) => prev + 1);
              }
            }}
            isPlaceholderData={isPlaceholderData}
            page={page}
            totalPages={data.totalPages}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow">
          <p className="text-lg text-darkBlue dark:text-white">No blogs</p>
          <Link to="/createblog" className="link">
            Create a blog
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogsList;
