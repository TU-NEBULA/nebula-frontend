"use client";

import { useState } from "react";

import Graph from "@/components/bookmarks/graph";
import GraphDetail from "@/components/bookmarks/graph/graph-detail";
import Planet from "@/components/bookmarks/graph/planet";
import { GRAPH_THEME } from "@/constants/bookmark";
import { useGetAllStars } from "@/lib/tanstack/query/star";
import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { Spinner } from "@repo/ui";

const BookmarkPage = () => {
  const [detail, setDetail] = useState({
    open: false,
    id: "",
  });

  const { data, isPending } = useGetAllStars();

  const bookmarkStore = useBookmarkStore();

  const onOpen = (id: string) => {
    setDetail({
      open: true,
      id,
    });
  };

  const onClose = () => {
    setDetail({
      open: false,
      id: "",
    });
  };

  if (isPending || !data) {
    return (
      <main className="flex h-screen w-screen items-center justify-center">
        {isPending ? <Spinner theme="dark" /> : <h1>북마크가 없습니다.</h1>}
      </main>
    );
  }

  return (
    <>
      {bookmarkStore.selectedTheme === GRAPH_THEME.GRAPH ? (
        <Graph onOpen={onOpen} data={data!.result} />
      ) : (
        <Planet onOpen={onOpen} data={data!.result} />
      )}
      <GraphDetail open={detail.open} id={detail.id} onClose={onClose} />
    </>
  );
};

export default BookmarkPage;
