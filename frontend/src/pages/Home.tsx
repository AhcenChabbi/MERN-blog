import {
  Blogs,
  ErrorFallback,
  Hero,
  LoadingIndicator,
  SEO,
} from "../components";
import { motion } from "framer-motion";
import { variants } from "../constants/AnimationVariants";
import { BlogName } from "../constants/Schemas";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
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
      <Hero />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
            <Suspense
              fallback={<LoadingIndicator message="Loading Blogs..." />}
            >
              <Blogs />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </motion.div>
  );
};

export default Home;
