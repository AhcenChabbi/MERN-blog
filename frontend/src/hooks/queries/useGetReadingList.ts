import { useSuspenseQuery } from "@tanstack/react-query";
import { getReadingList } from "../../lib/api";

export const readinglist = "readingList";
export const useGetReadingList = (
  blogIds: string[],
  page: number,
  limit: number
) => {
  return useSuspenseQuery({
    queryKey: [readinglist],
    queryFn: () => getReadingList(blogIds, page, limit),
  });
};
