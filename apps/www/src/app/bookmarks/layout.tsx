import LeftSidebar from "@/components/bookmarks/left-sidebar";

const BookmarksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <LeftSidebar />
      {children}
    </main>
  );
};

export default BookmarksLayout;
