import { useEffect, useState } from "react";

import Loading from "@/components/loading";
import { METHOD, RESPONSE } from "@/constants/api";
import { useFetch } from "@/hooks/use-fetch";
import { SummarizeBookmarkDTO } from "@/models/bookmark";
import { SummarizeBookmarkProps } from "@/types/bookmark";
import { getHtmlText, updateCurrentTab } from "@/utils/chrome";
import { RectangleButton } from "@repo/ui";

import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const [currentTab, setCurrentTab] = useState({
    url: "사이트 url",
    title: "사이트 title",
  });
  const navigate = useNavigate();

  const { fetchData } = useFetch<SummarizeBookmarkProps, SummarizeBookmarkDTO>();

  const onClickAdd = async () => {
    const html = await getHtmlText();
    const htmlContent = html.split("------MultipartBoundary--")[1];
    const res = await fetchData(
      "/api/extract_data",
      { url: currentTab.url, html_content: htmlContent },
      METHOD.POST
    );
    if (res.code === RESPONSE.SUCCESS) {
      return navigate("/create-bookmark", { state: { ...res.result, title: currentTab.title } });
    }
    // code 코드에 따른 에러 처리
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
      <main className="h-full gap-10 flex flex-col justify-center overflow-x-hidden">
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
          className={"w-full text-white transition-colors bg-black"}
          onClick={onClickAdd}
        >
          북마크에 추가하기
        </RectangleButton>
      </main>
    </Loading>
  );
};

export default Bookmark;
