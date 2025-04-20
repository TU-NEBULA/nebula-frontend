import { TERM } from "@/constants/term";
import { getTerm } from "@/services/term";
import { useQuery } from "@tanstack/react-query";

export const useGetTerm = (token: string) => {
  return useQuery({
    queryKey: [TERM.CONTENT],
    queryFn: () => getTerm(token),
  });
};
