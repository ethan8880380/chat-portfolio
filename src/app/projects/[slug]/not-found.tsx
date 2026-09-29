import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { SiteSpacer } from "@/components/layout/site-section";
import { SiteFooter } from "@/components/layout/site-footer";

export default function ProjectNotFound() {
  return (
    <>
      <main className="flex-1">
        <PageHero
          eyebrow="Error 404"
          title="Project not found."
          description="The project you're looking for doesn't exist or has been moved."
        >
          <Button asChild size="xl">
            <Link href="/work">
              <ArrowLeft />
              Back to work
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline">
            <Link href="/">
              <Home />
              Home
            </Link>
          </Button>
        </PageHero>
        <SiteSpacer />
      </main>
      <SiteFooter />
    </>
  );
}
