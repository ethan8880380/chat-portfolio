import { Header } from "@/components/sections/header";
import { ChatBot } from "@/components/ui/chat-bot";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";

export default function ChatPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 flex">
        <div className="w-full">
          <VercelV0Chat />
        </div>
      </section>
    </main>
  );
}
