import { useMutation } from "@tanstack/react-query";
import { incrementBlogTotalVisit } from "../../lib/api";

export const useIncrementTotalVisit = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: incrementBlogTotalVisit,
    onSuccess: () => {
      onSuccess();
    },
  });
};
