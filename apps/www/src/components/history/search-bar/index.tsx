"use client";

import { useRouter, useSearchParams } from "next/navigation";

import Icon from "@/components/common/icon";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (q) params.set("q", q);
    else params.delete("q");
    router.replace(`?${params.toString()}`);
  };

  return (
    <form className="flex gap-3 rounded-full bg-black1 p-3" onSubmit={(e) => e.preventDefault()}>
      <Icon.search fill="#454746" />
      <input
        defaultValue={initialQuery}
        onChange={onChange}
        placeholder="기록 검색"
        className="flex-1 bg-transparent text-gray7 outline-none placeholder:text-gray8"
      />
    </form>
  );
}
