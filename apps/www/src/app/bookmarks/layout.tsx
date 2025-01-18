import Sidebar from "@/components/bookmarks/sidebar";

const BookmarksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <Sidebar />
      {children}
    </main>
  );
};

export default BookmarksLayout;
