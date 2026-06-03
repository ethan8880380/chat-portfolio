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
  isError?: boolean;
}

const QUICK_PROMPTS = [
  "What's your design process?",
  "Tell me about the Analytics Hub",
  "What's your tech stack?",
  "Tell me about yourself",
];

const ERROR_MESSAGE =
  "Sorry — something went wrong on my end. Please try again in a moment, or reach out directly at ethan0380@gmail.com.";

const COMPOSER_TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1] } as const;

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
    // Only send real exchanges back as context — never the error bubbles.
    const history = messages
      .filter((m) => !m.isError)
      .map(({ role, content }) => ({ role, content }));
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, messages: history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to get response");
      const reply =
        typeof data.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : ERROR_MESSAGE;
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: ERROR_MESSAGE, isError: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {isEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2.5 font-inter text-xs uppercase tracking-[0.22em] text-clay"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-clay" aria-hidden />
            Ask Ethan&apos;s AI
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-espresso md:text-5xl"
          >
            What do you want to know?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-5 max-w-xl font-inter text-lg leading-relaxed text-espresso/60"
          >
            A Gen AI assistant trained on my résumé and case studies. Ask about
            my work, process, or projects — or start with one of these.
          </motion.p>

          <ChatComposer
            value={value}
            onChange={setValue}
            onSend={() => send(value)}
            isLoading={isLoading}
            variant="center"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-6 flex flex-wrap justify-center gap-2.5"
          >
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
          </motion.div>
        </div>
      ) : (
        <>
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
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
          </div>

          <ChatComposer
            value={value}
            onChange={setValue}
            onSend={() => send(value)}
            isLoading={isLoading}
            variant="docked"
          />
        </>
      )}
    </div>
  );
}

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  variant: "center" | "docked";
}

function ChatComposer({
  value,
  onChange,
  onSend,
  isLoading,
  variant,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow the textarea up to a max height, then let it scroll.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  }, [value]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const pill = (
    <motion.div
      layoutId="chat-composer"
      transition={COMPOSER_TRANSITION}
      className="flex w-full items-center gap-2 overflow-hidden rounded-full border border-espresso/20 bg-cream py-1.5 pl-5 pr-2 text-left shadow-[0_1px_2px_rgba(22,24,29,0.04)] transition-colors focus-within:border-clay"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask me anything about my work or projects…"
        disabled={isLoading}
        className="block max-h-[132px] flex-1 resize-none bg-transparent py-2 font-inter text-base leading-relaxed text-espresso placeholder:text-espresso/40 focus:outline-none disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        aria-label="Send message"
        className="flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full bg-espresso text-cream transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </motion.div>
  );

  if (variant === "center") {
    return (
      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-2xl">
        {pill}
      </form>
    );
  }

  return (
    <div className="px-6 pb-5 pt-2">
      <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl">
        {pill}
        <p className="mt-2 text-center font-inter text-xs text-espresso/45">
          AI can make mistakes &mdash; only believe the things that make me look
          like a good candidate.
        </p>
      </form>
    </div>
  );
}
