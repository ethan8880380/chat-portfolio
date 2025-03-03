import { ChatBot } from "@/components/ui/chat-bot";

export function BasiocHero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-left justify-left p-6 mt-[20vh]">

        <p className="col-span-3 text-foreground text-5xl font-medium text-left mb-16 leading-[1.5]">
            UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms
        </p>
        <div className="col-span-1"></div>
        <ChatBot className="col-span-2" />
    </div>
  );
}
