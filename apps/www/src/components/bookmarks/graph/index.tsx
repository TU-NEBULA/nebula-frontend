"use client";

import { useEffect, useRef } from "react";

import { Coords, LinkObject, NodeObject } from "@/types/graph";

// className scene-tooltip으로 호버 시 스타일링하기

const nodes = [
  { id: 1, name: "red" },
  { id: 2, name: "green" },
  { id: 3, name: "blue" },
  { id: 4, name: "yellow" },
];

const links = [
  { source: 1, target: 2, width: 1 },
  { source: 1, target: 3, width: 1 },
  { source: 1, target: 4, width: 1 },
];

const fixedPosition = (position: number) => (position > 0 ? 250 : -250);

const Graph = () => {
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGraph = async () => {
      if (typeof window !== "undefined" && graphRef.current) {
        const ForceGraph3D = (await import("3d-force-graph")).default;
        const graph = new ForceGraph3D(graphRef.current);

        await graph
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
          .onNodeClick((node: NodeObject) => {
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
          .d3Force("charge")
          .strength(-40);

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

  return <div ref={graphRef} className="w-full h-full" />;
};

export default Graph;
