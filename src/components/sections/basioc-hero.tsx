"use client";

import { useChatContext } from "@/context/ChatContext";
import { Button } from "../ui/button";
import Link from "next/link";

export function BasiocHero() {
  const { } = useChatContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center p-6 mt-[8vh] md:mt-[10vh]">
        <p className="col-span-3 text-foreground heading-base text-left mb-12">
            UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms
        </p>
        <div className="col-span-1"></div>
        <div className="col-span-2 mb-8 md:mb-[10vh]">
          <Button size="lg" className="mr-3">
            <Link href="/chat">
              AI Powered Chatbot
            </Link>
          </Button>
        </div>
    </div>
  );
}
