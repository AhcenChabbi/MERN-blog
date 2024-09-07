import { Link, useLocation } from "react-router-dom";
import { userAndUserBlogs } from "../lib/api";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import AuthorBlogsListSkeleton from "./Skeletons/AuthorBlogsListSkeleton";
const VBlogsList = lazy(() => import("./VBlogsList"));
const UserBlogList = ({ blogs, user }: userAndUserBlogs) => {
  const location = useLocation();
  const inProfilePage = location.pathname === "/profile";
  return blogs.length > 0 ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      className="flex flex-col gap-y-2 flex-grow"
    >
      <h2 className="dark:text-white text-darkBlue font-medium text-xl">
        {inProfilePage ? "Your" : user?.username + "'s"} blogs:
      </h2>
      <Suspense fallback={<AuthorBlogsListSkeleton />}>
        <VBlogsList blogs={blogs} />
      </Suspense>
    </motion.div>
  ) : (
    <div className="flex flex-col gap-y-1 items-center justify-center flex-grow">
      <h3 className="dark:text-white text-darkBlue font-medium text-lg">
        {inProfilePage ? "You haven't" : user?.username + " hasn't"} created any
        blog yet
      </h3>
      {inProfilePage && (
        <Link to="/createblog" className="link">
          Create Blog
        </Link>
      )}
    </div>
  );
};

export default UserBlogList;
