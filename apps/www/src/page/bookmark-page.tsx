"use client";

import { Usable, use, useState } from "react";

import Graph from "@/components/bookmarks/graph";
import GraphDetail from "@/components/bookmarks/graph/graph-detail";
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
