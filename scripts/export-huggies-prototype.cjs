// Re-export the Huggies 2.0 prototype into public/prototypes.
//
// The prototype lives in the (private) KC UX website repo and runs on React 19 +
// Tailwind 4, so instead of porting its source we compile it there with its own
// toolchain as a static export and copy the built pages in. Nothing is written
// into the website repo: the build happens in a temp folder that borrows its
// node_modules through a junction (Windows).
//
//   WEBSITE_DIR=C:/path/to/website node scripts/export-huggies-prototype.cjs
//
// Exports the bare v2 site ("embed") for Huggies, Pull-Ups and Depend under
// basePath /prototypes; next.config rewrites clean URLs to the .html files.
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SRC = (process.env.WEBSITE_DIR || "C:/Users/ethan0/Documents/code/website").split(path.sep).join("/");
const APP = path.join(require("os").tmpdir(), "huggies-2-export");
const DEST = path.join(__dirname, "..", "public", "prototypes");
const BASE = "/prototypes";

const entries = [
  "app/brand-sites/huggies-2/embed/layout.tsx",
  "app/brand-sites/huggies-2/embed/page.tsx",
  "app/brand-sites/huggies-2/embed/[...page]/page.tsx",
  "app/brand-sites/pull-ups-2/embed/layout.tsx",
  "app/brand-sites/pull-ups-2/embed/page.tsx",
  "app/brand-sites/pull-ups-2/embed/[...page]/page.tsx",
  "app/brand-sites/depend-2/embed/layout.tsx",
  "app/brand-sites/depend-2/embed/page.tsx",
  "app/brand-sites/depend-2/embed/[...page]/page.tsx",
  "app/globals.css",
  "lib/utils.ts",
];

// --- collect the local import graph ---------------------------------------
const exts = ["", ".tsx", ".ts", ".css", "/index.tsx", "/index.ts"];
const seen = new Set();
function resolve(from, spec) {
  let base;
  if (spec.startsWith("@/")) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith(".")) base = path.join(path.dirname(from), spec);
  else return null;
  for (const e of exts) if (fs.existsSync(base + e) && fs.statSync(base + e).isFile()) return base + e;
  return null;
}
function walk(file) {
  const rel = path.relative(SRC, file).replace(/\\/g, "/");
  if (seen.has(rel)) return;
  seen.add(rel);
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/(?:import|export)[^"']*?from\s*["']([^"']+)["']|import\s*["']([^"']+)["']|@import\s+["']([^"']+)["']/g)) {
    const r = resolve(file, m[1] || m[2] || m[3]);
    if (r) walk(r);
  }
}
entries.forEach((e) => walk(path.join(SRC, e)));

