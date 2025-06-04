import { useEffect } from "react";

import { useGetStars } from "@/state/query/star";
import { useStarStore } from "@/state/zustand/star";
import { useUserStore } from "@/state/zustand/user";

import { Outlet } from "react-router-dom";

const StarLayout = () => {
  const { isLoggedIn, setIsLoggedIn } = useUserStore();
  const { setStars } = useStarStore();
  const { data, isPending, refetch } = useGetStars(isLoggedIn);

  useEffect(() => {
    (async function checkLogin() {
      try {
        const token = await chrome.cookies.get({
          url: import.meta.env.VITE_BASE_URL,
          name: "accessToken",
        });
        console.log("Initial token check:", token);
        if (token) {
          setIsLoggedIn(true);
          refetch();
        }
      } catch (error) {
        console.error("Error checking initial token:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLoggedIn && !isPending) {
      setStars(data?.result?.starListDto ?? []);
    }
  }, [isLoggedIn, isPending, data]);

  return <Outlet />;
};

export default StarLayout;
