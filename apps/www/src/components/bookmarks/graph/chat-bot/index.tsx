"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Icon from "@/components/common/icon";
import { useGetAllChatSessions } from "@/lib/tanstack/query/chat";
import { ChatSessionDTO } from "@/models/chat";
import { cn, Spinner } from "@repo/ui";

import Chat from "./chat";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState("");
  const [isNewChat, setIsNewChat] = useState(true);
  const [chatListWidth, setChatListWidth] = useState(160); // w-40 = 160px
  const [isDragging, setIsDragging] = useState(false);
  const [isResizingWidth, setIsResizingWidth] = useState(false);
  const [isResizingHeight, setIsResizingHeight] = useState(false);
  const [chatBoxWidth, setChatBoxWidth] = useState(() => Math.max(window.innerWidth * 0.5, 480));
  const [chatBoxHeight, setChatBoxHeight] = useState(384);
  const chatBoxRef = useRef<HTMLDivElement>(null);

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
      if (!isDragging || !chatBoxRef.current) return;

      const containerRect = chatBoxRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;

      // 최소 128px (w-32), 최대 160px (w-40)
      const clampedWidth = Math.max(128, Math.min(containerRect.width / 3, newWidth));
      setChatListWidth(clampedWidth);
    },
    [isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  // Width resize handlers
  const onResizeWidthMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingWidth(true);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };
  const onResizeWidthMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizingWidth || !chatBoxRef.current) return;
      const box = chatBoxRef.current.getBoundingClientRect();
      const newWidth = box.right - e.clientX;
      const minWidth = 480; // 30rem
      const maxWidth = window.innerWidth * 0.5;
      setChatBoxWidth(Math.max(minWidth, Math.min(maxWidth, newWidth)));
    },
    [isResizingWidth]
  );
  const onResizeWidthMouseUp = useCallback(() => {
    setIsResizingWidth(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  // Height resize handlers
  const onResizeHeightMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingHeight(true);
    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";
  };
  const onResizeHeightMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizingHeight || !chatBoxRef.current) return;
      const box = chatBoxRef.current.getBoundingClientRect();
      const newHeight = box.bottom - e.clientY;
      const minHeight = 384; // 24rem
      const maxHeight = window.innerHeight - 40;
      setChatBoxHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
    },
    [isResizingHeight]
  );
  const onResizeHeightMouseUp = useCallback(() => {
    setIsResizingHeight(false);
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
    if (isResizingWidth) {
      document.addEventListener("mousemove", onResizeWidthMouseMove);
      document.addEventListener("mouseup", onResizeWidthMouseUp);
      return () => {
        document.removeEventListener("mousemove", onResizeWidthMouseMove);
        document.removeEventListener("mouseup", onResizeWidthMouseUp);
      };
    }
    if (isResizingHeight) {
      document.addEventListener("mousemove", onResizeHeightMouseMove);
      document.addEventListener("mouseup", onResizeHeightMouseUp);
      return () => {
        document.removeEventListener("mousemove", onResizeHeightMouseMove);
        document.removeEventListener("mouseup", onResizeHeightMouseUp);
      };
    }
  }, [isDragging, isResizingWidth, isResizingHeight]);

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
          ref={chatBoxRef}
          className="absolute bottom-0 right-full mr-2 flex gap-0 rounded-lg border border-blue-400 bg-white p-2 text-black"
          style={{
            minWidth: "30rem",
            maxWidth: "50vw",
            minHeight: "24rem",
            maxHeight: "calc(100vh - 2.5rem)",
            width: chatBoxWidth,
            height: chatBoxHeight,
            overflow: "auto",
          }}
        >
          {/* Left edge resize handle */}
          <div
            className="absolute left-0 top-0 z-20 h-full w-2 cursor-ew-resize"
            style={{ userSelect: "none" }}
            onMouseDown={onResizeWidthMouseDown}
          />
          {/* Top edge resize handle */}
          <div
            className="absolute left-0 top-0 z-20 h-2 w-full cursor-ns-resize"
            style={{ userSelect: "none" }}
            onMouseDown={onResizeHeightMouseDown}
          />
          <ul
            className="relative flex flex-col gap-2 overflow-y-auto"
            style={{ width: `${chatListWidth}px`, minWidth: "10rem", maxWidth: "16rem" }}
          >
            {isChatSessionsLoading ? (
              <div className="mx-auto flex h-full items-center justify-center">
                <Spinner small />
              </div>
            ) : (
              chatSessions?.result?.sessions.map((session: ChatSessionDTO) => (
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

          <div className="h-full min-w-0 flex-1">
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
