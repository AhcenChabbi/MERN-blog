import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../lib/api";

export const AUTH = "auth";
export const useAuth = () => {
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity,
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { user, ...rest };
};
