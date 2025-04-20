import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-with-header mx-auto bg-gradient-to-b from-black2 from-80% to-[#336CEC]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
