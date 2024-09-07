import { Variants } from "framer-motion";

export const variants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, type: "spring" },
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, type: "spring" },
  },
};
