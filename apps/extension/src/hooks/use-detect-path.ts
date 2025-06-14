import { useEffect } from "react";

import { useStarStore } from "@/state/zustand/star";
import { useTabStore } from "@/state/zustand/tab";
import { updateCurrentTab } from "@/utils/chrome";

import { useReplaceNavigate } from "./use-replace-navigate";

interface TabChangeInfoProps {
  status?: chrome.tabs.TabStatus;
  url?: string;
  groupId?: number;
  pinned?: boolean;
  audible?: boolean;
  frozen?: boolean;
  discarded?: boolean;
  autoDiscardable?: boolean;
  mutedInfo?: chrome.tabs.MutedInfo;
  favIconUrl?: string;
  title?: string;
}

export function useDetectPath() {
  const { currentTab, setCurrentTab, setIsFindingExistPath } = useTabStore();

  const stars = useStarStore((state) => state.stars);

  const navigate = useReplaceNavigate();

  useEffect(() => {
    updateCurrentTab(setCurrentTab);

    const onTabActived = () => {
      setIsFindingExistPath(true);
      updateCurrentTab(setCurrentTab);
    };

    const onTabUpdated = (_: number, changeInfo: TabChangeInfoProps) => {
      setIsFindingExistPath(true);
      if (changeInfo.status === "complete") {
        updateCurrentTab(setCurrentTab);
      }
    };

    chrome.tabs.onActivated.addListener(onTabActived);
    chrome.tabs.onUpdated.addListener(onTabUpdated);

    return () => {
      chrome.tabs.onActivated.removeListener(onTabActived);
      chrome.tabs.onUpdated.removeListener(onTabUpdated);
    };
  }, []);

  useEffect(() => {
    const findStar = stars?.starListDto.find((star) => encodeURI(star.siteUrl) === currentTab.url);

    if (findStar) {
      navigate(`/create-bookmark?id=${findStar.starId}`);
    } else {
      navigate("/bookmark");
    }
    setIsFindingExistPath(false);
  }, [stars, currentTab]);

  return { currentTab };
}
