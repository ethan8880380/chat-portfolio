"use client";

import { useState } from "react";
import Link from "next/link";
import { Hairline } from "@/components/noir/reveal";
import { PortalHeading } from "@/components/noir/portal-heading";

const EMAIL = "ethan0380@gmail.com";

/**
 * The footer — the site's one flourish. The block pins while you scroll and
 * the sentence pulls back out of the "o" in "good" until it settles.
 */
export function ContactBlock({ full = false }: { full?: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <section id="contact" data-inspect="Contact" className={full ? "" : "pt-32 md:pt-48"}>
      <PortalHeading
        mode={full ? "time" : "scroll"}
        lines={["Let’s make", "something good."]}
        muted={[1]}
        portal={[1, 11]}
        className="font-gserif mt-8 text-[clamp(3.25rem,10vw,10rem)] leading-[0.92] tracking-[-0.045em]"
        before={<p className="text-[13px] text-muted-foreground">Open to design technologist & UX engineering roles</p>}
        after={
          <div className="mt-12 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="font-gserif border-b border-foreground/30 pb-1 text-[clamp(1.5rem,3vw,2.5rem)] tracking-tight transition-colors hover:border-foreground"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(EMAIL).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
              }}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        }
      />

      <footer className="px-6 md:px-12">
        <Hairline />
        <div className="grid gap-6 py-8 text-[13px] text-muted-foreground md:grid-cols-3">
          <p>© {new Date().getFullYear()} Ethan Rogers — Seattle, WA</p>
          <div className="flex gap-6 md:justify-center">
            <a href="https://www.linkedin.com/in/ethan-rogers/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
            <a href="https://github.com/ethan8880380" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              GitHub
            </a>
            <a href="/ethan-rogers-resume.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
              Résumé
            </a>
          </div>
          <p className="md:text-right">
            Other views:{" "}
            <Link href="/fig" className="hover:text-foreground">
              Design file
            </Link>
            {" · "}
            <Link href="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
          </p>
        </div>
      </footer>
    </section>
  );
}
