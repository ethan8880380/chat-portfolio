"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "What's your design process?",
  "Tell me about the Analytics Hub",
  "What's your tech stack?",
  "Tell me about yourself",
];

export function EditorialChat() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const send = async (raw: string) => {
    const message = raw.trim();
    if (!message || isLoading) return;

    setValue("");
    setIsLoading(true);
    const history = messages;
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, messages: history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get response");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      const content =
        err instanceof Error
          ? err.message
          : "Sorry, I ran into an error. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(value);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        {isEmpty ? (
          <div className="mx-auto flex h-full max-w-3xl flex-col items-start justify-center px-6 py-12">
            <p className="flex items-center gap-2.5 font-inter text-xs uppercase tracking-[0.22em] text-clay">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
              Ask Ethan&apos;s AI
            </p>
            <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.1] text-espresso md:text-5xl">
              What do you want to know?
            </h2>
            <p className="mt-5 max-w-xl font-inter text-lg leading-relaxed text-espresso/60">
              A Gen AI assistant trained on my résumé and case studies. Pick a
              prompt or write your own.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  className="rounded-full border border-espresso/20 px-4 py-2 font-inter text-sm text-espresso/75 transition-colors hover:border-clay hover:text-clay"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-6 py-8">
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-espresso/10 py-6"
              >
                <p
                  className={cn(
                    "mb-2 font-inter text-xs uppercase tracking-[0.2em]",
                    m.role === "user" ? "text-espresso/45" : "text-clay"
                  )}
                >
                  {m.role === "user" ? "You" : "Ethan's AI"}
                </p>
                <p className="whitespace-pre-line font-inter text-lg leading-relaxed text-espresso/85">
                  {m.content}
                </p>
              </motion.div>
            ))}
            {isLoading && (
              <div className="py-6">
                <p className="mb-2 font-inter text-xs uppercase tracking-[0.2em] text-clay">
                  Ethan&apos;s AI
                </p>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block h-3 w-3 rounded-full bg-clay"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="border-t border-espresso/12 bg-cream/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-3xl items-end gap-3 px-6 py-4">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Ask me anything about my work, experience, or projects…"
            disabled={isLoading}
            className="min-h-[48px] flex-1 resize-none rounded-[14px] border border-espresso/20 bg-cream px-4 py-3 font-inter text-sm text-espresso placeholder:text-espresso/40 focus:border-clay focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!value.trim() || isLoading}
            aria-label="Send message"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-espresso text-cream transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
        <p className="mx-auto max-w-3xl px-6 pb-4 font-inter text-xs text-espresso/45">
          AI can make mistakes &mdash; only believe the things that make me look
          like a good candidate.
        </p>
      </form>
    </div>
  );
}
