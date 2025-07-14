"use client";

import { useEffect, useRef } from "react";

import { Coords, LinkObject, NodeObject } from "@/types/graph";
import { AllStarDTO } from "@repo/types";

import * as THREE from "three";

interface GraphProps {
  onOpen: (id: string) => void;
  data: AllStarDTO;
}

const fixedPosition = (position: number) => (position > 0 ? 250 : -250);

const Graph = ({ onOpen, data }: GraphProps) => {
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGraph = async () => {
      if (typeof window !== "undefined" && graphRef.current) {
        const ForceGraph3D = (await import("3d-force-graph")).default;
        const graph = new ForceGraph3D(graphRef.current);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        graph.scene().add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
        directionalLight.position.set(50, 50, 50);
        graph.scene().add(directionalLight);

        const nodes = data?.starListDto.map((star) => ({
          id: star.starId,
          name: star.title,
          color: "#2E40A9",
          icon: star.faviconUrl || "/velog.png",
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
          .linkWidth((link: LinkObject) => link.width || 1)
          .linkColor(() => "#ffffff")
          .linkOpacity(1)
          .nodeLabel((node: NodeObject) => node.name || "")
          .nodeOpacity(1)
          .nodeThreeObjectExtend(false)
          .onNodeClick((node: NodeObject) => {
            if (
              !node ||
              !node.id ||
              node.x === undefined ||
              node.y === undefined ||
              node.z === undefined
            )
              return;
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

            graph.cameraPosition(
              targetPosition,
              node as NodeObject & { x: number; y: number; z: number },
              500
            );
          })
          .backgroundColor("#111")
          .showNavInfo(false)
          .d3AlphaDecay(0.1)
          .d3Force("charge");

        window.addEventListener("resize", function handleResize() {
          graph.width(graphRef.current?.clientWidth || 0);
          graph.height(graphRef.current?.clientHeight || 0);
        });

        return () => {
          window.removeEventListener("resize", function handleRemoveResize() {});
        };
      }
    };

    loadGraph();
  }, [data]);

  return <main ref={graphRef} className="h-full w-full" />;
};

export default Graph;
