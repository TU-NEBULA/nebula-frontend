import { useRouter } from "next/navigation";

import { useUserStore } from "@/lib/zustand/user";

interface LoginButtonProps {
  token: string | null;
}

const LoginButton = ({ token }: LoginButtonProps) => {
  const router = useRouter();
  const setUserStore = useUserStore((state) => state.setUser);

  const isLogin = token;
  const name = isLogin ? "Logout" : "Login";

  const onClick = async () => {
    if (isLogin) {
      setUserStore({ accessToken: null, refreshToken: null });
      alert("로그아웃 되었습니다.");
      return router.replace("/");
    }
    router.push("/login");
  };

  return <button onClick={onClick}>{name}</button>;
};

export default LoginButton;
