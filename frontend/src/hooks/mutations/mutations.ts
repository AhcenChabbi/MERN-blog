import { useMutation } from "@tanstack/react-query";
import {
  BlogReaction,
  bookMarkBlog,
  createBlog,
  deleteAccount,
  deleteBlog,
  incrementBlogTotalVisit,
  likeBlog,
  logout,
  updateBlog,
  updatePassword,
  updateUser,
} from "../../lib/api";
import { allBlogs, blog, currentUserBlogs } from "../queries/useBlogs";
import queryClient from "../../config/queryClient";
import toast from "react-hot-toast";
import { AUTH } from "../queries/useAuth";
import { navigate } from "../../lib/navigation";
import { Blog } from "../../constants";

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
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData([AUTH], data);
      toast.success("User  Updated");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong while updating user");
    },
  });
};
export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password Updated");
    },
    onError: (error) => {
      toast.error(
        error.message || "Something went wrong while updating password"
      );
    },
  });
};
const onSuccess = (data: BlogReaction, blogId: string) => {
  queryClient.setQueryData([blog, blogId], (oldData: BlogReaction) => {
    return {
      ...oldData,
      blog: data.blog,
    };
  });
  queryClient.setQueryData([AUTH], data.user);
};
export const useLikeBlog = () => {
  return useMutation({
    mutationFn: likeBlog,
    onSuccess: (data, blogId) => {
      onSuccess(data, blogId);
    },
  });
};
export const useBookmarkBlog = () => {
  return useMutation({
    mutationFn: bookMarkBlog,
    onSuccess: (data, blogId) => {
      onSuccess(data, blogId);
    },
  });
};
export const useIncrementTotalVisit = (onSuccess: (data: string) => void) => {
  return useMutation({
    mutationFn: incrementBlogTotalVisit,
    onSuccess: (data) => {
      onSuccess(data);
    },
  });
};
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
export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [AUTH] });
      toast.success("Account deleted successfully");
      navigate("/", { replace: true });
    },
    onError: () => {
      toast.error("An error occured please try again");
    },
  });
};
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

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AUTH] });
      queryClient.removeQueries({ queryKey: [AUTH] });
      toast.success("Logout successful");
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
};
