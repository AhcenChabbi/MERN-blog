import {
  BasicInfo,
  ChangePassword,
  DeleteAccount,
  LoadingIndicator,
  SEO,
} from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { Suspense } from "react";
const Settings = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-grow flex flex-col space-y-3 w-full max-w-3xl mx-auto p-2.5"
    >
      <SEO title="Settings" description="Settings" />
      <div className="space-y-2 flex-grow">
        <Suspense fallback={<LoadingIndicator message="Loading Settings..." />}>
          <BasicInfo />
          <ChangePassword />
          <DeleteAccount />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default Settings;
