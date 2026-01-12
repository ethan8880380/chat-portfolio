import { StaticHeader } from "@/components/sections/static-header";
import { VercelV0Chat } from "@/components/ui/v0-ai-chat";
import { EnhancedFooter } from "@/components/sections/enhanced-footer";

export default function ChatPage() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <StaticHeader theme="dark" />
      <section className="flex-1 flex pt-24">
        <div className="w-full">
          <VercelV0Chat />
        </div>
      </section>
      <EnhancedFooter />
    </main>
  );
}
