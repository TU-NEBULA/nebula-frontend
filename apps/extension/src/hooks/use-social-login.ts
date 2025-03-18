import { useNavigate } from "react-router-dom";

export const useSocialLogin = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL + "/oauth2/authorization";
  const kakaoLoginPage = baseUrl + "/kakao?redirectType=extension";
  const googleLoginPage = baseUrl + "/google?redirectType=extension";

  const onClickGoogleAuth = () => {
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url: googleLoginPage,
      },
      async (redirectUri) => {
        const accessToken = redirectUri?.split("accessToken=")[1];
        const refreshToken = redirectUri?.split("refreshToken=")[1];
        chrome.storage.local.set({ accessToken, refreshToken });
        navigate("/bookmark");
      }
    );
  };

  const onClickKakaoAuth = () => {
    chrome.identity.launchWebAuthFlow(
      {
        interactive: true,
        url: kakaoLoginPage,
      },
      async (redirectUri) => {
        const accessToken = redirectUri?.split("accessToken=")[1];
        const refreshToken = redirectUri?.split("refreshToken=")[1];
        chrome.storage.local.set({ accessToken, refreshToken });
        navigate("/bookmark");
      }
    );
  };

  return { onClickGoogleAuth, onClickKakaoAuth };
};
