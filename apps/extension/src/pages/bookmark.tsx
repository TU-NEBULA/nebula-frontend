import { useEffect, useState } from "react";

import { getHtmlText, updateCurrentTab } from "@/utils/chrome";
import { RectangleButton } from "@repo/ui";

const Bookmark = () => {
  const [currentTab, setCurrentTab] = useState({ url: "사이트 url", title: "사이트 title" });

  const onClickAdd = async () => {
    // 백엔드에 현재 탭 정보를 전송하는 로직
    const html = await getHtmlText();
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
    <main className="h-full gap-10 flex flex-col justify-center">
      <h1 className="text-title text-center">현재 페이지 정보</h1>
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-subtitle">URL</h2>
          <p className="text-label">{currentTab.url}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-subtitle">Title</h2>
          <p className="text-label">{currentTab.title}</p>
        </div>
      </section>
      <RectangleButton
        className={
          "w-full text-white transition-colors bg-black hover:bg-opacity-90 active:bg-opacity-80"
        }
        onClick={onClickAdd}
      >
        북마크에 추가하기
      </RectangleButton>
    </main>
  );
};

export default Bookmark;
