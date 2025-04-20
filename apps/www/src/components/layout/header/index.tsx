import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo.svg";
import { getCookie } from "@/utils/cookies";

import LoginButton from "./login-button";

const Header = async () => {
  const token = await getCookie("accessToken");

  return (
    <header className="text-white py-6 px-10 flex justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="nebula 로고" width={40} height={20} />
        <p className="text-xl font-semibold">Nebula</p>
      </Link>
      <LoginButton token={token?.value || ""} />
    </header>
  );
};

export default Header;
