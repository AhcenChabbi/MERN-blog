import { useGetCurrentUserBlogs } from "../hooks/queries/useBlogs";
import { DashboardBlogList, SEO, Statistics } from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { FaRegHeart, FaRegEye } from "react-icons/fa6";
import { Suspense } from "react";
const Dashboard = () => {
  const { data: blogs } = useGetCurrentUserBlogs();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col gap-y-2 flex-grow max-w-3xl mx-auto p-3"
    >
      <SEO title="Dashboard" description="Dashboard" />
      <h1 className="dark:text-white text-darkBlue font-medium text-2xl">
        Dashboard:
      </h1>
      <Suspense fallback={<StatisticsSkeleton />}>
        <Statistics />
      </Suspense>
      <Suspense fallback={<DashboardBlogListSkeleton />}>
        <DashboardBlogList blogs={blogs} />
      </Suspense>
    </motion.div>
  );
};
const DashboardBlogCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-1 sm:flex-row sm:justify-between sm:items-center cursor-pointer dark:bg-gray-800 bg-gray-100 px-3 py-2.5 rounded-md animate-pulse">
      <div className="flex flex-col">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-1"></div>
        <div className="flex flex-wrap items-center gap-x-1 dark:text-gray-300 text-darkBlue text-sm">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
          |
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
        </div>
      </div>

      <div className="flex items-center gap-x-2 dark:text-gray-300 text-darkBlue">
        <div className="flex items-center gap-x-1">
          <FaRegHeart className="animate-pulse text-gray-400 dark:text-gray-500" />
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
        </div>
        <div className="flex items-center gap-x-1">
          <FaRegEye className="animate-pulse text-gray-400 dark:text-gray-500" />
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-4"></div>
        </div>
      </div>

      <div className="flex items-center gap-x-2 justify-end">
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
        <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
      </div>
    </div>
  );
};
const DashboardBlogListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      {[...Array(3).keys()].map((i) => (
        <DashboardBlogCardSkeleton key={i} />
      ))}
    </div>
  );
};
const StatisticsCardSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2 dark:bg-gray-800 bg-gray-100 rounded-md py-4 px-3 flex-grow animate-pulse">
      <div className="h-10 w-10 bg-gray-200 rounded-md dark:bg-gray-700"></div>
      <div className="flex flex-col flex-grow gap-2">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
      </div>
    </div>
  );
};
const StatisticsSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-x-2 gap-y-3 sm:flex-row mb-5">
      {[...Array(3).keys()].map((i) => (
        <StatisticsCardSkeleton key={i} />
      ))}
    </div>
  );
};
export default Dashboard;
