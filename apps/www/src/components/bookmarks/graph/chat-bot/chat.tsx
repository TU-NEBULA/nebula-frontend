"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

import Icon from "@/components/common/icon";
import { useUserInfo } from "@/hooks/use-user-info";
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
  isNewChat: boolean;
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

export default function Chat({ sessionId, onSessionCreated, isNewChat }: ChatProps) {
  const { userInfo, isLoading: isUserLoading } = useUserInfo();
  const { data: chatHistory, isLoading: isHistoryLoading } = useGetChatMessages({
    sessionId,
    isNewChat,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatFormRef = useRef<HTMLFormElement>(null);
  const startChatFormRef = useRef<HTMLFormElement>(null);

  const chatButtonDisabled = isUserLoading || isLoading;

  useEffect(() => {
    if (!isNewChat) {
      setMessages([]);
      setStreamingContent(null);
    }
  }, [sessionId, isNewChat]);

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
              if (typeof parsed.data === "object" && "session_id" in parsed.data) {
                onSessionCreated(parsed.data.session_id);
              }
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

  const onSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    if (question.trim() === "" || chatButtonDisabled || !userInfo) return;

    chatFormRef.current?.reset();
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
  };

  const onCreateSessionAndSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const question = formData.get("question") as string;
    if (!question.trim() || chatButtonDisabled || !userInfo) return;

    setMessages([{ role: "user", content: question }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userInfo.id,
          message: question,
        }),
      });
      startChatFormRef.current?.reset();
      await onStreamResponse(response);
    } catch (error) {
      console.error("Failed to create chat session or send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionId === "") {
    return (
      <div className="flex h-full w-full flex-col justify-between rounded-lg border bg-white p-4">
        <h3 className="mb-4 text-lg font-semibold">새로운 대화 시작하기</h3>
        <form
          ref={startChatFormRef}
          onSubmit={onCreateSessionAndSendMessage}
          className="flex flex-col gap-4"
        >
          <textarea
            name="question"
            placeholder="질문을 입력하세요."
            className="rounded-md border p-2 outline-none"
            rows={5}
            disabled={isUserLoading}
            required
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (!chatButtonDisabled && startChatFormRef.current) {
                  startChatFormRef.current.requestSubmit();
                }
              }
            }}
          />
          <button
            type="submit"
            className={cn(
              "flex items-center justify-center rounded-md bg-black p-2 text-white disabled:bg-gray-400",
              chatButtonDisabled && "animate-pulse"
            )}
            disabled={chatButtonDisabled}
          >
            {isLoading ? "생각 중..." : "질문하고 대화 시작"}
          </button>
        </form>
      </div>
    );
  }

  if (isHistoryLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border bg-white">
        <p className="animate-pulse">대화 기록을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-lg border bg-white">
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
        ref={chatFormRef}
        onSubmit={onSubmitQuestion}
        className="flex items-center gap-2 border-t p-2"
      >
        <textarea
          name="question"
          rows={1}
          className="max-h-24 flex-1 resize-none overflow-y-auto bg-transparent p-1 outline-none"
          placeholder="챗봇에게 질문을 적어주세요."
          disabled={chatButtonDisabled}
          onInput={(e) => {
            const target = e.currentTarget;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!chatButtonDisabled && chatFormRef.current) {
                chatFormRef.current.requestSubmit();
              }
            }
          }}
        />
        <button
          type="submit"
          className="rounded-full bg-black p-1 disabled:bg-gray-400"
          disabled={chatButtonDisabled}
        >
          <Icon.send fill="#fff" size={16} />
        </button>
      </form>
    </div>
  );
}
