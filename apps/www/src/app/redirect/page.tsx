"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { setupAuth } from "@/utils/cookies";
import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await setupAuth();
      if (!result) alert("잘못된 접근입니다.");
      router.replace("/");
    })();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden">
      <Spinner theme="dark" />
    </main>
  );
};

export default RedirectPage;
