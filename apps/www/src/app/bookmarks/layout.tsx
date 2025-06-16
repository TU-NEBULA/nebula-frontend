import Sidebar from "@/components/bookmarks/sidebar";
import NavDropdown from "@/components/common/nav-dropdown";

const BookmarksLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="fixed right-5 top-5 z-10">
        <NavDropdown />
      </div>
      {children}
    </main>
  );
};

export default BookmarksLayout;
