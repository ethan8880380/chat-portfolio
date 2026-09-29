import { cn } from "@/lib/utils";

/** Crosshairs on the corners of the nearest `relative` bordered container. */
export function GridMarks({ edges = "both" }: { edges?: "top" | "bottom" | "both" }) {
  return (
    <>
      {edges !== "bottom" && (
        <>
          <span aria-hidden className={cn(MARK, "-left-[6px] -top-[6px]")} />
          <span aria-hidden className={cn(MARK, "-right-[6px] -top-[6px]")} />
        </>
      )}
      {edges !== "top" && (
        <>
          <span aria-hidden className={cn(MARK, "-bottom-[6px] -left-[6px]")} />
          <span aria-hidden className={cn(MARK, "-bottom-[6px] -right-[6px]")} />
        </>
      )}
    </>
  );
}

const MARK = "grid-mark hidden md:block";
