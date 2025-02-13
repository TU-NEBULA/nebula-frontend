import SocialLogin from "@/components/login/social-login";

const LoginPage = () => {
  return (
    <main className="h-screen gap-80 flex flex-col justify-center mx-auto min-w-login max-w-sidebar px-10">
      <section className="space-y-4">
        <div className="text-notification text-white">
          <p>검색 기록 최적화</p>
          <p>네뷸라</p>
        </div>
        <p className="text-gray7">계정 연동 및 실행을 위해 로그인 해주세요.</p>
      </section>
      <section className="space-y-7">
        <SocialLogin />
        <div className="text-description gap-3 flex items-center justify-center text-gray7">
          <button>이용약관</button>
          <div className="h-3 w-px bg-gray5" />
          <button>개인정보처리방침</button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
