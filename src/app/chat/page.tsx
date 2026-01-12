import { StaticHeader } from "@/components/sections/static-header";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";

export default function ChatPage() {
  return (
    <main className="h-screen flex flex-col bg-ink overflow-hidden">
      <StaticHeader theme="dark" />
      <section className="flex-1 flex pt-24 overflow-hidden">
        <div className="w-full h-full">
          <VercelV0Chat />
        </div>
      </section>
    </main>
  );
}
