import { useLocation } from "react-router-dom";

export const useGetPageUrl = () => {
  const { pathname } = useLocation();
  return window.location.origin + pathname;
};
