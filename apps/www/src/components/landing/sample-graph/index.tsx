"use client";

import { useEffect, useRef } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function SampleGraph() {
  const data = {
    starListDto: [
      { starId: "1", views: 10 },
      { starId: "2", views: 5 },
      { starId: "3", views: 8 },
      { starId: "4", views: 2 },
      { starId: "5", views: 15 },
    ],
    linkListDto: [
      { linkedNodeIdList: ["1", "2"] },
      { linkedNodeIdList: ["1", "3"] },
      { linkedNodeIdList: ["1", "4"] },
    ],
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const graphContainer = graphRef.current!;

    graphContainer.innerHTML = "";

    container.style.position = "relative";

    const width =
      container.clientWidth > 670
        ? ((container.clientWidth || 1440) - 146) / 2
        : (container.clientWidth || 1440) - 114;
    const height = 440;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 20, 30);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    graphContainer.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(20, 30, 20);
    scene.add(dirLight);

    const stars = data.starListDto.map((s) => s.starId);
    const links = data.linkListDto.map((l) => l.linkedNodeIdList as [string, string]);
    const parent: Record<string, string> = {};
    const find = (x: string): string => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    const union = (a: string, b: string) => {
      const pa = find(a),
        pb = find(b);
      if (pa !== pb) parent[pb] = pa;
    };
    stars.forEach((id) => (parent[id] = id));
    links.forEach(([a, b]) => union(a, b));
    const groups: Record<string, string[]> = {};
    stars.forEach((id) => {
      const root = find(id);
      if (!groups[root]) groups[root] = [];
      groups[root].push(id);
    });

    const orbitRadius = 5;
    const orbitSpeed = 0.005;

    const bodies: { mesh: THREE.Mesh; angle: number; center: THREE.Vector3 }[] = [];

    const roots = Object.keys(groups);
    const spacing = 15;
    const offset = ((roots.length - 1) * spacing) / 2;

    roots.forEach((root, idx) => {
      const ids = groups[root];
      const cx = idx * spacing - offset;
      const cy = 0;
      const cz = 0;

      const sunGeo = new THREE.SphereGeometry(2, 32, 32);
      const sunMat = new THREE.MeshStandardMaterial({
        emissive: new THREE.Color(0xffaa00),
        emissiveIntensity: 1.5,
        color: 0x222222,
      });
      const sunMesh = new THREE.Mesh(sunGeo, sunMat);
      sunMesh.position.set(cx, cy, cz);
      scene.add(sunMesh);

      const ringGeo = new THREE.RingGeometry(orbitRadius - 0.5, orbitRadius + 0.5, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x888888,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.set(cx, cy, cz);
      scene.add(ringMesh);

      ids.forEach((id, j) => {
        const geom = new THREE.SphereGeometry(0.75, 32, 32);
        const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const mesh = new THREE.Mesh(geom, mat);
        const angle = (j / ids.length) * Math.PI * 2;
        mesh.position.set(
          cx + orbitRadius * Math.cos(angle),
          cy,
          cz + orbitRadius * Math.sin(angle)
        );
        scene.add(mesh);
        bodies.push({ mesh, angle, center: new THREE.Vector3(cx, cy, cz) });
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      bodies.forEach((b) => {
        b.angle += orbitSpeed;
        b.mesh.position.x = b.center.x + orbitRadius * Math.cos(b.angle);
        b.mesh.position.z = b.center.z + orbitRadius * Math.sin(b.angle);
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w =
        container.clientWidth > 670
          ? ((container.clientWidth || 1440) - 146) / 2
          : (container.clientWidth || 1440) - 98;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <section className="py-28">
      <div
        ref={containerRef}
        className="p-12 border border-gray7 flex flex-col rounded-lg gap-12 md:flex-row"
      >
        <div className="space-y-5 flex-1">
          <h2 className="lg:text-landing-sub-title md:text-5xl text-4xl md:leading-none">
            북마크를
            <br /> 노드로 관리
          </h2>
          <p className="text-gray7">
            북마크별로 정보의 양에 따라 노드의 크기 및 선의 굵기가 바뀌며, 색상 또한 역할에 맞게
            지정하여 보여줍니다.
          </p>
        </div>
        <div
          ref={graphRef}
          id="sample-graph"
          className="border border-gray7 h-graph flex-1 rounded-sm block"
        />
      </div>
    </section>
  );
}
