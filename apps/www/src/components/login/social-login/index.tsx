"use client";

import { onClickOauth } from "@/utils/login";
import { SocialLoginButton } from "@repo/ui";

const SocialLogin = () => {
  return (
    <div className="gap-2 flex flex-col">
      <SocialLoginButton social="kakao" onClick={() => onClickOauth("kakao")} />
      <SocialLoginButton social="google" onClick={() => onClickOauth("google")} />
    </div>
  );
};

export default SocialLogin;
