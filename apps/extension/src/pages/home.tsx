import Google from "@/assets/google.svg?react";
import Kakao from "@/assets/kakao.svg?react";
import Logo from "@/assets/logo.svg?react";
import { onClickGoogleAuth, onClickKakaoAuth } from "@/utils/login";
import { Flex, SocialLoginButton } from "@repo/ui";

const Home = () => {
  return (
    <Flex as="main" direction="col" justify="center" className="h-full gap-80">
      <section className="space-y-4">
        <div className="text-2xl">
          <p className="font-medium">검색 기록 최적화</p>
          <Flex align="center" className="gap-2">
            <p className="font-semibold">네뷸라</p>
            <Logo />
          </Flex>
        </div>
        <p className="text-sm">크롬 익스텐션 실행을 위해 로그인 해주세요.</p>
      </section>
      <section className="space-y-7">
        <Flex direction="col" className="gap-2">
          <SocialLoginButton social="kakao" logo={<Kakao />} onClick={onClickKakaoAuth} />
          <SocialLoginButton social="google" logo={<Google />} onClick={onClickGoogleAuth} />
        </Flex>
        <Flex justify="center" align="center" className="text-xs gap-3">
          <button>이용약관</button>
          <div className="h-3 w-px bg-black" />
          <button>개인정보처리방침</button>
        </Flex>
      </section>
    </Flex>
  );
};

export default Home;
