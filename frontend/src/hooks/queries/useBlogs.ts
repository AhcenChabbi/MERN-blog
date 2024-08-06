import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getBlogbyId, getBlogs } from "../../lib/api";

export const allBlogs = "Blogs";

export function useGetBlogs(page: number, limit: number) {
  return useQuery({
    queryFn: () => getBlogs(page, limit),
    queryKey: [allBlogs, { page }],
    placeholderData: keepPreviousData,
  });
}

export const blog = "blog";

export const useGetBlogById = (blogId: string) => {
  const { data, ...rest } = useQuery({
    queryFn: () => getBlogbyId(blogId),
    queryKey: [blog, blogId],
  });
  return { data, ...rest };
};
