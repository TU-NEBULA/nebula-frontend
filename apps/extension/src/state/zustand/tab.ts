import { create } from "zustand";

interface TabStoreProps {
  currentTab: {
    url: string;
    title: string;
  };
  setCurrentTab: (tab: TabStoreProps["currentTab"]) => void;
}

export const useTabStore = create<TabStoreProps>((set) => ({
  currentTab: {
    url: "사이트 url",
    title: "사이트 title",
  },
  setCurrentTab: (tab: TabStoreProps["currentTab"]) => set({ currentTab: tab }),
}));
