"use client";

import { useEffect, useRef } from "react";

import { Coords, LinkObject, NodeObject } from "@/types/graph";

const nodes = [
  { id: 1, name: "개발" },
  { id: 2, name: "프론트엔드" },
  { id: 3, name: "백엔드" },
  { id: 4, name: "임베디드" },
];

const links = [
  { source: 1, target: 2, width: 1 },
  { source: 1, target: 3, width: 1 },
  { source: 1, target: 4, width: 1 },
];

const fixedPosition = (position: number) => (position > 0 ? 250 : -250);

const SampleGraph = () => {
  const graphRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGraph = async () => {
      if (typeof window !== "undefined" && graphRef.current) {
        const ForceGraph3D = (await import("3d-force-graph")).default;
        const graph = new ForceGraph3D(graphRef.current);
        const width = (containerRef.current?.clientWidth - 146) / 2 || 0;

        await graph
          .width(width)
          .height(440)
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
          .d3AlphaDecay(0.1)
          .d3Force("charge")
          .strength(-40);

        window.addEventListener("resize", () => {
          const width = (containerRef.current?.clientWidth - 146) / 2 || 0;
          graph.width(width);
        });
      }
    };

    loadGraph();

    return () => window.removeEventListener("resize", () => {});
  }, []);

  return (
    <section className="py-28">
      {/* TODO: 해당 부분 어떤 내용 보여줄지 재정의하기 */}
      <div ref={containerRef} className="p-12 border border-gray7 flex w-full rounded-lg gap-12">
        <div className="space-y-5">
          <h2 className="text-landing-sub-title text-4xl leading-none">
            북마크를
            <br />
            노드로 관리
          </h2>
          <p className="text-gray7">
            북마크별로 정보의 양에 따라 노드의 크기 및 선의 굵기가 바뀌며, 색상 또한 역할에 맞게
            지정하여 보여줍니다.
          </p>
        </div>
        <div
          ref={graphRef}
          id="sample-graph"
          className="border border-gray7 w-full h-graph rounded-sm md:block hidden"
        />
      </div>
    </section>
  );
};

export default SampleGraph;
