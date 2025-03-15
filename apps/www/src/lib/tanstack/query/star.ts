import { STAR } from "@/constants/star";
import { getAllStars } from "@/service/star";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetAllStars = () => {
  return useSuspenseQuery({
    queryKey: [STAR.GET_ALL],
    queryFn: getAllStars,
  });
};
