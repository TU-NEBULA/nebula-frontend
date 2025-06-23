import { BaseResponseDTO } from "@/models";
import { ChatMessageDTO, ChatSessionDTO, ChatSessionListDTO } from "@/models/chat";

import api from "./api";

export const createChatSession = async (body: {
  title: string;
}): Promise<BaseResponseDTO<ChatSessionDTO>> => {
  return api.post("/chat/sessions", body);
};

export const getChatMessages = async (
  sessionId: string
): Promise<BaseResponseDTO<ChatMessageDTO[]>> => {
  return api.get(`/chat/sessions/${sessionId}/messages`);
};

export const getAllChatSessions = async (params: {
  limit: number;
  offset: number;
}): Promise<BaseResponseDTO<ChatSessionListDTO[]>> => {
  return api.get(`/chat/sessions?limit=${params.limit}&offset=${params.offset}`);
};
