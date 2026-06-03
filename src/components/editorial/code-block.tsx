import { highlightCode, normalizeCode } from "@/lib/highlight";
import { CopyButton } from "@/components/editorial/copy-button";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const normalized = normalizeCode(code);
  const html = await highlightCode(code, language);

  return (
    <div className="overflow-hidden rounded-[14px] bg-espresso/[0.04] shadow-[0_2px_26px_-20px_rgba(22,24,29,0.45)]">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-clay" aria-hidden />
          {filename ? (
            <span className="truncate font-mono text-xs text-espresso/55">
              {filename}
            </span>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-espresso/35">
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
