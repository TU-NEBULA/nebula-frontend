"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Icon from "@/components/common/icon";
import { useGetAllChatSessions } from "@/lib/tanstack/query/chat";
import { ChatSessionListDTO } from "@/models/chat";
import { cn, Spinner } from "@repo/ui";

import Chat from "./chat";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState("");
  const [isNewChat, setIsNewChat] = useState(true);
  const [chatListWidth, setChatListWidth] = useState(160); // w-40 = 160px
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const { data: chatSessions, isLoading: isChatSessionsLoading } = useGetAllChatSessions();

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !dragRef.current) return;

      const containerRect = dragRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;

      // 최소 128px (w-32), 최대 160px (w-40)
      const clampedWidth = Math.max(128, Math.min(160, newWidth));
      setChatListWidth(clampedWidth);
    },
    [isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  // 마우스 이벤트 리스너 등록
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }
  }, [isDragging, onMouseMove, onMouseUp]);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  return (
    <div className="relative text-sm">
      <button className="rounded-lg bg-white p-2" onClick={() => setIsOpen(!isOpen)}>
        <Icon.chatBot />
      </button>
      {isOpen && (
        <div
          ref={dragRef}
          className="absolute bottom-0 right-full mr-2 flex h-96 w-[42rem] gap-0 rounded-lg border border-blue-400 bg-white p-2 text-black"
        >
          <ul
            className="relative flex flex-col gap-2 overflow-y-auto"
            style={{ width: `${chatListWidth}px` }}
          >
            {isChatSessionsLoading ? (
              <div className="mx-auto flex h-full items-center justify-center">
                <Spinner small />
              </div>
            ) : (
              chatSessions?.result?.map((session: ChatSessionListDTO) => (
                <li key={session.sessionId}>
                  <button
                    className={cn(
                      "w-full truncate rounded-md p-1 text-start",
                      currentSession === session.sessionId && "bg-[#e8e8e8]"
                    )}
                    onClick={() => {
                      setCurrentSession(session.sessionId);
                      setIsNewChat(false);
                    }}
                  >
                    {session.title}
                  </button>
                </li>
              ))
            )}
            <button
              type="submit"
              className="sticky bottom-0 flex justify-center rounded-md bg-black py-2"
              onClick={() => {
                setCurrentSession("");
                setIsNewChat(true);
              }}
            >
              <Icon.plus fill="#fff" />
            </button>
          </ul>

          <div
            className="relative mx-2 w-2 cursor-col-resize bg-gray-200 transition-colors hover:bg-blue-300"
            onMouseDown={onMouseDown}
          >
            <div className="absolute left-1/2 top-1/2 h-12 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400 transition-colors hover:bg-blue-500" />
          </div>

          <div className="min-w-0 flex-1">
            <Chat
              sessionId={currentSession}
              onSessionCreated={setCurrentSession}
              isNewChat={isNewChat}
            />
          </div>
        </div>
      )}
    </div>
  );
}
