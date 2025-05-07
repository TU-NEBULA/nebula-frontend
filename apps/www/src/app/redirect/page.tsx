"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { checkAuth } from "@/utils/cookies";
import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const isValidRequest = await checkAuth();
      if (!isValidRequest) alert("잘못된 접근입니다.");
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
