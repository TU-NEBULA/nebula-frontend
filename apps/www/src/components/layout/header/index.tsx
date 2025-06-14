import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo.svg";
import NavDropdown from "@/components/common/nav-dropdown";

const Header = async () => {
  return (
    <header className="flex justify-between px-10 py-6 text-white">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="nebula 로고" width={40} height={20} />
        <p className="text-xl font-semibold">Nebula</p>
      </Link>
      <NavDropdown />
    </header>
  );
};

export default Header;
