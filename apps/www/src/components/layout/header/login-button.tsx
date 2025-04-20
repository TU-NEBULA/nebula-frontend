"use client";

import { useRouter } from "next/navigation";

import { removeAuth } from "@/utils/cookies";

interface LoginButtonProps {
  token: string | null;
}

const LoginButton = ({ token }: LoginButtonProps) => {
  const router = useRouter();

  const name = token ? "Logout" : "Login";

  const onClick = async () => {
    if (token) {
      alert("로그아웃 되었습니다.");
      await removeAuth();
      return router.replace("/");
    }
    router.push("/login");
  };

  return <button onClick={onClick}>{name}</button>;
};

export default LoginButton;
