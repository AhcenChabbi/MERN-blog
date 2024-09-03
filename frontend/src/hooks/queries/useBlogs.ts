import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
  return useQuery({
    queryFn: () => getBlogs(page, limit),
    queryKey: [allBlogs, { page }],
    placeholderData: keepPreviousData,
    staleTime: FIVE_MINUTES,
  });
}

export const blog = "blog";
export const useGetBlogById = (blogId: string) => {
  return useQuery({
    queryFn: () => getBlogbyId(blogId),
    queryKey: [blog, blogId],
    retry: 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: FIVE_MINUTES,
  });
};
export const readinglist = "readingList";
export const useReadingList = (
  blogIds: string[],
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: [readinglist],
    queryFn: () => getReadingList(blogIds, page, limit),
    placeholderData: keepPreviousData,
  });
};
export const currentUserBlogs = "currentUserBlogs";
export const useGetCurrentUserBlogs = () => {
  return useQuery({
    queryKey: [currentUserBlogs],
    queryFn: () => getCurrentUserBlogs(),
    staleTime: FIVE_MINUTES,
  });
};
export const userAndUserBlogs = "userAndUserBlogs";
export const useGetUserAndUserBlogs = (username: string) => {
  return useQuery({
    queryKey: [userAndUserBlogs, { username }],
    queryFn: () => getUserAndUserBlogs(username),
    staleTime: FIVE_MINUTES,
  });
};
