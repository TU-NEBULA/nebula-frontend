import { useEffect, useState } from "react";

import { getHtmlText } from "@/utils/chrome";
import { RectangleButton } from "@repo/ui";

const Bookmark = () => {
  const [currentTab, setCurrentTab] = useState({ url: "사이트 url", title: "사이트 title" });

  const onClickAdd = () => {
    // 백엔드에 현재 탭 정보를 전송하는 로직
    const html = getHtmlText();
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log("현재 창", tabs[0].url, tabs[0].title);
      setCurrentTab({ url: tabs[0].url!, title: tabs[0].title! });
    });
    chrome.tabs.onActivated.addListener(function (activeInfo) {
      chrome.tabs.get(activeInfo.tabId, function (tab) {
        console.log("활성화된 탭", tab.url);
        setCurrentTab({ url: tab.url!, title: tab.title! });
      });
    });
  }, []);

  return (
    <main className="h-full gap-10 flex flex-col justify-center">
      <h1 className="text-title text-center">현재 페이지 정보</h1>
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-subtitle">URL</h2>
          <p className="text-body">{currentTab.url}</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-subtitle">Title</h2>
          <p className="text-body">{currentTab.title}</p>
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
