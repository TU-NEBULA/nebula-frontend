import { STAR } from "@/constants/star";
import { getStars } from "@/services/star";
import { useQuery } from "@tanstack/react-query";

export const useGetStars = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: [STAR.GET_ALL],
    queryFn: getStars,
    enabled: isLoggedIn,
  });
};
