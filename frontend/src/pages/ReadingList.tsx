import { useState } from "react";
import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { useReadingList } from "../hooks/queries/useBlogs";
import {
  CenteredSpinner,
  EmptyReadingList,
  Error,
  PaginationBar,
  ReadingListBlogs,
  SEO,
} from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
const ReadingList = () => {
  const { user } = useAuth() as { user: User };
  const [page, setPage] = useState(1);
  const { data, isPending, isError, isPlaceholderData } = useReadingList(
    user.bookmarkedBlogs,
    page,
    3
  );
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full flex-grow max-w-2xl flex mx-auto py-2 px-2.5"
    >
      <SEO title="Reading List" description="Reading List" />
      {isPending ? (
        <CenteredSpinner />
      ) : isError ? (
        <Error />
      ) : data.blogs.length > 0 ? (
        <div className="flex flex-col gap-y-3 flex-grow">
          <h1 className="dark:text-white text-darkBlue font-medium text-2xl">
            Reading List:
          </h1>
          <ReadingListBlogs blogs={data.blogs} />
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
        <EmptyReadingList />
      )}
    </motion.div>
  );
};

export default ReadingList;
