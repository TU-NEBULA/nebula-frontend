"use client";

import { useEffect, useRef } from "react";

import { AllStarDTO } from "@/models/star";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface GraphProps {
  onOpen: (id: string) => void;
  data: AllStarDTO;
}

export default function Graph({ onOpen, data }: GraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);

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
    });
    container.appendChild(tooltip);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 20, 30);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.zoomSpeed = 1;
    controls.rotateSpeed = 1;
    controls.minDistance = 5;
    controls.maxDistance = 100;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 30, 20);
    scene.add(dirLight);

    const stars = data.starListDto;
    const links = data.linkListDto.map((l) => l.linkedNodeIdList as [string, string]);
    const parent: Record<string, string> = {};
    const find = (x: string): string => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const union = (a: string, b: string) => {
      const pa = find(a),
        pb = find(b);
      if (pa !== pb) parent[pb] = pa;
    };
    stars.forEach((s) => (parent[s.starId] = s.starId));
    links.forEach(([a, b]) => union(a, b));
    const groups: Record<string, string[]> = {};
    stars.forEach((s) => {
      const r = find(s.starId);
      if (!groups[r]) groups[r] = [];
      groups[r].push(s.starId);
    });

    const maxViews = Math.max(...stars.map((s) => s.views), 1);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredGroup: string | null = null;

    const orbitRadius = 5;
    const orbitSpeed = 0.005;
    const loader = new THREE.TextureLoader();

    const placementRange = 40;
    const centerRadius = 3;
    const minCenterDist = orbitRadius * 2 + centerRadius * 2;
    const centers: THREE.Vector3[] = [];
    const centerMap: Record<string, THREE.Vector3> = {};

    const bodies: { mesh: THREE.Mesh; angle: number; center: THREE.Vector3; groupKey: string }[] =
      [];

    Object.keys(groups).forEach((root) => {
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
      const cy = 0;
      const center = new THREE.Vector3(cx, cy, cz);
      centers.push(center);
      centerMap[root] = center;

      const cgeo = new THREE.SphereGeometry(centerRadius, 32, 32);
      const cmat = new THREE.MeshStandardMaterial({
        emissive: 0xffaa00,
        emissiveIntensity: 1.5,
        color: 0x222222,
      });
      const cm = new THREE.Mesh(cgeo, cmat);
      cm.position.copy(center);
      scene.add(cm);

      const rgeo = new THREE.RingGeometry(orbitRadius - 0.5, orbitRadius + 0.5, 64);
      const rmat = new THREE.MeshBasicMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const rm = new THREE.Mesh(rgeo, rmat);
      rm.rotation.x = Math.PI / 2;
      rm.position.copy(center);
      scene.add(rm);

      groups[root].forEach((starId, j) => {
        const star = stars.find((s) => s.starId === starId)!;
        const iconUrl = star.faviconUrl || "/velog.png";
        const size = 0.5 + (star.views / maxViews) * 0.5;
        const geo = new THREE.SphereGeometry(size, 32, 32);
        const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        loader.load(
          iconUrl,
          (tex) => {
            mat.map = tex;
            mat.needsUpdate = true;
          },
          undefined,
          () => {
            loader.load("/velog.png", (t) => {
              mat.map = t;
              mat.needsUpdate = true;
            });
          }
        );
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData = { starId, groupKey: root };
        const angle = (j / groups[root].length) * Math.PI * 2;
        mesh.position.set(
          cx + orbitRadius * Math.cos(angle),
          cy,
          cz + orbitRadius * Math.sin(angle)
        );
        scene.add(mesh);
        bodies.push({ mesh, angle, center: center.clone(), groupKey: root });
      });
    });

    const maxStar = stars.reduce((a, b) => (a.views >= b.views ? a : b));
    const focusCenter = centerMap[find(maxStar.starId)];
    controls.target.copy(focusCenter);
    camera.lookAt(focusCenter);

    container.addEventListener("pointermove", (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(bodies.map((b) => b.mesh));
      if (hits.length) {
        const m = hits[0].object as THREE.Mesh;
        hoveredGroup = m.userData.groupKey;
        const s = stars.find((s) => s.starId === hoveredGroup)!;
        tooltip.innerText = s.title;
        tooltip.style.left = `${e.clientX - rect.left + 10}px`;
        tooltip.style.top = `${e.clientY - rect.top + 10}px`;
        tooltip.style.display = "block";
      } else {
        hoveredGroup = null;
        tooltip.style.display = "none";
      }
    });

    container.addEventListener("pointerdown", (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(
        bodies.map((b) => b.mesh),
        false
      );
      if (!hits.length) return; // 클릭 대상 아님

      const mesh = hits[0].object as THREE.Mesh;
      const starId = mesh.userData.starId;
      if (starId) onOpen(starId);

      // push camera out farther from the clicked star
      const distance = orbitRadius * 4;
      // position camera above and in front of the star so it remains visible
      const camOffset = new THREE.Vector3(0, distance * 0.75, distance);
      camera.position.copy(mesh.position.clone().add(camOffset));
      controls.target.copy(mesh.position);

      controls.update();
    });

    const animate = () => {
      requestAnimationFrame(animate);
      bodies.forEach((b) => {
        if (b.groupKey !== hoveredGroup) {
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
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    return () => {
      renderer.dispose();
      controls.dispose();
    };
  }, [data]);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
}
