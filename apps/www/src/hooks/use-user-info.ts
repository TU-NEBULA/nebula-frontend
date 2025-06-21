import { useGetUserInfo } from "@/lib/tanstack/query/user";
import { useUserStore } from "@/lib/zustand/user";

export const useUserInfo = () => {
  const { data } = useGetUserInfo();
  const { userInfo, setUserInfo } = useUserStore();

  if (data?.result && !userInfo) {
    setUserInfo(data.result);
  }

  return {
    userInfo: userInfo || data?.result,
    isLoading: !data && !userInfo,
  };
};
