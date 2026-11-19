"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  ArrowUpRight,
  Copy,
  FileText,
  Frame,
  Home,
  LayoutDashboard,
  Layers,
  Mail,
  ScanLine,
  Sparkles,
  SquareCode,
  User,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useStudio } from "@/components/studio/studio-provider";

const EMAIL = "ethan0380@gmail.com";

const PAGES = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work — all projects", href: "/work", icon: Layers },
  { label: "Snippets — code I'm proud of", href: "/snippets", icon: SquareCode },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Dashboard view", href: "/dashboard", icon: LayoutDashboard },
  { label: "Design file view", href: "/fig", icon: Frame },
];

const itemClass =
  "group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/80 aria-selected:bg-sel aria-selected:text-white [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground aria-selected:[&_svg]:text-white";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted-foreground";

export interface CommandProject {
  slug: string;
  title: string;
  year: string;
  keywords: string;
}

export function CommandMenu({ projects }: { projects: CommandProject[] }) {
  const { commandOpen, setCommandOpen, toggleInspect, inspect } = useStudio();
  const [search, setSearch] = useState("");
  const [flash, setFlash] = useState<string | null>(null);
  const router = useRouter();

  const run = (fn: () => void) => {
    setCommandOpen(false);
    setSearch("");
    fn();
  };

  const ask = (q: string) => run(() => router.push(`/chat?q=${encodeURIComponent(q)}`));

  return (
    <Dialog open={commandOpen} onOpenChange={setCommandOpen}>
      <DialogContent className="max-w-xl gap-0 overflow-hidden border-foreground/15 bg-card p-0 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] [&>button]:hidden">
        <DialogTitle className="sr-only">Command menu</DialogTitle>
        <Command loop className="flex flex-col">
          <div className="flex items-center gap-3 border-b px-4">
            <Sparkles className="size-4 shrink-0 text-hot" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Jump anywhere, or ask my AI a question…"
              className="h-14 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
              Nothing matched — hit enter to ask my AI instead.
            </Command.Empty>

            {search.trim() && (
              <Command.Group heading="Ask" className={groupClass} forceMount>
                <Command.Item
                  forceMount
                  value={`__ask ${search}`}
                  onSelect={() => ask(search.trim())}
                  className={itemClass}
                >
                  <Sparkles />
                  <span className="truncate">
                    Ask Ethan&apos;s AI: <span className="font-medium">&ldquo;{search.trim()}&rdquo;</span>
                  </span>
                  <span className="ml-auto font-mono text-[10px] opacity-60">↵</span>
                </Command.Item>
              </Command.Group>
            )}

            <Command.Group heading="Pages" className={groupClass}>
              {PAGES.map((p) => (
                <Command.Item key={p.href} value={p.label} onSelect={() => run(() => router.push(p.href))} className={itemClass}>
                  <p.icon />
                  {p.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Projects" className={groupClass}>
              {projects.map((p) => (
                <Command.Item
                  key={p.slug}
                  value={`${p.title} ${p.keywords}`}
                  onSelect={() => run(() => router.push(`/projects/${p.slug}`))}
                  className={itemClass}
                >
                  <Frame />
                  <span className="truncate">{p.title}</span>
                  <span className="ml-auto font-mono text-[10px] opacity-60">{p.year}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group heading="Actions" className={groupClass}>
              <Command.Item value="inspect blueprint mode redlines" onSelect={() => run(toggleInspect)} className={itemClass}>
                <ScanLine />
                {inspect ? "Exit inspect mode" : "Inspect mode — see the redlines"}
                <kbd className="ml-auto font-mono text-[10px] opacity-60">I</kbd>
              </Command.Item>
              <Command.Item
                value="copy email address"
                onSelect={() => {
                  navigator.clipboard?.writeText(EMAIL).catch(() => {});
                  setFlash("Email copied");
                  setTimeout(() => setFlash(null), 1400);
                }}
                className={itemClass}
              >
                <Copy />
                {flash ?? "Copy email address"}
              </Command.Item>
              <Command.Item
                value="resume cv download pdf"
                onSelect={() => run(() => window.open("/ethan-rogers-resume.pdf", "_blank", "noopener"))}
                className={itemClass}
              >
                <FileText />
                Open résumé (PDF)
                <ArrowUpRight className="ml-auto" />
              </Command.Item>
              <Command.Item
                value="linkedin"
                onSelect={() => run(() => window.open("https://www.linkedin.com/in/ethan-rogers/", "_blank", "noopener"))}
                className={itemClass}
              >
                <ArrowUpRight />
                LinkedIn
              </Command.Item>
              <Command.Item
                value="github"
                onSelect={() => run(() => window.open("https://github.com/ethan8880380", "_blank", "noopener"))}
                className={itemClass}
              >
                <ArrowUpRight />
                GitHub
              </Command.Item>
            </Command.Group>
          </Command.List>
          <div className="flex items-center justify-between border-t px-4 py-2 font-mono text-[10px] text-muted-foreground">
            <span>↑↓ navigate · ↵ select</span>
            <span>ethan-rogers.fig</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
