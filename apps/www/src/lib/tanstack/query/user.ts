import { USER } from "@/constants/user";
import { UserInfoDTO } from "@/models/user";
import { getUserInfo } from "@/service/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserInfo = (userInfo: UserInfoDTO | null) => {
  return useQuery({
    queryKey: [USER.GET_INFO],
    queryFn: getUserInfo,
    enabled: userInfo !== null,
  });
};
