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

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/50 px-4 py-2.5">
        <span className="truncate font-mono text-xs text-muted-foreground">
          {filename}
        </span>
        <div className="flex shrink-0 items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {language}
          </span>
          <CopyButton value={normalized} />
        </div>
      </div>
      <div
        className="snippet-code max-h-[540px] overflow-auto px-5 py-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
