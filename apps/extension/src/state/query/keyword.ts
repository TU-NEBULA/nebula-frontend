import { KEYWORD } from "@/constants/keyword";
import { getKeywords } from "@/services/keyword";
import { useQuery } from "@tanstack/react-query";

export const useGetKeywords = () => {
  return useQuery({
    queryKey: [KEYWORD.GET_ALL],
    queryFn: getKeywords,
  });
};
