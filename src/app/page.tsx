import Link from "next/link";
import { getProjects } from "@/lib/projects-service";
import { homeSelection } from "@/lib/work-order";
import { NoirShell } from "@/components/noir/noir-shell";
import { NoirHero } from "@/components/noir/hero";
import { FeaturedProjects } from "@/components/noir/projects";
import { Statement } from "@/components/noir/statement";
import { ContactBlock } from "@/components/noir/contact-block";


export default async function Home() {
  const all = await getProjects();
  const featured = homeSelection(all);

  return (
    <NoirShell>
      <main>
        <NoirHero />
        <FeaturedProjects projects={featured} />
        {all.length > featured.length && (
          <div className="px-6 pt-24 md:px-12 md:pt-32">
            <Link href="/work" className="font-gserif text-[clamp(1.5rem,2.5vw,2.25rem)] tracking-tight text-muted-foreground transition-colors hover:text-foreground">
              All {all.length} projects →
            </Link>
          </div>
        )}
        <Statement />
        <ContactBlock />
      </main>
    </NoirShell>
  );
}
