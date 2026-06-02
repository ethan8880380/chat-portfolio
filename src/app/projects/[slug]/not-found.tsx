import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { editorialButton } from "@/components/editorial/editorial-button";

export default function ProjectNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="max-w-xl text-center">
        <p className="font-inter text-xs uppercase tracking-[0.22em] text-clay">
          Error 404
        </p>
        <h1 className="mt-6 font-serif text-[clamp(3rem,12vw,8rem)] leading-none text-espresso">
          Not found
        </h1>
        <p className="mt-6 font-inter text-lg leading-relaxed text-espresso/65">
          The project you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/work" className={editorialButton({ variant: "solid" })}>
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </Link>
          <Link href="/" className={editorialButton({ variant: "outline" })}>
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
