/** Pages rendered in the minimal "noir" style, with their own chrome. */
export function isNoirPath(pathname: string) {
  return (
    pathname === "/" ||
    ["/work", "/about", "/contact", "/projects"].some((p) => pathname === p || pathname.startsWith(`${p}/`))
  );
}
