"use client";

import { useRouter } from "next/navigation";

import { setTempToken } from "@/utils/cookies";
// import { onClickOauth } from "@/utils/login";
import { SocialLoginButton } from "@repo/ui";

const SocialLogin = () => {
  const router = useRouter();
  const onLogin = async () => {
    await setTempToken();
    router.push("/");
  };

  return (
    <div className="gap-2 flex flex-col">
      {/* <SocialLoginButton social="kakao" onClick={() => onClickOauth("kakao")} />
      <SocialLoginButton social="google" onClick={() => onClickOauth("google")} /> */}
      <SocialLoginButton social="kakao" onClick={onLogin} />
      <SocialLoginButton social="google" onClick={onLogin} />
    </div>
  );
};

export default SocialLogin;
