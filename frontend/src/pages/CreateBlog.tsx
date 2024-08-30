import { CenteredSpinner, CreateBlogForm, SEO } from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { Suspense } from "react";
const CreateBlog = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex-grow flex justify-center items-start pt-3"
    >
      <SEO title="Create Blog" description="Create Blog" />
      <Suspense fallback={<CenteredSpinner />}>
        <CreateBlogForm />
      </Suspense>
    </motion.div>
  );
};

export default CreateBlog;
