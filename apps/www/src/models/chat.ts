export interface ChatSessionDTO {
  sessionId: string;
}

export interface ChatSessionListDTO {
  sessionId: string;
  title: string;
  sessionType: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface ChatMessageDTO {
  sessionId: string;
  messages: {
    id: string;
    content: string;
    role: string;
    createdAt: string;
    metadata: {
      additionalProp1: string;
      additionalProp2: string;
      additionalProp3: string;
    };
  }[];
}
