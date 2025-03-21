"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import GraphDetail from "@/components/bookmarks/graph/graph-detail";
import { useGetAllStars } from "@/lib/tanstack/query/star";
import { Spinner } from "@repo/ui";

const Graph = dynamic(() => import("@/components/bookmarks/graph"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner theme="dark" />
    </div>
  ),
});

const BookmarkPage = () => {
  const [detail, setDetail] = useState({
    open: false,
    id: "",
  });

  const { data } = useGetAllStars();

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
      <Graph onOpen={onOpen} data={data?.result} />
      <GraphDetail open={detail.open} id={detail.id} onClose={onClose} />
    </>
  );
};

export default BookmarkPage;
