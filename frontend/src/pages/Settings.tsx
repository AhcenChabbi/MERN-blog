import {
  BasicInfo,
  CenteredSpinner,
  ChangePassword,
  DeleteAccount,
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
      className="flex-grow space-y-3 w-full max-w-3xl mx-auto p-2.5"
    >
      <SEO title="Settings" description="Settings" />
      <h1 className="text-2xl fontm-medium dark:text-white text-darkBlue">
        Settings
      </h1>
      <div className="space-y-2">
        <Suspense fallback={<CenteredSpinner />}>
          <BasicInfo />
          <ChangePassword />
          <DeleteAccount />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default Settings;
