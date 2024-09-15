import { useMutation } from "@tanstack/react-query";
import { updateBlog } from "../../lib/api";
import toast from "react-hot-toast";
import queryClient from "../../config/queryClient";
import { allBlogs } from "../queries/useGetBlogs";
import { currentUserBlogs } from "../queries/useGetCurrentUserBlogs";
import { blog } from "../queries/useGetBlogById";
import { navigate } from "../../lib/navigation";

export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: (_, variables) => {
      toast.success("Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: [allBlogs] });
      queryClient.invalidateQueries({ queryKey: [currentUserBlogs] });
      queryClient.invalidateQueries({ queryKey: [blog, variables.blogId] });
      navigate(`/blog/${variables.blogId}`);
    },
    onError: () => {
      toast.error("An error occured please try again");
    },
  });
};
