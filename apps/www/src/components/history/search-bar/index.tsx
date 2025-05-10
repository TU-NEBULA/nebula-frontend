"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Icon from "@/components/common/icon";
import { useDebounce } from "@repo/ui";

interface SearchBarProps {
  initialQuery: string;
}

export default function SearchBar({ initialQuery }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedQuery) params.set("q", debouncedQuery);
    else params.delete("q");
    router.replace(`?${params.toString()}`);
  }, [debouncedQuery]);

  return (
    <form className="flex gap-3 rounded-full bg-black1 p-3" onSubmit={(e) => e.preventDefault()}>
      <Icon.search fill="#454746" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="기록 검색"
        className="flex-1 bg-transparent text-gray7 outline-none placeholder:text-gray8"
      />
    </form>
  );
}
