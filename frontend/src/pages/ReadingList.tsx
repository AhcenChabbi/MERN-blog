import { lazy, Suspense, useState } from "react";
import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { ErrorFallback, PaginationBar, SEO } from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { Link } from "react-router-dom";
import AuthorBlogsListSkeleton from "../components/Skeletons/AuthorBlogsListSkeleton";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useGetReadingList } from "../hooks/queries/useGetReadingList";
const VBlogsList = lazy(() => import("../components/VBlogsList"));
const ReadingList = () => {
  const { user } = useAuth() as { user: User };
  const [page, setPage] = useState(1);
  const {
    data: { blogs, totalPages },
  } = useGetReadingList(user.bookmarkedBlogs, page, 3);
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
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex-grow max-w-2xl flex mx-auto py-2 px-2.5"
    >
      <SEO title="Reading List" description="Reading List" />
      {blogs.length > 0 ? (
        <div className="flex flex-col flex-grow">
          <h1 className="dark:text-white text-darkBlue font-medium mb-3 text-2xl">
            Reading List:
          </h1>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<AuthorBlogsListSkeleton />}>
                  <VBlogsList blogs={blogs} />
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
        </div>
      ) : (
        <EmptyReadingList />
      )}
    </motion.div>
  );
};
const EmptyReadingList = () => {
  return (
    <div className="w-full flex flex-col gap-y-2 text-center">
      <p className="text-2xl font-semibold dark:text-white text-darkBlue">
        Reading List is empty
      </p>
      <Link to="/" className="link">
        Back to home
      </Link>
    </div>
  );
};

export default ReadingList;
