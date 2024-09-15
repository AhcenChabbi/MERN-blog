import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../lib/api";
import { AUTH } from "../queries/useAuth";
import queryClient from "../../config/queryClient";
import toast from "react-hot-toast";
import { navigate } from "../../lib/navigation";

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
