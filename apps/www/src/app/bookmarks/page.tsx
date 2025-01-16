"use client";

import dynamic from "next/dynamic";

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
  return <Graph />;
};

export default Bookmarks;
