import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../lib/api";
import toast from "react-hot-toast";

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
