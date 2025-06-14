import { Suspense } from "react";

import { Spinner } from "@repo/ui";

interface PageSpinnerProps {
  children: React.ReactNode;
}

export default function PageSpinner({ children }: PageSpinnerProps) {
  return (
    <Suspense
      fallback={
        <main className="flex h-screen w-screen items-center justify-center">
          <Spinner theme="dark" />
        </main>
      }
    >
      {children}
    </Suspense>
  );
}
