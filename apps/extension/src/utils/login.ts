import { api } from "@/services/api";

const apiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirectUri = encodeURIComponent(chrome.identity.getRedirectURL());
const kakaoLoginPage = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;

export const onClickGoogleAuth = () => {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log(token);
  });
};

export const onClickKakaoAuth = () => {
  chrome.identity.launchWebAuthFlow(
    {
      interactive: true,
      url: kakaoLoginPage,
    },
    async (redirectUri) => {
      const code = redirectUri?.split("code=")[1];
      const res = await api.post(`/login/kakao?code=${code}`);

      // response에 맞게 token 가져오는 부분 수정
      chrome.storage.local.set({ token: res.data.id });
    }
  );
};
