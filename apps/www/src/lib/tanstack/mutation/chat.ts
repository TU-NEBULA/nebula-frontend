import { CHAT } from "@/constants/chat";
import { createChatSession } from "@/service/chat";
import { useMutation } from "@tanstack/react-query";

import { queryClient } from "..";

export const useCreateChatSession = () => {
  return useMutation({
    mutationFn: createChatSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHAT.GET_ALL_CHAT_SESSIONS] });
    },
    onError: (error) => {
      console.error("onError", error);
    },
  });
};
