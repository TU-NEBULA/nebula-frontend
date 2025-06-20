/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useEffect, useRef } from "react";

const ReactForceGraph2D = lazy(() => import("react-force-graph-2d"));

interface NodeType {
  id: string;
  name: string;
  val: number;
  x?: number;
  y?: number;
  url?: string;
}

interface LinkType {
  source: string;
  target: string;
}

interface Graph2DProps {
  graphData: {
    nodes: NodeType[];
    links: LinkType[];
  };
  width?: number;
  height?: number;
}

const Graph2D = ({ graphData, width = 500, height = 300 }: Graph2DProps) => {
  const fgRef = useRef<any>(null);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("link").distance(120);
      fgRef.current.zoom(0.7);
    }
  }, [graphData]);

  const onNodeClick = (node: any) => {
    if (node.url) {
      window.open(node.url, "_blank");
    }
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-gray3 bg-white">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">그래프를 불러오는 중...</div>
        }
      >
        <ReactForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="name"
          nodeColor={() => "#1A1A1A"}
          linkColor={() => "#E5E5E5"}
          nodeRelSize={3}
          linkWidth={1}
          width={width}
          height={height}
          cooldownTicks={30}
          backgroundColor="white"
          nodeCanvasObject={(node, ctx, globalScale) => {
            if (typeof node.x === "undefined" || typeof node.y === "undefined") return;

            const maxLabelLength = 15;
            const label =
              node.name.length > maxLabelLength
                ? node.name.slice(0, maxLabelLength) + "..."
                : node.name;
            const fontSize = 12 / globalScale;
            const nodeSize = 5;

            // 동그라미 그리기
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
            ctx.fillStyle = "#1A1A1A";
            ctx.fill();

            // 텍스트 배경
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);

            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y + nodeSize + 2,
              bckgDimensions[0],
              bckgDimensions[1]
            );

            // 텍스트 그리기
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#1A1A1A";
            ctx.fillText(label, node.x, node.y + nodeSize + 2 + bckgDimensions[1] / 2);
          }}
          onNodeClick={onNodeClick}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          minZoom={0.5}
          maxZoom={2}
          enablePointerInteraction={true}
          enableZoomInteraction={true}
          onEngineStop={() => {
            const canvas = document.querySelector("canvas");
            if (canvas) {
              canvas.style.willChange = "auto";
            }
          }}
        />
      </Suspense>
    </div>
  );
};

export default Graph2D;
