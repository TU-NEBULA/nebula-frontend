import Sidebar from "@/components/bookmarks/sidebar";
import { getUserInfo } from "@/service/user";

const BookmarksLayout = ({ children }: { children: React.ReactNode }) => {
  const userInfo = getUserInfo();

  return (
    <main className="flex min-h-screen overflow-hidden">
      <Sidebar userInfo={userInfo} />
      {children}
    </main>
  );
};

export default BookmarksLayout;
