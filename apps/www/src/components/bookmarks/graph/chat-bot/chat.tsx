"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import Icon from "@/components/common/icon";
import { useUserInfo } from "@/hooks/use-user-info";
import { useCreateChatSession } from "@/lib/tanstack/mutation/chat";
import { useGetChatMessages } from "@/lib/tanstack/query/chat";
import { cn } from "@repo/ui";

import DOMPurify from "dompurify";
import { marked } from "marked";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatProps {
  sessionId: string;
  onSessionCreated: (newSessionId: string) => void;
}

const AssistantMessage = memo(({ content }: { content: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(marked.parse(content) as string);
  return (
    <div
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{
        __html: sanitizedHtml,
      }}
    />
  );
});
AssistantMessage.displayName = "AssistantMessage";

export default function Chat({ sessionId, onSessionCreated }: ChatProps) {
  const { userInfo, isLoading: isUserLoading } = useUserInfo();
  const { data: chatHistory, isLoading: isHistoryLoading } = useGetChatMessages(sessionId);
  const { mutateAsync: createChatSession } = useCreateChatSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMessages([]);
    setStreamingContent(null);
  }, [sessionId]);

  useEffect(() => {
    if (chatHistory?.result && chatHistory.result.length > 0 && messages.length === 0) {
      setMessages(chatHistory.result[0].messages);
    }
  }, [chatHistory, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, isLoading]);

  const onStreamResponse = useCallback(async (response: Response) => {
    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let botResponse = "";
    setStreamingContent("");

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        setMessages((prev) => [...prev, { role: "assistant", content: botResponse }]);
        setStreamingContent(null);
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      for (const line of chunk.split("\n").filter(Boolean)) {
        if (line.trim().startsWith("data: ")) {
          try {
            const data = line.split("data: ")[1];
            if (data) {
              const parsed = JSON.parse(data);
              if (parsed.type === "chunk" && parsed.data) {
                botResponse += parsed.data;
                setStreamingContent(botResponse);
              }
            }
          } catch (error) {
            console.error("JSON parsing error:", error, "line:", line);
          }
        }
      }
    }
  }, []);

  const onSubmitQuestion = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const question = formData.get("question") as string;
      if (question.trim() === "" || isLoading || isUserLoading || !userInfo) return;

      e.currentTarget.reset();
      (e.currentTarget.querySelector("textarea") as HTMLTextAreaElement).style.height = "auto";

      setMessages((prev) => [...prev, { role: "user", content: question }]);
      setIsLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: userInfo.id, message: question, session_id: sessionId }),
        });
        await onStreamResponse(response);
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isUserLoading, userInfo, sessionId, onStreamResponse]
  );

  const onCreateSessionAndSendMessage = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const title = formData.get("title") as string;
      const question = formData.get("question") as string;
      if (!title.trim() || !question.trim() || isLoading || isUserLoading || !userInfo) return;

      setIsLoading(true);
      try {
        const newSession = await createChatSession({ title });
        const newSessionId = newSession.result.sessionId;
        onSessionCreated(newSessionId);
        setMessages([{ role: "user", content: question }]);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userInfo.id,
            message: question,
            session_id: newSessionId,
          }),
        });
        await onStreamResponse(response);
      } catch (error) {
        console.error("Failed to create chat session or send message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isUserLoading, userInfo, createChatSession, onSessionCreated, onStreamResponse]
  );

  if (sessionId === "") {
    return (
      <div className="flex w-80 max-w-lg flex-col justify-between rounded-lg border bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">새로운 대화 시작하기</h3>
        <form onSubmit={onCreateSessionAndSendMessage} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="대화 주제를 입력하세요."
            className="rounded-md border p-2 outline-none"
            disabled={isUserLoading}
            required
          />
          <textarea
            name="question"
            placeholder="첫 번째 질문을 입력하세요."
            className="rounded-md border p-2 outline-none"
            rows={5}
            disabled={isUserLoading}
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-md bg-black p-2 text-white disabled:bg-gray-400"
            disabled={isUserLoading || isLoading}
          >
            {isLoading ? "생각 중..." : "질문하고 대화 시작"}
          </button>
        </form>
      </div>
    );
  }

  if (isHistoryLoading) {
    return (
      <div className="flex h-full w-80 max-w-lg flex-col items-center justify-center rounded-lg border bg-white">
        <p className="animate-pulse">대화 기록을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-80 max-w-lg flex-col justify-between rounded-lg border bg-white">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-2 text-sm",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg p-2",
                message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              )}
            >
              {message.role === "user" ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <AssistantMessage content={message.content} />
              )}
            </div>
          </div>
        ))}
        {streamingContent && streamingContent.length > 0 && (
          <div className="flex items-start justify-start gap-2 text-sm">
            <div className="max-w-[80%] rounded-lg bg-gray-200 p-2 text-black">
              <AssistantMessage content={streamingContent} />
            </div>
          </div>
        )}
        {isLoading && !streamingContent && <div className="animate-pulse p-2">생각 중...</div>}
        <div ref={messagesEndRef} />
      </div>
      <form
        ref={formRef}
        onSubmit={onSubmitQuestion}
        className="flex items-center gap-2 border-t p-2"
      >
        <textarea
          name="question"
          rows={1}
          className="max-h-24 flex-1 resize-none overflow-y-auto bg-transparent p-1 outline-none"
          placeholder="챗봇에게 질문을 적어주세요."
          disabled={isLoading || isUserLoading}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!isLoading && formRef.current) {
                formRef.current.requestSubmit();
              }
            }
          }}
        />
        <button
          type="submit"
          className="rounded-full bg-black p-1 disabled:bg-gray-400"
          disabled={isLoading || isUserLoading}
        >
          <Icon.send fill="#fff" size={16} />
        </button>
      </form>
    </div>
  );
}
