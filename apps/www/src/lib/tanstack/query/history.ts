import { HISTORY } from "@/constants/history";
import { getHistories } from "@/service/history";
import { useQuery } from "@tanstack/react-query";

export const useGetHistories = (page: string) => {
  return useQuery({
    queryKey: [HISTORY.GET_HISTORIES, page],
    queryFn: () => getHistories(page),
  });
};
