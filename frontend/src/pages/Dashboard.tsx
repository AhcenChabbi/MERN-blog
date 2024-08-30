import { useGetCurrentUserBlogs } from "../hooks/queries/useBlogs";
import {
  CenteredSpinner,
  DashboardBlogList,
  Error,
  SEO,
  Statistics,
} from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { Suspense } from "react";

const Dashboard = () => {
  const { data: blogs, isPending, isError } = useGetCurrentUserBlogs();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex flex-col gap-y-2 flex-grow max-w-3xl mx-auto p-3"
    >
      <SEO title="Dashboard" description="Dashboard" />
      <div className="space-y-2">
        <h1 className="dark:text-white text-darkBlue font-medium text-xl">
          Dashboard:
        </h1>
        <Statistics />
      </div>
      <div className="flex flex-col flex-grow">
        {isPending ? (
          <CenteredSpinner />
        ) : isError ? (
          <Error />
        ) : (
          <Suspense fallback={<CenteredSpinner />}>
            <DashboardBlogList blogs={blogs} />
          </Suspense>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
