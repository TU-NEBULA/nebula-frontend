import { useNavigate } from "react-router-dom";

export const useSocialLogin = (setIsLoading: (isLoading: boolean) => void) => {
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
        console.log("redirectUri", redirectUri);
        setIsLoading(false);
        if (!redirectUri) {
          return alert("로그인에 실패했어요. 다시 시도해주세요.");
        }
        const accessToken = redirectUri?.split("accessToken=")[1].split("&")[0];
        const refreshToken = redirectUri?.split("refreshToken=")[1];
        const isAgreed = redirectUri?.split("isAgreed=")[1];
        const isAgreedBoolean = isAgreed === "true";

        if (isAgreedBoolean) {
          return navigate("/bookmark", { replace: true });
        }
        navigate("/agreement", { state: { accessToken, refreshToken }, replace: true });
      }
    );
  };

  return { onClickOauth };
};
