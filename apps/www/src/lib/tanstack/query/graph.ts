import { CATEGORY } from "@/constants/category";
import { STAR } from "@/constants/star";
import { getCategories } from "@/service/category";
import { getStarById } from "@/service/star";
import { useQueries } from "@tanstack/react-query";

export const useGetGraphDetail = (id: string) => {
  return useQueries({
    queries: [
      {
        queryKey: [STAR.GET_BY_ID, id],
        queryFn: () => getStarById(id),
        enabled: !!id,
      },
      {
        queryKey: [CATEGORY.GET_ALL],
        queryFn: getCategories,
      },
    ],
  });
};
