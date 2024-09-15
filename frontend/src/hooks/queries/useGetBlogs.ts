import { useSuspenseQuery } from "@tanstack/react-query";
import { getBlogs } from "../../lib/api";

export const allBlogs = "Blogs";
const FIVE_MINUTES = 5 * 60 * 1000;
export function useGetBlogs(page: number, limit: number) {
  return useSuspenseQuery({
    queryFn: () => getBlogs(page, limit),
    queryKey: [allBlogs, { page }],
    staleTime: FIVE_MINUTES,
  });
}
