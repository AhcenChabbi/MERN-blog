import { BlogsList, Hero } from "../components";
import { motion } from "framer-motion";
import { BlogName } from "../constants/Schemas";
import { useEffect } from "react";
import { variants } from "../constants/AnimationVariants";
const Home = () => {
  useEffect(() => {
    document.title = "Home | " + BlogName;
  });
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-5 px-6 lg:px-12 flex-grow flex flex-col gap-y-4"
    >
      <Hero />
      <BlogsList />
    </motion.div>
  );
};

export default Home;
