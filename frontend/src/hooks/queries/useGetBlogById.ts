import { getBlogbyId } from "../../lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
export const blog = "blog";
export const useGetBlogById = (blogId: string) => {
  return useSuspenseQuery({
    queryFn: () => getBlogbyId(blogId),
    queryKey: [blog, blogId],
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
