import { useMutation } from "@tanstack/react-query";
import { BlogReaction, bookMarkBlog } from "../../lib/api";
import queryClient from "../../config/queryClient";
import { blog } from "../queries/useGetBlogById";
import { AUTH } from "../queries/useAuth";

export const useBookmarkBlog = () => {
  return useMutation({
    mutationFn: bookMarkBlog,
    onSuccess: (data, blogId) => {
      queryClient.setQueryData([blog, blogId], (oldData: BlogReaction) => {
        return {
          ...oldData,
          blog: data.blog,
        };
      });
      queryClient.setQueryData([AUTH], data.user);
    },
  });
};
