export interface ChatSessionDTO {
  sessionId: string;
  title: string;
  sessionType: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface ChatSessionListDTO {
  sessions: ChatSessionDTO[];
  total: number;
}

export interface ChatMessageDTO {
  sessionId: string;
  messages: {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt: string;
    metadata: Partial<{
      token_count: string;
      model: string;
      response_time_ms: string;
    }>;
  }[];
}
