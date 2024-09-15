import { useParams } from "react-router-dom";
import { LoadingIndicator, ProfileLayout } from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { Suspense } from "react";
import { useGetUserAndUserBlogs } from "../hooks/queries/useGetUserAndUserBlogs";
const UserProfile = () => {
  const { username } = useParams();
  const { data } = useGetUserAndUserBlogs(username || "");
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto px-3 flex-grow flex flex-col gap-y-2"
    >
      <Suspense fallback={<LoadingIndicator message="Loading Profile..." />}>
        <ProfileLayout user={data.user} blogs={data.blogs} />
      </Suspense>
    </motion.div>
  );
};

export default UserProfile;
