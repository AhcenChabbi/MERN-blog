import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../lib/api";
import queryClient from "../../config/queryClient";
import { AUTH } from "../queries/useAuth";
import toast from "react-hot-toast";

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
