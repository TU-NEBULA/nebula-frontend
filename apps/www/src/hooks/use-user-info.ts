import { useGetUserInfo } from "@/lib/tanstack/query/user";
import { useUserStore } from "@/lib/zustand/user";

export const useUserInfo = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const { data } = useGetUserInfo(userInfo);

  if (data?.result && !userInfo) {
    setUserInfo(data.result);
  }

  return {
    userInfo: userInfo || data?.result,
    isLoading: !data && !userInfo,
  };
};
