"use client";

import { onClickGoogleAuth, onClickKakaoAuth } from "@/utils/login";
import { SocialLoginButton } from "@repo/ui";

const SocialLogin = () => {
  return (
    <div className="gap-2 flex flex-col">
      <SocialLoginButton social="kakao" onClick={onClickKakaoAuth} />
      <SocialLoginButton social="google" onClick={onClickGoogleAuth} />
    </div>
  );
};

export default SocialLogin;
