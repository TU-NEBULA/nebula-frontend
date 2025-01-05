import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Outlet } from "react-router-dom";

const queryClient = new QueryClient();

const Layout = () => {
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
