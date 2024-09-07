import { FaRegHeart } from "react-icons/fa6";
import { IoBookmarkOutline } from "react-icons/io5";

const AuthorBlogCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 cursor-pointer dark:border-gray-700 overflow-hidden hover:border-blue-600 dark:hover:border-blue-600 transition-all duration-300 hover:cursor-pointer animate-pulse">
      <div className="space-y-2 divide-y divide-gray-200 dark:divide-gray-600">
        <div className="p-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <svg
                className="size-8 me-3 text-gray-200 dark:text-gray-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
              <div className="text-sm font-normal ">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-36 mb-2"></div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
              </div>
            </div>
            <div className="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
        </div>
        <div className="flex items-center gap-2 text-base font-normal text-gray-800 dark:text-gray-400 p-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-fit">
            <FaRegHeart />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
          </div>
          <div className="flex items-center gap-2 min-w-fit">
            <IoBookmarkOutline />
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBlogCardSkeleton;
