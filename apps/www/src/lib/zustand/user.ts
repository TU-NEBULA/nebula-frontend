import { TokenProps } from "@/types/user";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStoreProps extends TokenProps {
  setUser: (props: TokenProps) => void;
}

export const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setUser: (props: TokenProps) => set(props),
    }),
    { name: "user-storage" }
  )
);
