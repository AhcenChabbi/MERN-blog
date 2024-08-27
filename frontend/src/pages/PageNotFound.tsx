import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { BlogName } from "../constants/Schemas";
const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found | " + BlogName;
  });
  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: -50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -50 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="text-center flex flex-col justify-center items-center text-darkBlue dark:text-white space-y-3.5"
      >
        <h1 className="text-6xl font-bold">404</h1>
        <h1 className="text-6xl font-bold">Page Not Found</h1>
        <p className="text-xl max-w-96">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="link">
          Go back to homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
