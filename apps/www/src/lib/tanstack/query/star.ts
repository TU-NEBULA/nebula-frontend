import { STAR } from "@/constants/star";
import { get2DStars, getAllStars, getStarByCategory, getStarByKeyword } from "@/service/star";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

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

export const useGetAllStars = () => {
  return useQuery({
    queryKey: [STAR.GET_ALL],
    queryFn: getAllStars,
  });
};

export const useGet2DStars = () => {
  return useQuery({
    queryKey: [STAR.GET_2D],
    queryFn: get2DStars,
  });
};
