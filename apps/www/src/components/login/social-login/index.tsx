"use client";

import dynamic from "next/dynamic";

import { onClickOauth } from "@/utils/login";

const SocialLoginButton = dynamic(() => import("@repo/ui").then((mod) => mod.SocialLoginButton));

const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-2">
      <SocialLoginButton social="kakao" onClick={() => onClickOauth("kakao")} />
      <SocialLoginButton social="google" onClick={() => onClickOauth("google")} />
    </div>
  );
};

export default SocialLogin;
