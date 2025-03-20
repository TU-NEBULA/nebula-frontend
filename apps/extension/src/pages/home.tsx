import { useEffect, useState } from "react";

import Logo from "@/assets/logo.svg?react";
import { useSocialLogin } from "@/hooks/use-social-login";
import { SocialLoginButton } from "@repo/ui";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClickOauth } = useSocialLogin(setIsLoading);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = await chrome.storage.local.get();

      if (token.accessToken) {
        navigate("/bookmark");
      }
    })();
  }, []);

  return (
    <main className="h-full gap-80 flex flex-col justify-center">
      <section className="space-y-4">
        <div className="text-notification">
          <p>검색 기록 최적화</p>
          <div className="gap-2 flex items-center">
            <p>네뷸라</p>
            <Logo />
          </div>
        </div>
        <p className="text-black2">크롬 익스텐션 실행을 위해 로그인 해주세요.</p>
      </section>
      <section className="space-y-7">
        <div className="gap-2 flex flex-col">
          <SocialLoginButton
            disabled={isLoading}
            social="kakao"
            onClick={() => onClickOauth("kakao")}
          />
          <SocialLoginButton
            disabled={isLoading}
            social="google"
            onClick={() => onClickOauth("google")}
          />
        </div>
        <div className="text-description gap-3 flex items-center justify-center text-gray7">
          <button>이용약관</button>
          <div className="h-3 w-px bg-gray5" />
          <button>개인정보처리방침</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
