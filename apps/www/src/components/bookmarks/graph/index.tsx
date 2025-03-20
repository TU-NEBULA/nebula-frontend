"use client";

import { useEffect, useRef } from "react";

import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { AllStarDTO } from "@/models/star";
import { Coords, LinkObject, NodeObject } from "@/types/graph";

// className scene-tooltip으로 호버 시 스타일링하기

interface GraphProps {
  onOpen: (id: string) => void;
  data: AllStarDTO;
}

const fixedPosition = (position: number) => (position > 0 ? 250 : -250);

const Graph = ({ onOpen, data }: GraphProps) => {
  const graphRef = useRef<HTMLDivElement>(null);
  // 선택된 필터로 link handling하기
  const { selectedFilter, setSelectedFilter } = useBookmarkStore();

  useEffect(() => {
    const loadGraph = async () => {
      if (typeof window !== "undefined" && graphRef.current) {
        const ForceGraph3D = (await import("3d-force-graph")).default;
        const graph = new ForceGraph3D(graphRef.current);

        const nodes = data.starListDto.map((star) => ({
          id: star.starId,
          name: star.title,
        }));
        const links = data.linkListDto.map((link) => ({
          source: link.linkedNodeIdList[0],
          target: link.linkedNodeIdList[1],
          width: link.similarity,
        }));

        graph
          .graphData({
            nodes: nodes as NodeObject[],
            links: links as LinkObject[],
          })
          .linkWidth((node: NodeObject) => node.width || 1)
          .linkColor(() => "#ffffff")
          .linkOpacity(1)
          .nodeLabel((node: NodeObject) => node.name || "")
          .nodeColor(() => "#a3a3a3")
          .nodeOpacity(1)
          .onNodeClick((node: Required<NodeObject>) => {
            onOpen(node.id);
            const { x, y, z } = graph.cameraPosition();
            const gaps = [node.x - x, node.y - y, node.z - z];
            const maxIndex = gaps.findIndex(
              (gap) => Math.abs(gap) === Math.max(...gaps.map(Math.abs))
            );

            const targetPosition = {
              x: maxIndex === 0 ? fixedPosition(x) : node.x,
              y: maxIndex === 1 ? fixedPosition(y) : node.y,
              z: maxIndex === 2 ? fixedPosition(z) : node.z,
            };

            graph.cameraPosition(targetPosition, node as Required<Coords>, 500);
          })
          .backgroundColor("#111")
          .showNavInfo(false)
          .d3AlphaDecay(0.1)
          .d3Force("charge");

        window.addEventListener("resize", function handleResize() {
          graph.width(graphRef.current?.clientWidth || 0);
          graph.height(graphRef.current?.clientHeight || 0);
        });
      }
    };

    loadGraph();

    return () => {
      window.removeEventListener("resize", function handleRemoveResize() {});
    };
  }, []);

  return <main ref={graphRef} className="w-full h-full" />;
};

export default Graph;
