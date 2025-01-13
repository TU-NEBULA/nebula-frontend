import Image from "next/image";

import Logo from "../assets/icons/Logo.svg";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen pt-6 pb-40 px-20">
      <div>
        <div className="flex flex-row gap-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <div className="font-semibold text-xl">Nebula</div>
        </div>
        <div className="flex flex-row justify-end items-end ml-auto text-right">
          <button className="font-extralight text-lg ml-6">Login</button>
          <button className="font-extralight text-lg ml-6">Start</button>
          <button className="font-extralight text-lg ml-6">Start</button>
          <button className="font-extralight text-lg ml-6 ">Start</button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="mt-60 mb-72">
          <div className="font-bold text-9xl">Nebula</div>
          <div className="font-bold text-7xl">Service</div>
          <div className="w-[550px] mt-20 font-extralight">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </div>
        </div>
        <div className="ml-auto mt-80 text-right">
          <div className="font-mediumn text-xl">시작페이지</div>
          <div className="font-extralight text-md mb-6">로그인을 할 수 있는 마이페이지 입니다</div>
          <div className="font-mediumn text-xl">프로필</div>
          <div className="font-extralight text-md">로그인을 할 수 있는 마이페이지 입니다</div>
        </div>
      </div>
      <div className="w-full h-[532px] border border-zinc-600 rounded-md">
        <div className="flex flex-row justify-between ml-10 mt-12 mb-20">
          <div className="flex-grow">
            <div className="font-bold text-7xl">Nebula</div>
            <div className="font-bold text-7xl">Service</div>
            <div className="w-[400px] mt-10 font-extralight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <button className="w-[100px] h-[48px] bg-zinc-300 mt-20 rounded-sm">Play</button>
          </div>
          <div className="ml-auto text-right w-[810px] h-[432px] bg-zinc-800 mr-10"></div>
        </div>
      </div>
    </main>
  );
}
