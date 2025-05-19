"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChatContextType {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  shouldExpandChat: boolean;
  setShouldExpandChat: (shouldExpand: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shouldExpandChat, setShouldExpandChat] = useState(false);

  return (
    <ChatContext.Provider value={{ 
      isChatOpen, 
      setIsChatOpen, 
      shouldExpandChat, 
      setShouldExpandChat 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
} 