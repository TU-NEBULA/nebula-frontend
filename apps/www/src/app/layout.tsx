import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import RootProvider from "@/components/layout/root-provider";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nebula",
  description: "북마크를 시각화하고 기록할 수 있는 서비스, Nebula",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
