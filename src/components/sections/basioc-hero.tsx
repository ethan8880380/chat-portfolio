"use client";

import { useChatContext } from "@/context/ChatContext";
import { Button } from "../ui/button";
import Link from "next/link";

export function BasiocHero() {
  const { } = useChatContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center p-4 sm:p-6 mt-[5vh] sm:mt-[8vh] md:mt-[10vh]">
        <p className="col-span-1 md:col-span-3 text-foreground text-left text-lg text-2xl md:text-5xl mb-8 sm:mb-12">
            UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms
        </p>
        <div className="hidden md:block md:col-span-1"></div>
        <div className="col-span-1 md:col-span-2 mb-6 sm:mb-8 md:mb-[10vh] w-full">
          <Button size="lg" className="w-full sm:w-auto">
            <Link href="/chat" className="w-full text-sm sm:text-base">
              AI Powered Chatbot
            </Link>
          </Button>
        </div>
    </div>
  );
}
