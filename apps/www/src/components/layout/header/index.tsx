import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo.svg";

const Header = async () => {
  return (
    <header className="flex justify-between px-10 py-6 text-white">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="nebula 로고" width={40} height={20} />
        <p className="text-xl font-semibold">Nebula</p>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/trending">Trending</Link>
        <Link href="/history">History</Link>
      </div>
    </header>
  );
};

export default Header;
