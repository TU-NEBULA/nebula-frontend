import { useEffect } from "react";

import { useDetectPath } from "@/hooks/use-detect-path";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";

export const queryClient = new QueryClient();

const Layout = () => {
  useDetectPath();

  useEffect(() => {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
};
export default Layout;
