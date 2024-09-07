import { useSuspenseQuery } from "@tanstack/react-query";
import {
  getBlogbyId,
  getBlogs,
  getReadingList,
  getCurrentUserBlogs,
  getUserAndUserBlogs,
} from "../../lib/api";

const FIVE_MINUTES = 5 * 60 * 1000;

export const allBlogs = "Blogs";
export function useGetBlogs(page: number, limit: number) {
  return useSuspenseQuery({
    queryFn: () => getBlogs(page, limit),
    queryKey: [allBlogs, { page }],
    staleTime: FIVE_MINUTES,
  });
}

export const blog = "blog";
export const useGetBlogById = (blogId: string) => {
  return useSuspenseQuery({
    queryFn: () => getBlogbyId(blogId),
    queryKey: [blog, blogId],
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: FIVE_MINUTES,
  });
};
export const readinglist = "readingList";
export const useGetReadingList = (
  blogIds: string[],
  page: number,
  limit: number
) => {
  return useSuspenseQuery({
    queryKey: [readinglist],
    queryFn: () => getReadingList(blogIds, page, limit),
  });
};
export const currentUserBlogs = "currentUserBlogs";
export const useGetCurrentUserBlogs = () => {
  return useSuspenseQuery({
    queryKey: [currentUserBlogs],
    queryFn: () => getCurrentUserBlogs(),
    staleTime: FIVE_MINUTES,
  });
};
export const userAndUserBlogs = "userAndUserBlogs";
export const useGetUserAndUserBlogs = (username: string) => {
  return useSuspenseQuery({
    queryKey: [userAndUserBlogs, { username }],
    queryFn: () => getUserAndUserBlogs(username),
    staleTime: FIVE_MINUTES,
  });
};
