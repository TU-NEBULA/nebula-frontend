import { Suspense } from "react";

import BookmarkPage from "@/pages/bookmark-page";
import { Spinner } from "@repo/ui";

const Bookmarks = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner theme="dark" />
        </div>
      }
    >
      <BookmarkPage />
    </Suspense>
  );
};

export default Bookmarks;
