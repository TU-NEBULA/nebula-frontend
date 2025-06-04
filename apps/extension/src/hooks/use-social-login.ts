import { useUserStore } from "@/state/zustand/user";

import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_BASE_URL;

export const useSocialLogin = (setIsLoading: (isLoading: boolean) => void) => {
  const { setIsLoggedIn } = useUserStore();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL + "/oauth";
  const kakaoLoginPage = baseUrl + "/kakao?redirectType=extension";
  const googleLoginPage = baseUrl + "/google?redirectType=extension";

  const onClickOauth = (provider: "kakao" | "google") => {
    setIsLoading(true);
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url: provider === "google" ? googleLoginPage : kakaoLoginPage,
      },
      async (redirectUri) => {
        setIsLoading(false);
        if (!redirectUri) {
          return alert("로그인에 실패했어요. 다시 시도해주세요.");
        }
        const accessToken = redirectUri?.split("accessToken=")[1].split("&")[0];
        const refreshToken = redirectUri?.split("refreshToken=")[1];
        const isAgreed = redirectUri?.split("isAgreed=")[1];
        const isAgreedBoolean = isAgreed === "true";

        if (isAgreedBoolean) {
          chrome.cookies.set({
            url,
            name: "accessToken",
            value: accessToken,
            path: "/",
            httpOnly: true,
            secure: false,
          });
          chrome.cookies.set({
            url,
            name: "refreshToken",
            value: refreshToken,
            path: "/",
            secure: false,
          });
          setIsLoggedIn(true);
          return navigate("/bookmark", { replace: true });
        }
        navigate("/agreement", { state: { accessToken, refreshToken }, replace: true });
      }
    );
  };

  return { onClickOauth };
};
