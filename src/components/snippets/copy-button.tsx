"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1800);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail silently.
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={isCopied ? "Copied to clipboard" : "Copy code"}
      className={cn(
        "flex items-center gap-1.5 text-xs transition-colors",
        isCopied ? "text-emerald-600" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {isCopied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {isCopied ? "Copied" : "Copy"}
    </button>
  );
}
