import { lazy, useMemo } from "react";

import Loading from "@/components/loading";
import { useCreateStar } from "@/state/mutation/star";
import { useStarStore } from "@/state/zustand/star";
import { useTabStore } from "@/state/zustand/tab";
import { getHtmlText } from "@/utils/chrome";
import { RectangleButton } from "@repo/ui";

import { useNavigate } from "react-router-dom";

const ForceGraph2D = lazy(() => import("react-force-graph-2d"));

const url = import.meta.env.VITE_BASE_URL;

const Bookmark = () => {
  const { currentTab, isFindingExistPath } = useTabStore();

  const navigate = useNavigate();
  const { mutateAsync } = useCreateStar();
  const stars = useStarStore((state) => state.stars);

  const graphData = useMemo(() => {
    if (!stars?.starListDto || !stars?.linkListDto) return { nodes: [], links: [] };

    return {
      nodes: stars.starListDto.map((star) => ({
        id: star.starId,
        name: star.title,
        val: Math.min(star.views, 10),
      })),
      links: stars.linkListDto.map((link) => ({
        source: link.linkedNodeIdList[0],
        target: link.linkedNodeIdList[1],
      })),
    };
  }, [stars]);

  const onClickLogout = async () => {
    await chrome.cookies.remove({
      url,
      name: "accessToken",
    });
    await chrome.cookies.remove({
      url,
      name: "refreshToken",
    });
    navigate("/");
  };

  const onClickAdd = async () => {
    const html = await getHtmlText();
    const htmlContent = html.split("------MultipartBoundary--")[1];

    const htmlBlob = new Blob([htmlContent], { type: "text/html" });
    const htmlFile = new File([htmlBlob], "content.html", { type: "text/html" });

    const formData = new FormData();
    formData.append("htmlFile", htmlFile);

    await mutateAsync({
      title: currentTab.title,
      siteUrl: currentTab.url,
      htmlFile: formData,
    });
  };

  return (
    <Loading title="페이지를 요약하고 있어요!">
      <main className="flex h-full flex-col justify-center gap-28 overflow-x-hidden">
        <section>
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg border border-gray3 bg-white">
            <ForceGraph2D
              graphData={graphData}
              nodeLabel="name"
              nodeColor={() => "#1A1A1A"}
              linkColor={() => "#E5E5E5"}
              nodeRelSize={3}
              linkWidth={1}
              width={500}
              height={300}
              cooldownTicks={30}
              backgroundColor="white"
              nodeCanvasObject={(node, ctx, globalScale) => {
                if (typeof node.x === "undefined" || typeof node.y === "undefined") return;

                const label = node.name;
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
              d3AlphaDecay={0.02}
              d3VelocityDecay={0.3}
              minZoom={0.5}
              maxZoom={2}
              enableNodeDrag={false}
              enablePointerInteraction={true}
              enableZoomInteraction={true}
              onEngineStop={() => {
                // 그래프가 안정화되면 렌더링 최적화
                const canvas = document.querySelector("canvas");
                if (canvas) {
                  canvas.style.willChange = "auto";
                }
              }}
            />
          </div>
          <h1 className="text-notification">현재 페이지 정보</h1>
        </section>
        <section className="space-y-4">
          <div className="text-body space-y-2">
            <h2>URL</h2>
            <p className="text-gray7">{currentTab.url}</p>
          </div>
          <div className="text-body space-y-2">
            <h2>Title</h2>
            <p className="text-gray7">{currentTab.title}</p>
          </div>
        </section>
        <div className="flex flex-col gap-2">
          <RectangleButton onClick={onClickAdd} disabled={isFindingExistPath}>
            {isFindingExistPath ? "기존 북마크(추가 불가)" : "북마크에 추가하기"}
          </RectangleButton>
          <RectangleButton variation="outline" onClick={onClickLogout}>
            로그아웃
          </RectangleButton>
        </div>
      </main>
    </Loading>
  );
};

export default Bookmark;
