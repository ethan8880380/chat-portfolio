import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function ProjectNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/work">
            <Button variant="default" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="group">
              <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 