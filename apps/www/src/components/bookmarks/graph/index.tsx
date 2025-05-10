"use client";

import { useEffect, useRef } from "react";

import { GRAPH_TYPE } from "@/constants/bookmark";
import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { AllStarDTO } from "@/models/star";
import { Coords, LinkObject, NodeObject } from "@/types/graph";

import * as THREE from "three";

interface GraphProps {
  onOpen: (id: string) => void;
  data: AllStarDTO;
}

const fixedPosition = (position: number) => (position > 0 ? 250 : -250);

const Graph = ({ onOpen, data }: GraphProps) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const { selectedType, selectedColor } = useBookmarkStore();
  const nodesRef = useRef<THREE.Mesh[]>([]);

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
          color: selectedColor,
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
          .nodeThreeObject((node: NodeObject) => {
            const geometry = new THREE.SphereGeometry(10, 32, 32);
            const material = new THREE.MeshPhongMaterial({
              shininess: 10,
              specular: new THREE.Color(0xffffff),
            });

            if (selectedType === GRAPH_TYPE.COLOR) {
              material.color.set(selectedColor);
            } else {
              material.color.set("#ffffff");
              const iconUrl = node.icon || "/velog.png";
              const texture = new THREE.TextureLoader().load(iconUrl);
              material.map = texture;
            }

            const sphere = new THREE.Mesh(geometry, material);
            sphere.userData = { icon: node.icon || "/velog.png" };
            nodesRef.current.push(sphere);
            return sphere;
          })
          .nodeThreeObjectExtend(false)
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

        return () => {
          window.removeEventListener("resize", function handleRemoveResize() {});
          nodesRef.current = [];
        };
      }
    };

    loadGraph();
  }, [data]);

  // 타입과 색상 변경 시 재질만 업데이트
  useEffect(() => {
    if (!nodesRef.current.length) return;

    nodesRef.current.forEach((node) => {
      const material = node.material as THREE.MeshPhongMaterial;

      if (selectedType === GRAPH_TYPE.COLOR) {
        material.color.set(selectedColor);
        material.map = null;
      } else {
        material.color.set("#ffffff");
        const loader = new THREE.TextureLoader();
        loader.load(node.userData.icon, (texture) => {
          material.map = texture;
          material.needsUpdate = true;
        });
      }
      material.needsUpdate = true;
    });
  }, [selectedType, selectedColor]);

  return <main ref={graphRef} className="h-full w-full" />;
};

export default Graph;
