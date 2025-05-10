"use client";

import { onClickOauth } from "@/utils/login";
import { SocialLoginButton } from "@repo/ui";

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-2">
      <SocialLoginButton social="kakao" onClick={() => onClickOauth("kakao")} />
      <SocialLoginButton social="google" onClick={() => onClickOauth("google")} />
    </div>
  );
};

export default SocialLogin;
