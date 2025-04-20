"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUserStore } from "@/lib/zustand/user";
import { TokenProps } from "@/types/user";
import { setupAuth } from "@/utils/cookies";
import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    (async () => {
      const result = await setupAuth();
      if (!result.status) alert("잘못된 접근입니다.");
      userStore.setUser(result.data as TokenProps);
      router.replace("/bookmarks");
    })();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden">
      <Spinner theme="dark" />
    </main>
  );
};

export default RedirectPage;
