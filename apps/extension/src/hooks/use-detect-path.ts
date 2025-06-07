import { useEffect } from "react";

import { useStarStore } from "@/state/zustand/star";
import { useTabStore } from "@/state/zustand/tab";
import { updateCurrentTab } from "@/utils/chrome";

import { useReplaceNavigate } from "./use-replace-navigate";

export function useDetectPath() {
  const { currentTab, setCurrentTab, setIsFindingExistPath } = useTabStore();

  const stars = useStarStore((state) => state.stars);

  const navigate = useReplaceNavigate();

  useEffect(() => {
    updateCurrentTab(setCurrentTab);
    chrome.tabs.onActivated.addListener(() => {
      setIsFindingExistPath(true);
      updateCurrentTab(setCurrentTab);
    });
    chrome.tabs.onUpdated.addListener((_, changeInfo) => {
      setIsFindingExistPath(true);
      if (changeInfo.status === "complete") {
        updateCurrentTab(setCurrentTab);
      }
    });
  }, []);

  useEffect(() => {
    const findStar = stars.find((star) => encodeURI(star.siteUrl) === currentTab.url);

    if (findStar) {
      navigate(`/create-bookmark?id=${findStar.starId}`);
    } else {
      navigate("/bookmark");
      setIsFindingExistPath(false);
    }
  }, [stars, currentTab]);

  return { currentTab };
}
