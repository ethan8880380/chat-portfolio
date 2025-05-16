import { ChatBot } from "@/components/ui/chat-bot";

export function BasiocHero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center p-6 mt-[10vh] md:mt-[20vh]">
      
        <p className="col-span-4 text-foreground text-2xl md:text-5xl font-medium text-left md:text-center mb-16 leading-[1.5] max-w-[80%] mx-auto">
            UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms
        </p>
        <div className="col-span-1"></div>
        <ChatBot className="col-span-2 mb-8 md:mb-12" />
    </div>
  );
}
