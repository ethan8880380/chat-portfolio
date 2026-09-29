"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUp } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatPanel() {
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
  const composer = (
    <ChatComposer
      value={value}
      onChange={setValue}
      onSend={() => send(value)}
      isLoading={isLoading}
    />
  );

  if (isEmpty)
    return (
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
        <div
          aria-hidden
          className="bg-grid absolute inset-0 bg-center [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,black,transparent)]"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative flex w-full flex-col items-center"
        >
          <motion.p
            variants={itemVariants}
            className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Ask Ethan&apos;s AI
          </motion.p>
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-balance text-4xl font-medium tracking-tighter text-foreground sm:text-5xl"
          >
            What do you want to know?
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-[52ch] text-sm text-muted-foreground sm:text-base"
          >
            A Gen AI assistant trained on my résumé and case studies. Ask about
            my work, process, or projects — or start with one of these.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-10 w-full max-w-2xl">
            {composer}
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="mt-6 flex flex-wrap justify-center gap-2"
          >
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => send(prompt)}
                className="rounded-full border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {prompt}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );

  return (
    <>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
        <ul className="divide-y">
          {messages.map((m, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "grid gap-3 px-8 py-8 md:grid-cols-12 md:gap-10 md:px-10",
                m.role === "assistant" && "bg-muted/30"
              )}
            >
              <MessageLabel role={m.role} />
              <p className="whitespace-pre-line text-base leading-relaxed text-foreground md:col-span-9">
                {m.content}
              </p>
            </motion.li>
          ))}
          {isLoading && (
            <li className="grid gap-3 bg-muted/30 px-8 py-8 md:grid-cols-12 md:gap-10 md:px-10">
              <MessageLabel role="assistant" />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mt-2 size-2 rounded-full bg-foreground md:col-span-9"
              />
            </li>
          )}
        </ul>
      </div>

      <div className="border-t px-6 pb-5 pt-4">
        <div className="mx-auto w-full max-w-2xl">
          {composer}
          <p className="mt-2 text-center font-mono text-[11px] text-muted-foreground">
            AI can make mistakes — only believe the things that make me look
            like a good candidate.
          </p>
        </div>
      </div>
    </>
  );
}

function MessageLabel({ role }: { role: Message["role"] }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground md:col-span-3">
      <span
        className={cn(
          "size-1.5 rounded-full",
          role === "user" ? "bg-foreground/40" : "bg-emerald-500"
        )}
      />
      {role === "user" ? "You" : "Ethan's AI"}
    </p>
  );
}

function ChatComposer({ value, onChange, onSend, isLoading }: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-end gap-2 rounded-lg border bg-background p-2 pl-4 text-left shadow-sm transition-colors focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask me anything about my work or projects…"
        disabled={isLoading}
        className="block max-h-[132px] flex-1 resize-none bg-transparent py-1.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 sm:text-base"
      />
      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        aria-label="Send message"
        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ArrowUp className="size-4" />
      </button>
    </form>
  );
}

const QUICK_PROMPTS = [
  "What's your design process?",
  "Tell me about the Analytics Hub",
  "What's your tech stack?",
  "Tell me about yourself",
];

const ERROR_MESSAGE =
  "Sorry — something went wrong on my end. Please try again in a moment, or reach out directly at ethan0380@gmail.com.";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

interface Message {
  role: "user" | "assistant";
  content: string;
  isError?: boolean;
}

interface ChatComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}
