import { KEYWORD } from "@/constants/keyword";
import { getKeywords } from "@/services/keyword";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetKeywords = () => {
  return useSuspenseQuery({
    queryKey: [KEYWORD.GET_ALL],
    queryFn: getKeywords,
  });
};
