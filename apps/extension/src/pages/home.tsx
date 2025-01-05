import Google from "@/assets/google.svg?react";
import Kakao from "@/assets/kakao.svg?react";
import Logo from "@/assets/logo.svg?react";
import { onClickGoogleAuth, onClickKakaoAuth } from "@/utils/login";
import { SocialLoginButton } from "@repo/ui";

const Home = () => {
  return (
    <main className="h-full gap-80 flex flex-col justify-center">
      <section className="space-y-4">
        <div className="text-2xl">
          <p className="font-medium">검색 기록 최적화</p>
          <div className="gap-2 flex items-center">
            <p className="font-semibold">네뷸라</p>
            <Logo />
          </div>
        </div>
        <p className="text-sm">크롬 익스텐션 실행을 위해 로그인 해주세요.</p>
      </section>
      <section className="space-y-7">
        <div className="gap-2 flex flex-col">
          <SocialLoginButton social="kakao" logo={<Kakao />} onClick={onClickKakaoAuth} />
          <SocialLoginButton social="google" logo={<Google />} onClick={onClickGoogleAuth} />
        </div>
        <div className="text-xs gap-3 flex items-center justify-center">
          <button>이용약관</button>
          <div className="h-3 w-px bg-black" />
          <button>개인정보처리방침</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
