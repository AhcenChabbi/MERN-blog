import { useLocation } from "react-router-dom";

export const useGetPageUrl = () => {
  const { pathname, search, hash } = useLocation();
  return window.location.origin + pathname + search + hash;
};
