"use client";

import { ChatBot } from "@/components/ui/chat-bot";

export function ChatbotSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-20">
      <div className="w-full max-w-2xl px-6">
        <h1 className="text-4xl font-medium text-center mb-12 text-foreground">
          What can I help with?
        </h1>
        <ChatBot />
      </div>
    </section>
  );
} 