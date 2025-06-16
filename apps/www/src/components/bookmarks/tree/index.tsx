"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { useGet2DStars } from "@/lib/tanstack/query/star";
import { Spinner } from "@repo/ui";

import ReactD3Tree, { TreeNodeDatum } from "react-d3-tree";

import PureSvgNodeElement from "./pure-svg-node-element";

interface TreeProps {
  onOpen: (id: string) => void;
}

interface HierarchyPointNode {
  data: TreeNodeDatum;
  depth: number;
}

const nodeSize = {
  x: 200,
  y: 200,
};

export default function Tree({ onOpen }: TreeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!wrapperRef.current) return;
    const { width, height } = wrapperRef.current.getBoundingClientRect();
    setTranslate({ x: width / 2, y: height / 2 });
  }, []);

  const { data, isLoading } = useGet2DStars();

  const orgChart = useMemo(() => {
    if (!data?.result || data.result.length === 0) return null;

    return {
      name: "",
      children: data.result.map((category) => ({
        name: category.category,
        children: category.keywordList.map((keyword) => ({
          name: keyword.keyword,
          children: keyword.starList.map((star) => ({
            name: star.title,
            attributes: {
              summary: star.summaryAI,
              id: star.starId,
            },
          })),
        })),
      })),
    };
  }, [data?.result]);

  const onClickNode = (node: HierarchyPointNode) => {
    if (node.depth < 3) return;
    onOpen(node.data.attributes?.id as string);
  };

  return (
    <div
      id="treeWrapper"
      ref={wrapperRef}
      className="flex h-screen w-screen flex-col items-center justify-center text-white"
    >
      {isLoading ? (
        <Spinner theme="dark" />
      ) : orgChart ? (
        <ReactD3Tree
          initialDepth={1}
          data={orgChart}
          translate={translate}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          renderCustomNodeElement={(node) => (
            <PureSvgNodeElement {...node} orientation="vertical" />
          )}
          nodeSize={nodeSize}
          onNodeClick={(node) => onClickNode(node)}
          onUpdate={(target) => console.log(target)}
        />
      ) : (
        <h1>북마크가 없습니다.</h1>
      )}
    </div>
  );
}
