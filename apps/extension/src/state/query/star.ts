import { STAR } from "@/constants/star";
import { getStarById, getStars } from "@/services/star";
import { useQuery } from "@tanstack/react-query";

export const useGetStars = (isLoggedIn: boolean) => {
  return useQuery({
    queryKey: [STAR.GET_ALL],
    queryFn: getStars,
    enabled: isLoggedIn,
  });
};

export const useGetStarById = (id: string | null) => {
  return useQuery({
    queryKey: [STAR.GET_BY_ID, id],
    queryFn: () => getStarById(id!),
    enabled: !!id,
  });
};
