"use client";

import { useState } from "react";

import Icon from "@/components/common/icon";
import { useGetAllChatSessions } from "@/lib/tanstack/query/chat";
import { cn } from "@repo/ui";

import Chat from "./chat";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState("");

  const { data: chatSessions } = useGetAllChatSessions();

  return (
    <div className="relative text-sm">
      <button className="rounded-lg bg-white p-2" onClick={() => setIsOpen(!isOpen)}>
        <Icon.chatBot />
      </button>
      {isOpen && (
        <div className="absolute bottom-0 right-full mr-2 flex h-96 gap-5 rounded-lg bg-white p-2 text-black">
          <ul className="flex flex-col gap-2">
            {chatSessions?.result.map((session) => (
              <li key={session.sessionId}>
                <button
                  className={cn(
                    "w-full max-w-52 truncate rounded-md p-1 text-start",
                    currentSession === session.sessionId && "bg-[#e8e8e8]"
                  )}
                  onClick={() => setCurrentSession(session.sessionId)}
                >
                  {session.title}
                </button>
              </li>
            ))}
          </ul>
          <Chat sessionId={currentSession} onSessionCreated={setCurrentSession} />
        </div>
      )}
    </div>
  );
}
