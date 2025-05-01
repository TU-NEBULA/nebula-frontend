import { GRAPH_THEME, GRAPH_TYPE, LINK_TYPE } from "@/constants/bookmark";

import { create } from "zustand";

type FilterType = LINK_TYPE.SIMILARITY | LINK_TYPE.KEYWORD | "";

interface BookmarkStore {
  selectedFilter: FilterType;
  selectedTheme: GRAPH_THEME;
  selectedType: GRAPH_TYPE;
  selectedColor: string;
  setSelectedFilter: (selectedFilter: FilterType) => void;
  setSelectedTheme: (selectedTheme: GRAPH_THEME) => void;
  setSelectedType: (selectedType: GRAPH_TYPE) => void;
  setSelectedColor: (selectedColor: string) => void;
}

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  selectedFilter: "",
  selectedTheme: GRAPH_THEME.PLANET,
  selectedType: GRAPH_TYPE.COLOR,
  selectedColor: "#66ccff",
  setSelectedFilter: (selectedFilter: FilterType) => set({ selectedFilter }),
  setSelectedTheme: (selectedTheme: GRAPH_THEME) => set({ selectedTheme }),
  setSelectedType: (selectedType: GRAPH_TYPE) => set({ selectedType }),
  setSelectedColor: (selectedColor: string) => set({ selectedColor }),
}));
