import { useEffect } from "react";

import { useGetUserInfo } from "@/lib/tanstack/query/user";
import { useUserStore } from "@/lib/zustand/user";

export const useUserInfo = () => {
  const { userInfo, setUserInfo } = useUserStore();
  const { data, isLoading } = useGetUserInfo();

  useEffect(() => {
    if (data?.result && !isLoading && !userInfo) {
      setUserInfo(data.result);
    }
  }, [data, isLoading]);

  return {
    userInfo: userInfo || data?.result,
    isLoading,
  };
};
