import { useSuspenseQuery } from "@tanstack/react-query";
import { getCurrentUserBlogs } from "../../lib/api";
export const currentUserBlogs = "currentUserBlogs";
const FIVE_MINUTES = 5 * 60 * 1000;
export const useGetCurrentUserBlogs = () => {
  return useSuspenseQuery({
    queryKey: [currentUserBlogs],
    queryFn: () => getCurrentUserBlogs(),
    staleTime: FIVE_MINUTES,
  });
};
