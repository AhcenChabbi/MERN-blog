import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { CenteredSpinner, Error, ProfileLayout } from "../components";
import { useGetCurrentUserBlogs } from "../hooks/queries/useBlogs";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
const Profile = () => {
  const { user } = useAuth() as { user: User };
  const { data: blogs, isPending, isError } = useGetCurrentUserBlogs();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto px-3 flex-grow flex flex-col gap-y-2"
    >
      {isPending ? (
        <CenteredSpinner />
      ) : isError ? (
        <Error />
      ) : (
        <ProfileLayout user={user} blogs={blogs} />
      )}
    </motion.div>
  );
};

export default Profile;
