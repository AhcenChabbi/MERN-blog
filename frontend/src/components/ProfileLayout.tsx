import { SEO, UserBlogList, UserDetail } from ".";
import { userAndUserBlogs } from "../lib/api";
import { useGetPageUrl } from "../hooks/useGetPageUrl";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { Suspense } from "react";
import AuthorBlogsListSkeleton from "./Skeletons/AuthorBlogsListSkeleton";

const ProfileLayout = ({ user, blogs }: userAndUserBlogs) => {
  const currentLocation = useGetPageUrl();
  return (
    <>
      <SEO
        title={user.username}
        description={user.username + "'s profile"}
        ogImage={user.profile.url}
        ogType="profile"
        ogTitle={user.username}
        ogDescription={user.username + "'s profile"}
        ogUrl={currentLocation}
        canonical={currentLocation}
        author={user.username}
        keywords={user.username}
      />
      <Suspense fallback={<UserDetailSkeleton />}>
        <UserDetail user={user} />
      </Suspense>
      <Suspense fallback={<AuthorBlogsListSkeleton />}>
        <UserBlogList blogs={blogs} user={user} />
      </Suspense>
    </>
  );
};
const UserDetailSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between w-full border-b dark:border-gray-300 border-gray-700 py-5 gap-y-4 animate-pulse">
      <div className=" flex flex-col sm:flex-row gap-y-4 items-center gap-x-4">
        <svg
          className="size-28 text-gray-200 dark:text-gray-700"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="flex flex-col justify-center items-center sm:items-start gap-y-3">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="flex flex-col sm:flex-row gap-y-1 sm:items-center gap-x-3 dark:text-gray-400 text-gray-700">
            <div className="flex items-center gap-x-2">
              <FaCalendarAlt />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <FaRegNewspaper />
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
