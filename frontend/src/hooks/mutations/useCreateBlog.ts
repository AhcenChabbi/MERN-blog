import { useMutation } from "@tanstack/react-query";
import { createBlog } from "../../lib/api";
import toast from "react-hot-toast";
import queryClient from "../../config/queryClient";
import { allBlogs } from "../queries/useGetBlogs";
import { currentUserBlogs } from "../queries/useGetCurrentUserBlogs";
import { navigate } from "../../lib/navigation";

export const useCreateBlog = () => {
  return useMutation({
    mutationFn: createBlog,
    onSuccess: (data) => {
      toast.success("Blog created successfully");
      queryClient.invalidateQueries({ queryKey: [allBlogs] });
      queryClient.invalidateQueries({ queryKey: [currentUserBlogs] });
      navigate(`/blog/${data._id}`);
    },
    onError: () => {
      toast.error("An error occured please try again");
    },
  });
};
