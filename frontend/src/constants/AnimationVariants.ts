import { Variants } from "framer-motion";

export const variants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, type: "spring" },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.3, type: "spring" },
  },
};
