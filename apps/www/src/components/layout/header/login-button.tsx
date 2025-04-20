"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  token: string | null;
}

const LoginButton = ({ token }: LoginButtonProps) => {
  const router = useRouter();

  const name = token ? "Logout" : "Login";

  const onClick = async () => {
    if (token) {
      const res = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      if (res.ok) {
        alert("로그아웃 되었습니다.");
        router.replace("/");
        router.refresh();
      }
    } else {
      router.push("/login");
    }
  };

  return <button onClick={onClick}>{name}</button>;
};

export default LoginButton;
