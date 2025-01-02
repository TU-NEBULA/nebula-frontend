import Google from "@/assets/google.svg?react";
import Kakao from "@/assets/kakao.svg?react";
import Logo from "@/assets/logo.svg?react";
import { SocialLoginButton } from "@repo/ui";

const Home = () => {
  return (
    <main className="flex flex-col justify-center h-full gap-80">
      <section className="space-y-4">
        <div className="text-2xl">
          <p className="font-medium">검색 기록 최적화</p>
          <div className="flex gap-2 items-center">
            <p className="font-semibold">네뷸라</p>
            <Logo />
          </div>
        </div>
        <p className="text-sm">크롬 익스텐션 실행을 위해 로그인 해주세요.</p>
      </section>
      <section className="space-y-7">
        <div className="flex flex-col gap-2">
          <SocialLoginButton social="kakao" logo={<Kakao />} />
          <SocialLoginButton social="google" logo={<Google />} />
        </div>
        <div className="text-xs flex gap-3 justify-center items-center">
          <button>이용약관</button>
          <div className="h-3 w-px bg-black" />
          <button>개인정보처리방침</button>
        </div>
      </section>
    </main>
  );
};

export default Home;
