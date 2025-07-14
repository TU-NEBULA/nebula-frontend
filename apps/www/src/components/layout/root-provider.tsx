"use client";

import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

interface RootProviderProps {
  children: React.ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-center"
        duration={3000}
        closeButton
        style={{
          zIndex: 99999,
        }}
      />
    </QueryClientProvider>
  );
}
