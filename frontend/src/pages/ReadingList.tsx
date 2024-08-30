import { useState } from "react";
import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { useReadingList } from "../hooks/queries/useBlogs";
import {
  AuthorBlogCard,
  CenteredSpinner,
  Error,
  PaginationBar,
  SEO,
} from "../components";
import { Link } from "react-router-dom";
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
      {isPending ? (
        <CenteredSpinner />
      ) : isError ? (
        <Error />
      ) : data.blogs.length > 0 ? (
        <div className="flex flex-col gap-y-3 flex-grow">
          <SEO title="Reading List" description="Reading List" />
          <h1 className="dark:text-white text-darkBlue font-medium text-2xl">
            Reading List:
          </h1>
          <div className="flex flex-col gap-y-3">
            {data.blogs.map((blog) => (
              <AuthorBlogCard key={blog._id} {...blog} />
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
        <div className="w-full flex flex-col gap-y-2 text-center">
          <p className="text-2xl font-semibold dark:text-white text-darkBlue">
            Reading List is empty
          </p>
          <Link to="/" className="link">
            Back to home
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default ReadingList;
