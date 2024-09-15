import { useMutation } from "@tanstack/react-query";
import { BlogReaction, likeBlog } from "../../lib/api";
import queryClient from "../../config/queryClient";
import { blog } from "../queries/useGetBlogById";
import { AUTH } from "../queries/useAuth";

export const useLikeBlog = () => {
  return useMutation({
    mutationFn: likeBlog,
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
