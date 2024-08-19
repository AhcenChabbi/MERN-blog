import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { AuthorBlogCard, Error, Spinner, UserDetail } from "../components";
import { useGetCurrentUserBlogs } from "../hooks/queries/useBlogs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { variants, BlogName } from "../constants/constants";
import { motion } from "framer-motion";
const MyProfile = () => {
  const { user } = useAuth() as { user: User };
  useEffect(() => {
    if (user) {
      document.title = `${user.username} | ${BlogName}`;
    }
  }, [user]);
  const { data, isPending, isError } = useGetCurrentUserBlogs();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto px-3 flex-grow flex flex-col gap-y-2"
    >
      <UserDetail user={user} />
      {isPending ? (
        <div className="flex items-center justify-center flex-grow">
          <Spinner size={10} />
        </div>
      ) : isError ? (
        <Error />
      ) : data.blogs.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="flex flex-col gap-y-2 flex-grow"
        >
          <h1 className="dark:text-white text-darkBlue font-medium text-xl">
            Your blogs:
          </h1>
          <div className="flex flex-col gap-y-2 flex-grow">
            {data.blogs.map((blog) => (
              <AuthorBlogCard key={blog._id} {...blog} />
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-y-1 items-center justify-center flex-grow">
          <h1 className="dark:text-white text-darkBlue font-medium text-lg">
            You haven't created any blog yet
          </h1>
          <Link to="/createblog" className="link">
            Create Blog
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default MyProfile;
