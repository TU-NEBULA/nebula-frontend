import { LINK_TYPE } from "@/constants/bookmark";

import { create } from "zustand";

type FilterType = LINK_TYPE.SIMILARITY | LINK_TYPE.KEYWORD | "";

interface BookmarkStore {
  selectedFilter: FilterType;
  setSelectedFilter: (selectedFilter: FilterType) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  selectedFilter: "",
  setSelectedFilter: (selectedFilter: FilterType) => set({ selectedFilter }),
}));
