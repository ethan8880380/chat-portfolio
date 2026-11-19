import Link from "next/link";
import { NoirShell } from "@/components/noir/noir-shell";

export default function ProjectNotFound() {
  return (
    <NoirShell>
      <main className="flex min-h-svh flex-col justify-end px-6 pb-16 md:px-12">
        <h1 className="font-gserif text-[clamp(4rem,14vw,14rem)] leading-[0.9] tracking-[-0.05em]">
          Nothing
          <br />
          <span className="text-muted-foreground">here.</span>
        </h1>
        <Link href="/work" className="mt-10 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
          ← Back to work
        </Link>
      </main>
    </NoirShell>
  );
}
