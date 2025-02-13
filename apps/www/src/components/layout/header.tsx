import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo.svg";

const Header = () => {
  return (
    <header className="text-white py-6 px-10 flex justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="nebula 로고" width={40} height={20} />
        <p className="text-xl font-semibold">Nebula</p>
      </Link>
      <Link href="/login">Login</Link>
    </header>
  );
};

export default Header;
