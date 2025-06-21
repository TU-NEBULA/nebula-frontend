import { useUserStore } from "@/lib/zustand/user";
import { createChatSession, sendMessage } from "@/service/chat";
import { useMutation } from "@tanstack/react-query";

export const useCreateChatSession = () => {
  return useMutation({
    mutationFn: createChatSession,
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
    onError: (error) => {
      console.error("onError", error);
    },
  });
};

export const useSendMessage = () => {
  const userInfo = useUserStore((state) => state.userInfo);
  return useMutation({
    mutationFn: (props: { sessionId: string; message: string }) =>
      sendMessage({ ...props, userId: userInfo?.id || 1 }),
    onSuccess: (data) => {
      console.log("onSuccess", data);
    },
    onError: (error) => {
      console.error("onError", error);
    },
  });
};
