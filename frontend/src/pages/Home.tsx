import { BlogsList, CenteredSpinner, Hero, SEO } from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { BlogName } from "../constants/Schemas";
import { Suspense } from "react";
const Home = () => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="py-5 px-6 lg:px-12 flex-grow flex flex-col gap-y-4"
    >
      <SEO
        title={`Home | ${BlogName}`}
        description="Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages."
      />
      <Suspense fallback={<CenteredSpinner />}>
        <Hero />
        <BlogsList />
      </Suspense>
    </motion.div>
  );
};

export default Home;
