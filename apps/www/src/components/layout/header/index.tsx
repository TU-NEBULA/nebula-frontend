import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo.svg";

import LoginButton from "./login-button";

const Header = async () => {
  const cookieStorage = await cookies();
  const accessToken = cookieStorage.get("accessToken");

  return (
    <header className="text-white py-6 px-10 flex justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="nebula 로고" width={40} height={20} />
        <p className="text-xl font-semibold">Nebula</p>
      </Link>
      <LoginButton token={accessToken?.value || null} />
    </header>
  );
};

export default Header;
