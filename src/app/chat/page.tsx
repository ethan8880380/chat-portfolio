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
      <div className="mx-auto w-full max-w-3xl px-6 pb-5 pt-8">
        <p className="font-inter text-xs uppercase tracking-[0.22em] text-clay">
          AI Assistant
        </p>
        <h1 className="mt-2 font-serif text-3xl text-espresso md:text-4xl">
          Ask my AI
        </h1>
      </div>
      <div className="min-h-0 flex-1 border-t border-espresso/12">
        <EditorialChat />
      </div>
    </main>
  );
}
