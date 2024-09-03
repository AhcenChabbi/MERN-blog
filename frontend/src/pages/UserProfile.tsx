import { useParams } from "react-router-dom";
import { useGetUserAndUserBlogs } from "../hooks/queries/useBlogs";
import { CenteredSpinner, Error, ProfileLayout } from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
const UserProfile = () => {
  const { username } = useParams();
  const { data, isPending, isError } = useGetUserAndUserBlogs(username || "");
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
        <Error message="User not found" />
      ) : (
        <ProfileLayout user={data.user} blogs={data.blogs} />
      )}
    </motion.div>
  );
};

export default UserProfile;
