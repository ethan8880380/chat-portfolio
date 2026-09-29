import { cn } from "@/lib/utils";

export function StatusDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative flex size-1.5", className)}>
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500 motion-reduce:hidden" />
      <span className="relative size-1.5 rounded-full bg-emerald-500" />
    </span>
  );
}
