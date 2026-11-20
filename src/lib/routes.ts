/**
 * In production the router can report the prerendered home page as "/index"
 * (and other pages with a trailing "/index"). Normalize before comparing.
 */
export function normalizePath(pathname: string | null | undefined) {
  const p = (pathname ?? "/").replace(/\/index$/, "").replace(/\/+$/, "");
  return p === "" ? "/" : p;
}

/** Pages rendered in the minimal "noir" style, with their own chrome. */
export function isNoirPath(pathname: string | null | undefined) {
  const p = normalizePath(pathname);
  return p === "/" || ["/work", "/about", "/contact", "/projects"].some((r) => p === r || p.startsWith(`${r}/`));
}
