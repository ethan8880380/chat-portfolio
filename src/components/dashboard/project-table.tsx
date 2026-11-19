"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { SmartImage } from "@/components/ui/smart-image";
import type { DashProject } from "@/lib/dashboard-data";
import { ModeDot } from "@/components/dashboard/charts";
import { cn } from "@/lib/utils";

type SortKey = "title" | "year";

export function StatusTag({ status }: { status: DashProject["status"] }) {
  const dot = {
    Delivered: "bg-[var(--dot-on)]",
    "In pilot": "bg-[var(--signal)]",
    Sunset: "border border-[var(--dot-mid)]",
  }[status];
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs text-muted-foreground">
      <span className={cn("size-1.5 rounded-full", dot)} aria-hidden />
      {status}
    </span>
  );
}

export function ProjectList({ projects, onOpen }: { projects: DashProject[]; onOpen: (slug: string) => void }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("title");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? projects.filter((p) => p.searchText.includes(q)) : projects;
    return [...filtered].sort((a, b) => (sort === "year" ? (b.year ?? 0) - (a.year ?? 0) : a.title.localeCompare(b.title)));
  }, [projects, query, sort]);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <label className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-full border bg-background px-3.5 focus-within:border-foreground/30">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>
        <div className="flex h-9 rounded-full border p-0.5">
          {(["title", "year"] as SortKey[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={sort === k}
              onClick={() => setSort(k)}
              className={cn(
                "rounded-full px-3 text-xs transition-colors",
                sort === k ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {k === "title" ? "A–Z" : "Newest"}
            </button>
          ))}
        </div>
      </div>

      <ul className="-mx-2">
        {rows.map((p) => (
          <li key={p.slug}>
            <button
              type="button"
              onClick={() => onOpen(p.slug)}
              data-inspect="ProjectRow"
              data-inspect-props={`slug="${p.slug}"`}
              className="group grid w-full grid-cols-[40px_1fr_auto] items-center gap-3.5 rounded-2xl px-2 py-2.5 text-left transition-colors hover:bg-foreground/[0.04] sm:grid-cols-[40px_1.3fr_1fr_100px_auto]"
            >
              <span className="relative size-10 overflow-hidden rounded-xl border bg-muted">
                <SmartImage
                  src={p.hero}
                  alt=""
                  sizes="40px"
                  className="object-cover object-top grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-foreground">{p.title}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ModeDot mode={p.mode} className="size-1.5" /> {p.mode}
                </span>
              </span>
              <span className="hidden truncate text-sm text-foreground/75 sm:block">{p.impact ?? <span className="text-muted-foreground/50">—</span>}</span>
              <span className="hidden sm:block">
                <StatusTag status={p.status} />
              </span>
              <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </button>
          </li>
        ))}
        {rows.length === 0 && <li className="px-2 py-8 text-center text-sm text-muted-foreground">No projects match “{query}”.</li>}
      </ul>
    </div>
  );
}

export function ProjectDrawer({ project, onClose }: { project: DashProject | null; onClose: () => void }) {
  return (
    <Sheet open={project !== null} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full overflow-y-auto border-l bg-background p-0 sm:max-w-lg">
        {project && (
          <div className="p-5">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border bg-muted">
              <SmartImage src={project.hero} alt={project.title} sizes="512px" className="object-cover object-top" />
            </div>
            <div className="space-y-6 pt-6">
              <div>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ModeDot mode={project.mode} /> {project.mode}
                </p>
                <SheetTitle className="font-gserif mt-2 text-4xl leading-tight tracking-tight">{project.title}</SheetTitle>
                <SheetDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</SheetDescription>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y py-5 text-sm">
                {[
                  ["Status", <StatusTag key="s" status={project.status} />],
                  ["Impact", project.impact ?? "—"],
                  ["Client", project.client || "—"],
                  ["Year", project.yearLabel],
                ].map(([k, v]) => (
                  <div key={String(k)}>
                    <dt className="text-xs text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
              {project.roles.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Role</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.roles.map((r) => (
                      <span key={r} className="rounded-full border px-2.5 py-1 text-xs">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {project.stack.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground">Stack</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((r) => (
                      <span key={r} className="rounded-full border px-2.5 py-1 font-mono text-[11px]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background"
              >
                Read the case study <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
