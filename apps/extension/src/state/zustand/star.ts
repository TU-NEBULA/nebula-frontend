import { StarProps } from "@repo/types";

import { create } from "zustand";

interface StarStoreprops {
  stars: StarProps[];
  setStars: (stars: StarProps[]) => void;
}

export const useStarStore = create<StarStoreprops>((set) => ({
  stars: [],
  setStars: (stars) => set({ stars }),
}));
