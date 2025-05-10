import { USER } from "@/constants/user";
import { getUserInfo } from "@/service/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [USER.GET_INFO],
    queryFn: getUserInfo,
  });
};
