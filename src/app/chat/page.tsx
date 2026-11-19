import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "Ask My AI",
  description: "Chat with a Gen AI assistant trained on Ethan Rogers' résumé and case studies.",
};

export default async function ChatPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const initialQuery = typeof q === "string" ? q.slice(0, 500) : undefined;

  return (
    <main className="flex h-[calc(100dvh-3.5rem)] flex-col">
      <div data-inspect="ChatPanel" className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col border-x bg-background">
        <ChatPanel key={initialQuery} initialQuery={initialQuery} />
      </div>
    </main>
  );
}