// --- fresh app dir ----------------------------------------------------------
fs.rmSync(path.join(APP, "app"), { recursive: true, force: true });
fs.rmSync(path.join(APP, "components"), { recursive: true, force: true });
fs.rmSync(path.join(APP, "lib"), { recursive: true, force: true });
fs.rmSync(path.join(APP, "out"), { recursive: true, force: true });
fs.rmSync(path.join(APP, ".next"), { recursive: true, force: true });
fs.mkdirSync(APP, { recursive: true });
for (const rel of seen) {
  const to = path.join(APP, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(path.join(SRC, rel), to);
}
// Public assets the site references.
for (const a of ["brand-site/huggies-logo.png", "brand-site/little-snugglers-pack.png"]) {
  const to = path.join(APP, "public", a);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(path.join(SRC, "public", a), to);
}

// --- patches for a static export --------------------------------------------
const patch = (rel, from, to) => {
  const f = path.join(APP, rel);
  const s = fs.readFileSync(f, "utf8").replace(/\r\n/g, "\n");
  if (!s.includes(from)) throw new Error(`patch target not found in ${rel}: ${from}`);
  fs.writeFileSync(f, s.replace(from, to));
};

// Server pages can't read the query string in a static export: pass none, and
// let the two client components that use it read it from the URL instead.
for (const brand of ["huggies-2", "pull-ups-2", "depend-2"]) {
  const page = `app/brand-sites/${brand}/embed/[...page]/page.tsx`;
  patch(page, "  searchParams: Promise<Record<string, string | string[] | undefined>>\n", "");
  patch(page, "({ params, searchParams }", "({ params }");
  patch(page, "searchParams={await searchParams}", "searchParams={{}}");
}

fs.writeFileSync(
  path.join(APP, "lib/url-param.ts"),
  `"use client"
import { useSyncExternalStore } from "react"
const noop = () => () => {}
/** A query-string value, read in the browser (static export has no server query). */
export function useUrlParam(name: string): string | undefined {
  return useSyncExternalStore(noop, () => new URLSearchParams(window.location.search).get(name) ?? undefined, () => undefined)
}
`
);
patch(
  "components/brand-site-v2/pages/listing.tsx",
  "  const need = pages.needs.find((entry) => entry.id === initialNeed);",
  "  const urlNeed = useUrlParam(\"need\");\n  const need = pages.needs.find((entry) => entry.id === (initialNeed ?? urlNeed));"
);
patch("components/brand-site-v2/pages/listing.tsx", '"use client";\n', '"use client";\nimport { useUrlParam } from "@/lib/url-param";\n');
patch(
  "components/brand-site-v2/pages/search.tsx",
  "  const [submitted, setSubmitted] = useState(initialQuery);",
  "  const [submitted, setSubmitted] = useState(initialQuery);\n  const urlQuery = useUrlParam(\"q\");\n  useEffect(() => {\n    if (!initialQuery && urlQuery) {\n      setDraft(urlQuery);\n      setSubmitted(urlQuery);\n    }\n  }, [initialQuery, urlQuery]);"
);
patch("components/brand-site-v2/pages/search.tsx", '"use client";\n', '"use client";\nimport { useEffect } from "react";\nimport { useUrlParam } from "@/lib/url-param";\n');

// The brand-sites segment layout carries the brand colour tokens. Keep the
// stylesheet; drop its light-theme helper (no theme provider here, so it's light).
fs.copyFileSync(path.join(SRC, "app/brand-sites/brand-tokens.css"), path.join(APP, "app/brand-sites/brand-tokens.css"));
fs.writeFileSync(
  path.join(APP, "app/brand-sites/layout.tsx"),
  `import type { ReactNode } from "react"
import "./brand-tokens.css"

export default function BrandSitesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
`
);

// Plain image paths don't get the basePath; point them under it.
patch("lib/brand-site/brand-modes.ts", '"/brand-site/huggies-logo.png"', `"${BASE}/brand-site/huggies-logo.png"`);
patch("components/brand-site/product-pack.tsx", '"/brand-site/little-snugglers-pack.png"', `"${BASE}/brand-site/little-snugglers-pack.png"`);

// Root layout: the site's fonts and global CSS — no analytics, no theme provider.
fs.writeFileSync(
  path.join(APP, "app/layout.tsx"),
  `import type { Metadata } from "next"
import { JetBrains_Mono, Outfit } from "next/font/google"
import "./globals.css"

const outfit = Outfit({ subsets: ["latin"], display: "swap", variable: "--font-outfit" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains-mono" })

export const metadata: Metadata = { title: "Huggies 2.0 — prototype", robots: { index: false } }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${outfit.variable} \${jetbrainsMono.variable} antialiased font-sans\`}>
      <body>{children}</body>
    </html>
  )
}
`
);

// --- project config -----------------------------------------------------------
fs.writeFileSync(
  path.join(APP, "next.config.mjs"),
  `export default { output: "export", basePath: "${BASE}", images: { unoptimized: true }, typescript: { ignoreBuildErrors: false } }\n`
);
fs.copyFileSync(path.join(SRC, "postcss.config.mjs"), path.join(APP, "postcss.config.mjs"));
const tsconfig = JSON.parse(fs.readFileSync(path.join(SRC, "tsconfig.json"), "utf8"));
tsconfig.include = ["next-env.d.ts", "**/*.ts", "**/*.tsx"];
tsconfig.exclude = ["node_modules", "out"];
fs.writeFileSync(path.join(APP, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));
const pkg = JSON.parse(fs.readFileSync(path.join(SRC, "package.json"), "utf8"));
fs.writeFileSync(
  path.join(APP, "package.json"),
  JSON.stringify({ name: "huggies-2-export", private: true, dependencies: pkg.dependencies, devDependencies: pkg.devDependencies }, null, 2)
);
// Borrow the website's installed packages through a junction (no install).
if (!fs.existsSync(path.join(APP, "node_modules"))) {
  execSync(`cmd /c mklink /J "${path.join(APP, "node_modules")}" "${path.join(SRC, "node_modules")}"`, { stdio: "inherit" });
}
console.log(`prepared ${seen.size} source files in ${APP}`);

// --- build (Next may stop once to print an upgrade notice; retry once) --------
const build = () => {
  try {
    execSync("npx next build --webpack", { cwd: APP, stdio: "inherit" });
  } catch {}
  return fs.existsSync(path.join(APP, "out", "brand-sites"));
};
if (!build() && !build()) throw new Error("static export failed — see the build output above");

// --- copy into the portfolio ---------------------------------------------------
fs.rmSync(DEST, { recursive: true, force: true });
for (const dir of ["_next", "brand-site", "brand-sites"]) {
  fs.cpSync(path.join(APP, "out", dir), path.join(DEST, dir), { recursive: true });
}
console.log(`copied export to ${DEST}`);
