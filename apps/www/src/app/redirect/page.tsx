"use client";

import { useEffect } from "react";
import { redirect, RedirectType } from "next/navigation";

import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  useEffect(() => {
    redirect("/bookmarks", RedirectType.replace);
  }, []);

  return (
    <main className="flex h-screen items-center justify-center overflow-hidden">
      <Spinner theme="dark" />
    </main>
  );
};

export default RedirectPage;
