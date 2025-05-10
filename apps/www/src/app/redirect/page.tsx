"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { checkAuth } from "@/utils/cookies";
import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // const isValidRequest = await checkAuth();
      // if (!isValidRequest) {
      //   alert("잘못된 접근입니다.");
      //   return router.replace("/");
      // }
      router.replace("/bookmarks");
    })();
  }, []);

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <Spinner theme="dark" />
    </main>
  );
};

export default RedirectPage;
