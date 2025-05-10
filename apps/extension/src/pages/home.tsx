import { useEffect, useState } from "react";

import Logo from "@/assets/logo.svg?react";
import { useReplaceNavigate } from "@/hooks/use-replace-navigate";
import { useSocialLogin } from "@/hooks/use-social-login";
import { SocialLoginButton } from "@repo/ui";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { onClickOauth } = useSocialLogin(setIsLoading);

  const navigate = useReplaceNavigate();

  useEffect(() => {
    (async () => {
      const token = await chrome.cookies.get({
        url: import.meta.env.VITE_BASE_URL,
        name: "accessToken",
      });

      if (token) {
        navigate("/bookmark");
      }
    })();
  }, []);

  return (
    <main className="flex h-full flex-col justify-center gap-80">
      <section className="space-y-4">
        <div className="text-notification">
          <p>검색 기록 최적화</p>
          <div className="flex items-center gap-2">
            <p>네뷸라</p>
            <Logo />
          </div>
        </div>
        <p className="text-black3">크롬 익스텐션 실행을 위해 로그인 해주세요.</p>
      </section>
      <section className="space-y-7">
        <div className="flex flex-col gap-2">
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
        <div className="flex items-center justify-center gap-3 text-description text-gray7">
          <button>이용약관</button>
          <div className="h-3 w-px bg-gray5" />
          <button>개인정보처리방침</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
