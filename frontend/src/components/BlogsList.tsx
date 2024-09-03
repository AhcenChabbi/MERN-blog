import { useGetBlogs } from "../hooks/queries/useBlogs";
import { useState } from "react";
import PaginationBar from "./PaginationBar";
import { Link } from "react-router-dom";
import Error from "./Error";
import CenteredSpinner from "./CenteredSpinner";
import BlogListGrid from "./BlogListGrid";

const BlogsList = () => {
  const [page, setPage] = useState(1);
  const { data, isError, isPending, isPlaceholderData } = useGetBlogs(page, 9);
  return (
    <div className="flex-grow flex flex-col">
      {isPending ? (
        <CenteredSpinner />
      ) : isError ? (
        <Error />
      ) : data.blogs.length ? (
        <div className="space-y-3">
          <BlogListGrid blogs={data.blogs} />
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
