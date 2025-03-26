import { STAR } from "@/constants/star";
import { getAllStars, getStarByCategory, getStarByKeyword } from "@/service/star";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetAllStars = () => {
  return useSuspenseQuery({
    queryKey: [STAR.GET_ALL],
    queryFn: getAllStars,
  });
};

export const useGetStarByCategory = (categoryId: string) => {
  return useSuspenseQuery({
    queryKey: [STAR.GET_BY_CATEGORY, categoryId],
    queryFn: () => getStarByCategory(categoryId),
  });
};

export const useGetStarByKeyword = (keyword: string) => {
  return useSuspenseQuery({
    queryKey: [STAR.GET_BY_KEYWORD, keyword],
    queryFn: () => getStarByKeyword(keyword),
  });
};
