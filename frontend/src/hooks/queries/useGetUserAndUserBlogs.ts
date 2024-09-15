export const userAndUserBlogs = "userAndUserBlogs";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getUserAndUserBlogs } from "../../lib/api";
export const useGetUserAndUserBlogs = (username: string) => {
  return useSuspenseQuery({
    queryKey: [userAndUserBlogs, { username }],
    queryFn: () => getUserAndUserBlogs(username),
  });
};
