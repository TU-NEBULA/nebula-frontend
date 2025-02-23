import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-with-header mx-auto">
      <Header />
      {children}
    </div>
  );
}
