import { useMutation } from "@tanstack/react-query";
import { deleteBlog } from "../../lib/api";
import toast from "react-hot-toast";
import queryClient from "../../config/queryClient";
import { currentUserBlogs } from "../queries/useGetCurrentUserBlogs";
import { Blog } from "../../constants";
import { allBlogs } from "../queries/useGetBlogs";
import { AUTH } from "../queries/useAuth";

export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: (data, blogId) => {
      toast.success("Blog Deleted");
      queryClient.setQueryData([currentUserBlogs], (oldData: Blog[]) => {
        return oldData.filter((blog) => blog._id !== blogId);
      });
      queryClient.invalidateQueries({ queryKey: [allBlogs] });
      queryClient.setQueryData([AUTH], data.user);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
