import { useEffect, useState } from "react";

import Loading from "@/components/loading";
import { useCreateStar } from "@/state/mutation/star";
import { getHtmlText, updateCurrentTab } from "@/utils/chrome";
import { RectangleButton } from "@repo/ui";

const Bookmark = () => {
  const [currentTab, setCurrentTab] = useState({
    url: "사이트 url",
    title: "사이트 title",
  });
  const { mutateAsync } = useCreateStar();

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

  useEffect(() => {
    updateCurrentTab(setCurrentTab);
    chrome.tabs.onActivated.addListener(() => {
      updateCurrentTab(setCurrentTab);
    });
    chrome.tabs.onUpdated.addListener((_, changeInfo) => {
      if (changeInfo.status === "complete") {
        updateCurrentTab(setCurrentTab);
      }
    });
  }, []);

  return (
    <Loading title="페이지를 요약하고 있어요!">
      <main className="h-full gap-28 flex flex-col justify-center overflow-x-hidden">
        <h1 className="text-notification">현재 페이지 정보</h1>
        <section className="space-y-4">
          <div className="space-y-2 text-body">
            <h2>URL</h2>
            <p className="text-gray7">{currentTab.url}</p>
          </div>
          <div className="space-y-2 text-body">
            <h2>Title</h2>
            <p className="text-gray7">{currentTab.title}</p>
          </div>
        </section>
        <RectangleButton
          className={"w-full text-white transition-colors bg-black2"}
          onClick={onClickAdd}
        >
          북마크에 추가하기
        </RectangleButton>
      </main>
    </Loading>
  );
};

export default Bookmark;
