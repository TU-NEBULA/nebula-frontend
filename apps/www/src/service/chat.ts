import { BaseResponseDTO } from "@/models";
import { ChatMessageDTO, ChatSessionListDTO } from "@/models/chat";
import { getParams } from "@/utils/params";

import api from "./api";

export const getChatMessages = async (
  sessionId: string
): Promise<BaseResponseDTO<ChatMessageDTO[]>> => {
  return api.get(`/chat/sessions/${sessionId}/messages`);
};

export const getAllChatSessions = async (props: {
  limit: number;
  offset: number;
}): Promise<BaseResponseDTO<ChatSessionListDTO[]>> => {
  const params = getParams(props);
  return api.get(`/chat/sessions?${params}`);
};
