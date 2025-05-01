"use client";

import { Usable, use, useState } from "react";

import Graph from "@/components/bookmarks/graph";
import GraphDetail from "@/components/bookmarks/graph/graph-detail";
import Planet from "@/components/bookmarks/graph/planet";
import { GRAPH_THEME } from "@/constants/bookmark";
import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { BaseResponseDTO } from "@/models";
import { AllStarDTO } from "@/models/star";

interface BookmarkPageProps {
  promisedData: Usable<BaseResponseDTO<AllStarDTO>>;
}

const BookmarkPage = ({ promisedData }: BookmarkPageProps) => {
  const [detail, setDetail] = useState({
    open: false,
    id: "",
  });

  const data = use<BaseResponseDTO<AllStarDTO>>(promisedData);

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

  return (
    <>
      {bookmarkStore.selectedTheme === GRAPH_THEME.GRAPH ? (
        <Graph onOpen={onOpen} data={data?.result} />
      ) : (
        <Planet onOpen={onOpen} data={data?.result} />
      )}
      <GraphDetail open={detail.open} id={detail.id} onClose={onClose} />
    </>
  );
};

export default BookmarkPage;
