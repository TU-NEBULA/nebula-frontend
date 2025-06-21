import { CHAT } from "@/constants/chat";
import { getAllChatSessions, getChatMessages } from "@/service/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetChatMessages = (sessionId: string) => {
  return useQuery({
    queryKey: [CHAT.GET_CHAT_MESSAGES, sessionId],
    queryFn: () => getChatMessages(sessionId),
  });
};

export const useGetAllChatSessions = () => {
  return useQuery({
    queryKey: [CHAT.GET_ALL_CHAT_SESSIONS],
    queryFn: () => getAllChatSessions({ limit: 10, offset: 0 }),
  });
};
