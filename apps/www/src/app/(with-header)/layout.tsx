import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="gradient-background">
      <div className="max-w-with-header mx-auto">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
