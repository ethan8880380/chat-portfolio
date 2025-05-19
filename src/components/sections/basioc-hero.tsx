"use client";

import { ChatBot } from "@/components/ui/chat-bot";
import { useChatContext } from "@/context/ChatContext";

export function BasiocHero() {
  const { } = useChatContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center p-6 mt-[10vh] md:mt-[20vh]">
        {/* <div className="col-span-4 flex items-center justify-center mb-4">
          <div className='border border-blue-500 bg-blue-500/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-full w-fit just text-center'>Open to Work!</div>
        </div> */}
        <p className="col-span-4 text-foreground text-2xl md:text-5xl font-medium text-left md:text-center mb-16 leading-[1.5] max-w-[80%] mx-auto">
            UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms
        </p>
        <div className="col-span-1"></div>
        <div className="col-span-2 mb-8 md:mb-[20vh]">
          <ChatBot className="w-full" />
        </div>
    </div>
  );
}
