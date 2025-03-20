import { CATEGORY } from "@/constants/category";
import { getCategories } from "@/services/category";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useSuspenseQuery({
    queryKey: [CATEGORY.GET],
    queryFn: getCategories,
  });
};
