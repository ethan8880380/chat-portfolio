import { highlightCode, normalizeCode } from "@/lib/highlight";
import { CopyButton } from "@/components/snippets/copy-button";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const normalized = normalizeCode(code);
  const html = await highlightCode(code, language);
  const lines = normalized.split("\n").length;

  return (
    <div className="overflow-hidden rounded-xl border border-foreground/15 bg-ink-panel text-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </span>
          <span className="truncate font-mono text-xs text-white/60">{filename}</span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">
            {language} · {lines} lines
          </span>
          <CopyButton value={normalized} />
        </div>
      </div>
      <div className="snippet-code max-h-[560px] overflow-auto px-5 py-4" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
