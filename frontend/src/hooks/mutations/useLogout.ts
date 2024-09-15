import { useMutation } from "@tanstack/react-query";
import { logout } from "../../lib/api";
import queryClient from "../../config/queryClient";
import { AUTH } from "../queries/useAuth";
import toast from "react-hot-toast";

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
