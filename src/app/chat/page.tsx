import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "Ask My AI",
  description:
    "Chat with a Gen AI assistant trained on Ethan Rogers' résumé and case studies.",
};

export default function ChatPage() {
  return (
    <main className="flex h-[calc(100dvh-4rem)] flex-col">
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col border-x">
        <ChatPanel />
      </div>
    </main>
  );
}
