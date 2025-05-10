"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
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
