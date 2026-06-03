import type { Metadata } from "next";
import { EditorialChat } from "@/components/editorial/editorial-chat";

export const metadata: Metadata = {
  title: "Ask My AI",
  description:
    "Chat with a Gen AI assistant trained on Ethan Rogers' résumé and case studies.",
};

export default function ChatPage() {
  return (
    <main className="flex min-h-[calc(100dvh-4rem)] flex-col bg-cream md:min-h-[calc(100dvh-5rem)]">
      <EditorialChat />
    </main>
  );
}
