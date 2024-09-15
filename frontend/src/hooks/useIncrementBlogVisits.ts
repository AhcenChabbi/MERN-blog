import { useEffect } from "react";
import { useIncrementTotalVisit } from "./mutations/useIncrementTotalVisit";
import { useLocalStorage, VISITED_BlOGS_KEY } from "./useLocalStorage";

export default function useIncrementBlogVisits(blogId: string) {
  const { getItem, setItem } = useLocalStorage<string[]>(VISITED_BlOGS_KEY, []);
  const visitedBlogs = getItem();
  const onSuccess = () => {
    setItem([...visitedBlogs, blogId]);
  };
  const { mutate: incrementTotalVisit } = useIncrementTotalVisit(onSuccess);
  useEffect(() => {
    if (visitedBlogs && !visitedBlogs.includes(blogId)) {
      incrementTotalVisit(blogId);
    }
  }, [blogId, visitedBlogs, incrementTotalVisit]);
}
