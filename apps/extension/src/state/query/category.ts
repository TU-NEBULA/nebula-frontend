import { CATEGORY } from "@/constants/category";
import { getCategories } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery({
    queryKey: [CATEGORY.GET],
    queryFn: getCategories,
  });
};
