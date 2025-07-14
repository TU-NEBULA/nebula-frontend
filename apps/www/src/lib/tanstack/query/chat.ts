import { CHAT } from "@/constants/chat";
import { getAllChatSessions, getChatMessages } from "@/service/chat";
import { useQuery } from "@tanstack/react-query";

export const useGetChatMessages = ({
  sessionId,
  isNewChat,
}: {
  sessionId: string;
  isNewChat: boolean;
}) => {
  return useQuery({
    queryKey: [CHAT.GET_CHAT_MESSAGES, sessionId],
    queryFn: () => getChatMessages(sessionId),
    enabled: !!sessionId && !isNewChat,
  });
};

export const useGetAllChatSessions = () => {
  return useQuery({
    queryKey: [CHAT.GET_ALL_CHAT_SESSIONS],
    queryFn: () => getAllChatSessions({ limit: 20, offset: 0 }),
  });
};
