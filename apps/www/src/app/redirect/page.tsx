"use client";

import { useEffect } from "react";

import { setupAuth } from "@/utils/cookies";
import { Spinner } from "@repo/ui";

const RedirectPage = () => {
  useEffect(() => {
    setupAuth();
  }, []);

  return (
    <main className="flex justify-center items-center h-screen overflow-hidden">
      <Spinner theme="dark" />
    </main>
  );
};

export default RedirectPage;
