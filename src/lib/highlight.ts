import { createHighlighter, type Highlighter } from "shiki";

const THEME = "github-light-default";
const LANGS = ["typescript", "tsx"] as const;

const LANG_ALIASES: Record<string, string> = {
  ts: "typescript",
  tsx: "tsx",
  typescript: "typescript",
  js: "typescript",
  jsx: "tsx",
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: [...LANGS],
    });
  }
  return highlighterPromise;
}

/**
 * Strips a single leading newline and trailing whitespace without touching the
 * indentation of the first line — so snippets can be authored as readable
 * multi-line template literals.
 */
export function normalizeCode(code: string): string {
  return code.replace(/^\n/, "").replace(/\n[\t ]*$/, "");
}

export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  const lang = LANG_ALIASES[language] ?? "typescript";
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(normalizeCode(code), { lang, theme: THEME });
}
