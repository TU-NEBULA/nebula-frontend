import { CATEGORY } from "@/constants/category";
import { KEYWORD } from "@/constants/keyword";
import { getCategories } from "@/service/category";
import { getKeywords } from "@/service/keyword";
import { useSuspenseQueries } from "@tanstack/react-query";

export const useGetKeywordCategory = () => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: [CATEGORY.GET_ALL],
        queryFn: getCategories,
      },
      {
        queryKey: [KEYWORD.GET_ALL],
        queryFn: getKeywords,
      },
    ],
  });
};
