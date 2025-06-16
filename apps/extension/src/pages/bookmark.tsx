import { useMemo } from "react";

import Loading from "@/components/loading";
import { useCreateStar } from "@/state/mutation/star";
import { useStarStore } from "@/state/zustand/star";
import { useTabStore } from "@/state/zustand/tab";
import { getHtmlText } from "@/utils/chrome";
import { Graph2D } from "@repo/ui";
import { RectangleButton } from "@repo/ui";

import { useNavigate } from "react-router-dom";

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
        url: star.siteUrl,
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
          <Graph2D graphData={graphData} />
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
