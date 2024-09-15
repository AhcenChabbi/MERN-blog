import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { IoBookmarkOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useGetBlogs } from "../hooks/queries/useGetBlogs";
const BlogListGrid = lazy(() => import("./BlogListGrid"));
const PaginationBar = lazy(() => import("./PaginationBar"));

const Blogs = () => {
  const [page, setPage] = useState(1);
  const {
    data: { blogs, totalPages },
  } = useGetBlogs(page, 9);
  const increment = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const decrement = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };
  return (
    <div className="flex-grow flex flex-col">
      {blogs.length ? (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<BlogsSkeleton />}>
                <BlogListGrid blogs={blogs} />
                <PaginationBar
                  decrement={decrement}
                  increment={increment}
                  page={page}
                  totalPages={totalPages}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      ) : (
        <EmptyBlogs />
      )}
    </div>
  );
};

const EmptyBlogs = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <p className="text-lg text-darkBlue dark:text-white">No blogs</p>
      <Link to="/createblog" className="link">
        Create a blog
      </Link>
    </div>
  );
};
const BlogCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 cursor-pointer dark:border-gray-700 overflow-hidden hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-300 hover:cursor-pointer h-min">
      <div className="flex items-center justify-center w-full h-36 bg-gray-300 rounded dark:bg-gray-700">
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-600">
        <div className="p-3 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <svg
                className="size-8 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div className="text-sm font-normal ">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-28 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
        </div>
        <div className="flex items-center gap-2 text-base font-normal text-gray-800 dark:text-gray-400 p-3 flex-wrap">
          <div className="flex items-center gap-2 min-w-fit">
            <FaRegHeart className="animate-pulse text-gray-400 dark:text-gray-500" />
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
          </div>
          <div className="flex items-center gap-2 min-w-fit">
            <IoBookmarkOutline className="animate-pulse text-gray-400 dark:text-gray-500" />
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const BlogsSkeleton = () => {
  return (
    <div className="grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
      {[...Array(3).keys()].map((i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
};
export default Blogs;
