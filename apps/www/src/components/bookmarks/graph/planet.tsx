"use client";

import { useEffect, useRef } from "react";

import { GRAPH_TYPE } from "@/constants/bookmark";
import { useBookmarkStore } from "@/lib/zustand/bookmark";
import { AllStarDTO } from "@/models/star";
import { LinkProps, StarProps } from "@/types/graph";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface GraphProps {
  onOpen: (id: string) => void;
  data: AllStarDTO;
}

type Body = { mesh: THREE.Mesh; angle: number; center: THREE.Vector3; star: StarProps };

export default function Planet({ onOpen, data }: GraphProps) {
  const { selectedType, selectedColor } = useBookmarkStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Body[]>([]);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  // 초기 설정 및 씬 구성
  useEffect(() => {
    const container = containerRef.current!;
    container.innerHTML = "";
    container.style.position = "relative";

    const tooltip = document.createElement("div");
    Object.assign(tooltip.style, {
      position: "absolute",
      pointerEvents: "none",
      padding: "4px 8px",
      background: "rgba(0,0,0,0.7)",
      color: "#fff",
      borderRadius: "4px",
      display: "none",
      whiteSpace: "nowrap",
      fontSize: "12px",
      zIndex: "10",
    });
    container.appendChild(tooltip);

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x111111);
    let width = container.clientWidth;
    let height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 20, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 100;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 30, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const stars: StarProps[] = data?.starListDto || [];
    const links: LinkProps[] = data?.linkListDto || [];
    const parent: Record<string, string> = {};
    const find = (x: string): string => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const union = (a: string, b: string) => {
      const pa = find(a),
        pb = find(b);
      if (pa !== pb) parent[pb] = pa;
    };
    stars.forEach((s) => (parent[s.starId] = s.starId));
    links.forEach((l) => union(l.linkedNodeIdList[0], l.linkedNodeIdList[1]));
    const groups: Record<string, string[]> = {};
    stars.forEach((s) => {
      const r = find(s.starId);
      if (!groups[r]) groups[r] = [];
      groups[r].push(s.starId);
    });

    const groupKeywords: Record<string, string[]> = {};
    Object.keys(groups).forEach((root) => {
      const shared = links
        .filter(
          (l) =>
            groups[root].includes(l.linkedNodeIdList[0]) &&
            groups[root].includes(l.linkedNodeIdList[1])
        )
        .flatMap((l) => l.sharedKeywords);
      const uniqueShared = Array.from(new Set(shared));
      if (uniqueShared.length > 0) {
        groupKeywords[root] = uniqueShared;
      } else {
        const rep = stars.find((s) => s.starId === root);
        groupKeywords[root] = rep && rep.keywordList.length > 0 ? [rep.keywordList[0]] : [];
      }
    });

    const orbitRadius = 5;
    const orbitSpeed = 0.005;
    const loader = new THREE.TextureLoader();
    const placementRange = 40;
    const centerRadius = 3;
    const minCenterDist = orbitRadius * 2 + centerRadius * 2;
    const centers: THREE.Vector3[] = [];

    const bodies: Body[] = [];

    function makeLabel(text: string): THREE.Sprite {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const fontSize = 48;
      ctx.font = `${fontSize}px Arial`;
      const widthText = ctx.measureText(text).width;
      canvas.width = widthText;
      canvas.height = fontSize;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "#ccc";
      ctx.fillText(text, 0, fontSize * 0.8);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(widthText / 30, fontSize / 30, 1);
      sprite.renderOrder = Infinity;
      return sprite;
    }

    Object.entries(groups).forEach(([root, members]) => {
      let cx: number,
        cz: number,
        attempts = 0;
      do {
        cx = (Math.random() - 0.5) * placementRange;
        cz = (Math.random() - 0.5) * placementRange;
        attempts++;
      } while (
        centers.some((c) => c.distanceTo(new THREE.Vector3(cx, 0, cz)) < minCenterDist) &&
        attempts < 100
      );
      const center = new THREE.Vector3(cx, 0, cz);
      centers.push(center);

      const cgeo = new THREE.SphereGeometry(centerRadius, 32, 32);
      const cmat = new THREE.MeshStandardMaterial({
        emissive: 0xffaa00,
        emissiveIntensity: 0.7,
        color: 0xffaa00,
      });
      const centerMesh = new THREE.Mesh(cgeo, cmat);
      centerMesh.position.copy(center);
      centerMesh.castShadow = true;
      centerMesh.receiveShadow = true;
      scene.add(centerMesh);

      const kwText = (groupKeywords[root] || []).join(", ");
      if (kwText) {
        const label = makeLabel(kwText);
        label.position.copy(center);
        scene.add(label);
      }

      const ring = new THREE.RingGeometry(orbitRadius - 0.5, orbitRadius + 0.5, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const ringMesh = new THREE.Mesh(ring, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.copy(center);
      scene.add(ringMesh);

      members.forEach((starId, j) => {
        const star = stars.find((s) => s.starId === starId)!;
        const size = 0.5 + (star.views / Math.max(...stars.map((s) => s.views))) * 0.5;
        const geo = new THREE.SphereGeometry(size, 32, 32);

        const mat = new THREE.MeshStandardMaterial({ color: selectedColor });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData = {
          starId: star.starId,
          title: star.title,
          faviconUrl: star.faviconUrl || "/velog.png",
        };
        const angle = (j / members.length) * Math.PI * 2;
        mesh.position.set(
          cx + orbitRadius * Math.cos(angle),
          0,
          cz + orbitRadius * Math.sin(angle)
        );
        scene.add(mesh);
        bodies.push({ mesh, angle, center: center.clone(), star });
      });
    });

    bodiesRef.current = bodies;

    if (bodies.length) {
      controls.target.copy(bodies[0].center);
      camera.lookAt(bodies[0].center);
    }

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered: Body | null = null;

    container.addEventListener("pointermove", (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(bodies.map((b) => b.mesh));
      if (hits.length) {
        const mesh = hits[0].object as THREE.Mesh;
        hovered = bodies.find((b) => b.mesh === mesh)!;
        const kws = hovered.star.keywordList.join(", ");
        tooltip.innerHTML = `<strong>${hovered.star.title}</strong><br>${kws}`;
        tooltip.style.left = `${e.clientX - rect.left + 10}px`;
        tooltip.style.top = `${e.clientY - rect.top + 10}px`;
        tooltip.style.display = "block";
      } else {
        hovered = null;
        tooltip.style.display = "none";
      }
    });

    container.addEventListener("pointerdown", (e) => {
      if (!hovered) return;
      onOpen(hovered.star.starId);
      const distance = orbitRadius * 4;
      const camOffset = new THREE.Vector3(0, distance * 0.75, distance);
      camera.position.copy(hovered.mesh.position.clone().add(camOffset));
      controls.target.copy(hovered.mesh.position);
      controls.update();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      bodies.forEach((b) => {
        if (hovered !== b) {
          b.angle += orbitSpeed;
          b.mesh.position.x = b.center.x + orbitRadius * Math.cos(b.angle);
          b.mesh.position.z = b.center.z + orbitRadius * Math.sin(b.angle);
        }
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    return () => {
      renderer.dispose();
      controls.dispose();
      window.removeEventListener("resize", () => {});
    };
  }, [data]);

  // 타입과 색상 변경 시 재질만 업데이트
  useEffect(() => {
    if (!bodiesRef.current) return;

    bodiesRef.current.forEach((body) => {
      const material = body.mesh.material as THREE.MeshStandardMaterial;

      if (selectedType === GRAPH_TYPE.COLOR) {
        material.color.set(selectedColor);
        material.map = null;
      } else {
        material.color.set("#ffffff");
        const loader = new THREE.TextureLoader();
        loader.load(body.mesh.userData.faviconUrl, (texture) => {
          material.map = texture;
          material.needsUpdate = true;
        });
      }
      material.needsUpdate = true;
    });
  }, [selectedType, selectedColor]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
