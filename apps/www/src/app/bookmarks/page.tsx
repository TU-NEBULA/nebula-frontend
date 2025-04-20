import { Suspense } from "react";

import BookmarkPage from "@/page/bookmark-page";
import { getAllStars } from "@/service/star";
import { Spinner } from "@repo/ui";

const Bookmarks = () => {
  const data = getAllStars();

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner theme="dark" />
        </div>
      }
    >
      <BookmarkPage promisedData={data} />
    </Suspense>
  );
};

export default Bookmarks;
