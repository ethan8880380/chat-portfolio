import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { StaticHeader } from "@/components/sections/static-header";

export default function ProjectNotFound() {
  return (
    <main className="min-h-screen bg-black">
      <StaticHeader theme="dark" />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white/30 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-2">Project Not Found</h2>
            <p className="text-white/60">
              The project you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all group"
            >
              <Home className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
