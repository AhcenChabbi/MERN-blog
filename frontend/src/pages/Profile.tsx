import { User } from "../constants";
import { useAuth } from "../hooks/queries/useAuth";
import { LoadingIndicator, ProfileLayout } from "../components";
import { useGetCurrentUserBlogs } from "../hooks/queries/useBlogs";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { Suspense } from "react";
const Profile = () => {
  const { user } = useAuth() as { user: User };
  const { data: blogs } = useGetCurrentUserBlogs();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto px-3 flex-grow flex flex-col gap-y-2"
    >
      <Suspense fallback={<LoadingIndicator message="Loading Profile..." />}>
        <ProfileLayout user={user} blogs={blogs} />
      </Suspense>
    </motion.div>
  );
};

export default Profile;
