"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import GraphDetail from "@/components/bookmarks/graph/graph-detail";
import { Spinner } from "@repo/ui";

const Graph = dynamic(() => import("@/components/bookmarks/graph"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner theme="dark" />
    </div>
  ),
});

const Bookmarks = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Graph onOpen={onOpen} />
      <GraphDetail open={open} onClose={onClose} />
    </>
  );
};

export default Bookmarks;
