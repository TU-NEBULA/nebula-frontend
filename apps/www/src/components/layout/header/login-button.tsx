"use client";

import { useRouter } from "next/navigation";

import { removeAuth } from "@/utils/cookies";

interface LoginButtonProps {
  token: string | null;
}

const LoginButton = ({ token }: LoginButtonProps) => {
  const router = useRouter();

  const isLogin = !!token;
  const name = isLogin ? "Logout" : "Login";

  const onClick = async () => {
    if (isLogin) {
      await removeAuth();
      alert("로그아웃 되었습니다.");
      return router.replace("/");
    }
    router.push("/login");
  };

  return <button onClick={onClick}>{name}</button>;
};

export default LoginButton;
