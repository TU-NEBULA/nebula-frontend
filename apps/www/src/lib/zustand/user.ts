import { UserInfoDTO } from "@/models/user";

import { create } from "zustand";

interface UserStore {
  userInfo: UserInfoDTO | null;
  setUserInfo: (userInfo: UserInfoDTO | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
