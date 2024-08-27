import { BasicInfo, ChangePassword, DeleteAccount } from "../components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { variants } from "../constants/AnimationVariants";
const Settings = () => {
  useEffect(() => {
    document.title = "Settings";
  }, []);
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-grow space-y-3 w-full max-w-3xl mx-auto p-2.5"
    >
      <h1 className="text-2xl fontm-medium dark:text-white text-darkBlue">
        Settings
      </h1>
      <div className="space-y-2">
        <BasicInfo />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </motion.div>
  );
};

export default Settings;
