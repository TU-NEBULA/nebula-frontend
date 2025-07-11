"use client";

import { useState } from "react";

import Graph from "@/components/bookmarks/graph";
import GraphDetail from "@/components/bookmarks/graph/graph-detail";
import Planet from "@/components/bookmarks/graph/planet";
import Tree from "@/components/bookmarks/tree";
import { GRAPH_THEME } from "@/constants/bookmark";
import { useGetAllStars } from "@/lib/tanstack/query/star";
import { Spinner } from "@repo/ui";

interface BookmarkPageProps {
  theme: GRAPH_THEME;
}

export default function BookmarksPage({ theme }: BookmarkPageProps) {
  const [detail, setDetail] = useState({
    open: false,
    id: "",
  });

  const { data, isPending } = useGetAllStars();

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

  const renderTheme = () => {
    switch (theme) {
      case GRAPH_THEME.GRAPH:
        return <Graph onOpen={onOpen} data={data!.result} />;
      case GRAPH_THEME.PLANET:
        return <Planet onOpen={onOpen} data={data!.result} />;
      case GRAPH_THEME.TREE:
        return <Tree onOpen={onOpen} />;
    }
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
      {renderTheme()}
      <GraphDetail open={detail.open} id={detail.id} onClose={onClose} stars={data!.result} />
    </>
  );
}
