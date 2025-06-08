import { AllStarDTO } from "@repo/types";

import { create } from "zustand";

interface StarStoreprops {
  stars: AllStarDTO | null;
  setStars: (stars: AllStarDTO | null) => void;
}

export const useStarStore = create<StarStoreprops>((set) => ({
  stars: null,
  setStars: (stars) => set({ stars }),
}));
