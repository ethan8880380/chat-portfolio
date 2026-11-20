import type { ProjectData } from "@/data/projects";

const IMG = "/projectImages/projectContent";

const irisShowcase: ProjectData["showcase"] = {
  label: "The website",
  body: "IRIS also has a front door: a site where commercial teams discover what the platform can do, learn it at their own pace, and request access. It sits on the same design language as the product it introduces, so moving from the site into the app feels like one experience.",
  images: [
    { src: `${IMG}/iris-site-home.png`, width: 2880, height: 1800, title: "Home", caption: "IRIS as a decision copilot, with a live carousel of its capabilities.", wide: true },
    { src: `${IMG}/iris-site-capabilities.png`, width: 2880, height: 1800, title: "Capabilities", caption: "Every capability in one library, filterable by analytics type, data source and team." },
    { src: `${IMG}/iris-site-training.png`, width: 2880, height: 1800, title: "Training", caption: "Tutorials, documentation and release notes for every capability." },
    { src: `${IMG}/iris-site-about.png`, width: 2880, height: 1800, title: "About", caption: "What IRIS is and who it serves." },
    { src: `${IMG}/iris-app-post-event.png`, width: 2880, height: 1800, title: "Post Event Analyzer", caption: "Inside the app: how each promotion performed, with unit lift, trade spend and margin per event." },
    { src: `${IMG}/iris-app-pea-cleansing.png`, width: 2880, height: 1800, title: "PEA Cleansing", caption: "A guided step for reviewing and overriding volume before the results are used.", wide: true },
  ],
};

/**
 * Additions for projects whose main content lives elsewhere (Notion or the
 * static data), merged in by slug.
 */
export const projectExtras: Record<string, Partial<ProjectData>> = {
  iris: { showcase: irisShowcase },
  "iris-analytics": { showcase: irisShowcase },
};

/**
 * Projects that live in code rather than Notion. The projects service merges
 * these into whatever Notion returns (and into the static fallback), so they
 * show up everywhere — home, /work, project pages, ⌘K and the dashboard.
 * A local project with the same slug as a Notion page replaces it.
 */
export const localProjects: ProjectData[] = [
  {
    id: 100,
    slug: "huggies-2",
    title: "Huggies 2.0",
    shortDescription:
      "A phone-first, editorial rebuild of the Huggies site. One content model and the design system's brand modes run Huggies, Pull-Ups and Depend from the same code.",
    fullDescription:
      "Huggies 2.0 is a coded prototype of the next Kimberly-Clark consumer brand site. It keeps the original site's content and modules, but rebuilds the experience phone-first, in a calmer, type-led editorial layout. Because it reads the same content model and the same Figma brand modes as the enterprise design system, one codebase renders Huggies, Pull-Ups and Depend — switching brand swaps fonts, palette, imagery and products without touching a component.",
    // The live prototype is the visual; the hero image is only the social-share preview.
    images: { hero: "/projectImages/desktop/huggies-2.jpg" },
    prototype: {
      variants: [
        { label: "Huggies", src: "/prototypes/brand-sites/huggies-2/embed", domain: "huggies.com" },
        { label: "Pull-Ups", src: "/prototypes/brand-sites/pull-ups-2/embed", domain: "pull-ups.com" },
        { label: "Depend", src: "/prototypes/brand-sites/depend-2/embed", domain: "depend.com" },
      ],
    },
    process: {
      body:
        "Before any pixels, I mapped the site around the decisions parents actually make. The research was blunt: under 1% of visits reached a retailer with the right diaper, 85% of traffic was mobile, and today's \"Buy Online\" flow took six or seven clicks. So the brief became a path — discover, evaluate, compare, choose, purchase — and three mindsets to design for: the Value Validator (\"Is it worth buying?\"), the Product Fit Evaluator (\"Which one suits my baby?\") and the Confidence Seeker (\"Am I making a good choice?\").\n\nI wireframed fifteen phone screens in the enterprise design system's unbranded base, so the structure was argued on its own before brand styling arrived. Every screen carries numbered annotations — the user need, the design response and the next step — and a short set of principles kept them honest: one primary action per screen, price and best-for on every product, one consistent way to buy, bottom sheets instead of new pages, and no dead ends. A connected-flows board then proved the system: five journeys, each reaching a retailer in three or four steps through the same shared patterns. From there the homepage went through two hi-fi passes in Figma before I built it in code.",
      boards: [
        {
          src: "/projectImages/projectContent/huggies-wf-overview.png",
          width: 1848,
          height: 1428,
          title: "Overview",
          caption: "The decision path, three shopper mindsets, design principles and the research signals behind them.",
          wide: true,
        },
        {
          src: "/projectImages/projectContent/huggies-wf-finder.png",
          width: 1762,
          height: 1124,
          title: "03 · Find the right diaper",
          caption: "Baby, then priorities, then one clear best match. Three taps, one question at a time.",
        },
        {
          src: "/projectImages/projectContent/huggies-wf-product.png",
          width: 1762,
          height: 1328,
          title: "06 · Product detail",
          caption: "Everything needed to decide sits above the fold.",
        },
        {
          src: "/projectImages/projectContent/huggies-wf-retailer.png",
          width: 1254,
          height: 1152,
          title: "08 · Retailer selection",
          caption: "One retailer sheet replaces a six-click buy flow: size, then store, then shop.",
        },
        {
          src: "/projectImages/projectContent/huggies-wf-ask.png",
          width: 1324,
          height: 1180,
          title: "11 · Ask Huggies",
          caption: "Quick help from any screen, where every answer ends in a product or a store.",
        },
        {
          src: "/projectImages/projectContent/huggies-wf-flows.png",
          width: 1848,
          height: 1128,
          title: "12 · Connected user flows",
          caption: "Five journeys, one system. Every primary task reaches a retailer in three or four steps.",
          wide: true,
        },
      ],
      progression: {
        title: "Wireframe to hi-fi",
        caption: "The homepage's first two screens across three passes: the annotated wireframe, a first brand pass, and the calmer editorial direction that shipped in code.",
        stages: [
          { src: "/projectImages/projectContent/huggies-evo-1.png", width: 390, height: 1688, title: "Wireframe" },
          { src: "/projectImages/projectContent/huggies-evo-2.png", width: 390, height: 1688, title: "Hi-fi, first pass" },
          { src: "/projectImages/projectContent/huggies-evo-3.png", width: 390, height: 1688, title: "Hi-fi, final direction" },
        ],
      },
    },
    tags: ["Consumer Brand", "Prototype", "Design Systems", "Mobile-first"],
    year: "2026",
    client: "Kimberly-Clark",
    role: ["UX Design", "Interaction Design", "Front-end Development"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion", "Figma Variables"],
    challenges:
      "Parents on a phone have one job: find the right diaper, in the right size, and somewhere to buy it. A credible v2 had to prove three things at once — that the same content could feel far more focused at phone width, that the full shopping path still worked end to end, and that one design could stretch across brands with very different fonts, colors and product lines without forking the code.",
    solution:
      "I kept the original information architecture and content object, and redesigned how it reads. The homepage is mostly air: a large centred headline whose words land out of a soft blur, two clear actions, and a photograph that opens like a curtain. A size finder lets parents drag a weight slider while the pack grows to match, and the size they pick carries straight into \"Ready to buy\" further down the page. Ticking two or more products raises a compare tray that opens a side-by-side sheet showing only the specs that differ.\n\nBehind the homepage sits the rest of the path, built in the same language — listing with filter chips, search, a product page decided above the fold, a quiz that goes from baby to priorities to one best match, reviews framed as \"Is it good?\", offers and where to buy — all reachable from a floating menu dock, with pages sliding in from the side as you move forward. Brand identity comes from the \"Brand\" variable collection in the NA Enterprise Design System Figma file, exposed as tokens, so each product and tile can be tinted from its brand's own palette. For reviews, the site runs inside a phone mockup with a brand switcher and page picker, so stakeholders see it at real phone width.",
    results:
      "The prototype runs all three brands from one codebase and covers the whole journey from first visit to retailer hand-off: homepage, listing, search, product, compare, quiz, reviews, offers and where to buy. It turns the v2 conversation from static mockups into something people can hold in their hand, and shows the design system's brand modes doing real work in production-grade code.",
    color: "bg-red-500",
    featured: false,
  },
  {
    id: 101,
    slug: "iris-tpo",
    title: "IRIS TPO",
    shortDescription:
      "Scenario planning for a year of retail promotions. Planners branch scenarios, edit them on a live 52-week calendar, and see what every change is worth before choosing the plan to back.",
    fullDescription:
      "IRIS TPO (Trade Plan Optimizer) helps Kimberly-Clark's commercial planners build a retailer's promotion plan for the year. Behind it sit price-sensitivity models, a 52-week calendar, dozens of product groups and millions of dollars of trade spend. I designed and built the whole product as a working prototype around two ideas — scenario planning and a promo calendar you can read at a glance — with one goal throughout: make complex data easy to understand, so a planner can see what changed, why it matters, and what to do next without having to read a spreadsheet.",
    images: {
      hero: "/projectImages/desktop/iris-tpo-hero.png",
      gallery: [
        "/projectImages/projectContent/tpo-q1-recommendations.png",
        "/projectImages/projectContent/tpo-live-simulation.png",
        "/projectImages/projectContent/tpo-year-roi.png",
        "/projectImages/projectContent/tpo-q1-tactic.png",
        "/projectImages/projectContent/tpo-library.png",
        "/projectImages/projectContent/tpo-compare-scenarios.png",
      ],
    },
    tags: ["Enterprise", "Analytics", "Data Visualization", "Prototype"],
    year: "2026",
    client: "Kimberly-Clark",
    role: ["UX Design", "Interaction Design", "Front-end Development"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts", "Motion"],
    challenges:
      "Trade promotion planning is dense by nature. One plan covers a retailer for a whole year: 100+ promotional events across sixteen product groups, each with a depth, price, timing, lift, redemption rate and fees, all feeding revenue, profit, ROI and a trade budget. Planners don't make one plan, they weigh several — today's baseline, what the optimizer recommends, and their own variations — and until now that comparison lived in spreadsheets. They needed to try ideas without losing track of where each version came from, see a year of events as a shape rather than a list, and walk into an approval meeting able to explain why one scenario beat another.",
    solution:
      "Scenario planning is the spine of the product. Every plan starts from a read-only Original Scenario, the baseline everything is measured against. An optimization branches an Optimized Scenario from it, and planners branch Simulations from either. The scenario library nests them by lineage, so you can always see what a version was built from, and every revenue, profit, spend and ROI figure carries its change against the baseline. A simulation measures itself against its parent: edit depth, price, timing, inclusion, lift or fees and the live impact updates instantly, a condensed impact bar stays pinned as you scroll, and a changes drawer lists every edit with its own impact and an undo. Each event is tagged as an earner or a burner against the trade budget, so the trade-off shows up at the row, not just in a total. A one-line guide on every plan page shows which of four steps you're on and the one button that moves you forward.\n\nThe promo calendar turns the year into a picture. Every product group is a row across 52 fiscal weeks, and every event is a bar you can recolour by what you're asking: the optimizer's recommendation (deeper, shallower, hold, locked, removed), discount depth, promo strength by ROI, or tactic. Coloured by ROI, a year of events becomes a heat map: weak promotions glow red and strong ones deepen to teal, so the events worth pausing jump out without reading a number. Edited events are outlined, excluded ones dashed, and committed weeks are frozen and locked. The calendar is editable, not just a view — drag an event to move it, drag an edge to resize it, and it snaps to whole fiscal weeks and stops at its neighbours — and the same edits flow back into the grid and the live impact. You can zoom to any quarter, and the colour choice is kept in the URL so a shared link opens on the same view.\n\nThe compare view closes the loop. Planners pick two to four scenarios and a baseline, and the decision comes first: a recommendation card with the suggested scenario, an optional note for approvers and one Save button. A KPI matrix tags the leader on each metric, and a gains-and-losses summary spells out what each scenario wins and gives up. Every screen also carries built-in design notes (purpose, layout, components, MVP versus future), so the prototype doubles as the hand-off spec.",
    results:
      "IRIS TPO went from Figma frames to a product stakeholders can click through end to end, from opening a plan to saving the recommended scenario. Scenario lineage and the colour-coded calendar let planners compare versions of a full-year plan without opening a spreadsheet, and every recommendation arrives with its reason and its price attached. Writing the design notes into the product kept MVP and future scope explicit, and gave engineering a living spec instead of a slide deck.",
    color: "bg-blue-500",
    featured: false,
  },
  {
    // Overrides the Notion / static entry with the same slug (see projects-service).
    id: 0,
    slug: "commercial-analytics-hub",
    title: "Commercial Analytics Hub",
    shortDescription:
      "GDUSA Award-winning analytics hub for Kimberly-Clark's North American commercial teams, used by 1,000+ people every week. Version 2 turns the site into a platform: tools, training and an academy on the front, and an admin console on Azure SQL so the team can run it without a developer.",
    fullDescription:
      "The Commercial Analytics Hub is the front door to Kimberly-Clark's commercial data: Power BI dashboards, self-service workbooks, training and an AI chatbot in one place. Version 1 replaced a cluttered SharePoint site and won a GDUSA award. Version 2 rebuilt it as a content-managed platform: every tool, alert, event, survey, training and resource now lives in Azure SQL and is edited through an admin console I designed and built.",
    images: {
      hero: "/projectImages/desktop/comm-v2-hero.png",
      gallery: [
        "/projectImages/projectContent/comm-v2-tools.png",
        "/projectImages/projectContent/comm-v2-release-video.jpg",
        "/projectImages/projectContent/comm-2.png",
        "/projectImages/projectContent/comm-1.png",
      ],
    },
    process: {
      body:
        "Version 2 started from one bottleneck: me. Every new dashboard, broken-report notice, webinar or training video was a code change and a deploy, so the site always lagged the team that owned the content. The answer was to move the content out of the code and give the analytics team their own tools to run it.\n\nI modelled each content type as an Azure SQL table that mirrors its TypeScript type, then built every admin area on the same pattern: API routes call a small server module, the module talks to SQL, and if the database can't be reached the module falls back to an in-memory store seeded from the original static data. Local development runs with no database at all, an outage degrades to read-only content instead of a blank page, and a script generates SQL seed files from the TypeScript data so a fresh database can be rebuilt end to end. Okta handles sign-in; a superadmin tab decides who sees the admin shield and which tabs each person can use.\n\nThe console is designed for people who don't think in forms. Every edit shows its result before it's saved: the tool editor renders the live card, the alert editor renders the alert strip, and a Tools-page preview shows the whole public page with unsaved changes applied. Tables are editable cell by cell (click the main link to change where a card sends people), a Needs attention column flags tools missing a link, description or filters, and plain-language help sits next to every field that needs it.",
      boards: [
        {
          src: "/projectImages/projectContent/comm-v2-admin-tools.png",
          width: 2880,
          height: 1800,
          title: "Admin console · Tools",
          caption: "Ten tabs, one pattern. 47 dashboards and self-service tools in one table, each cell editable in place, with a Needs attention column for anything incomplete.",
          wide: true,
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-editor.png",
          width: 2880,
          height: 1800,
          title: "Tool editor",
          caption: "Editing a section shows the public card above the form, so links, menus and demo buttons are checked before they ship.",
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-alert.png",
          width: 2880,
          height: 1800,
          title: "Tool alerts",
          caption: "When a data source breaks, an admin flags the card in seconds. Critical alerts also disable the Open button so nobody lands on a broken report.",
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-events.png",
          width: 2880,
          height: 1800,
          title: "Events",
          caption: "The commercial calendar. Turning on a badge promotes an event to the home hero for three weeks, then it retires itself.",
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-preview.png",
          width: 2880,
          height: 1800,
          title: "Tools page preview",
          caption: "The full public page rendered inside the console with unsaved banners and alerts applied. Nothing is saved from this view.",
        },
      ],
    },
    tags: ["Analytics", "Admin Console", "Enterprise", "Award-Winning"],
    year: "2023–2026",
    client: "Kimberly-Clark",
    role: ["UX Research", "UX Design", "Full Stack Development", "Database Design"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "Azure SQL", "Okta", "Power BI", "Docker"],
    challenges:
      "This was our first attempt at building a centralized internal platform of this kind. The existing experience lived on a cluttered SharePoint site that was hard to find, visually outdated, and didn't reflect the professionalism the commercial team expected. We lacked the budget to hire a developer, so I took on both design and development, teaching myself React, Next.js, Okta and API work to meet tight deadlines.\n\nVersion 1's success created the next problem. The Hub grew to dozens of tools, a training program and a calendar of sessions, but all of it was still hard-coded. Dashboards broke without users being told, events went stale, and we had no direct way to ask people whether the Hub was working for them. The platform needed to be run by the team that owned the content, not by one designer-developer with a deploy button.",
    solution:
      "The platform began as a Webflow site, but needs like a custom chatbot drove a rebuild in React, Next.js and Tailwind. I leaned on progressive disclosure, adaptive layouts for different roles and contextual help, and kept interviewing users across the project's life to steer the big decisions.\n\nVersion 2 rebuilt the public side around what people came to do. The home page opens on Jump right in: monitor performance, diagnose drivers, plan and act, sales and execution, customer portals. The Tools page adds taxonomy filters, favorites, recently viewed, and card and table views, and every card can carry an alert straight from the console. A short survey appears once per person, the Academy and Training sections are fed from the database, and a quick start guide gets new people productive. Each quarter's release notes ship as a narrated, animated video built in React with recorded voiceover, so updates reach people who would never read a changelog. The whole app runs in a hardened, non-root Docker image.",
    results:
      "Based on FullStory analytics, we estimate the Hub saves each user over 2 hours a week that would otherwise go to hunting for resources. It was featured in a company-wide town hall, won a GDUSA Award for Digital Design Excellence, and sparked a series of similar sites across the company. With version 2, the analytics team publishes tools, alerts, events, surveys and training themselves without a code change, broken reports are flagged on the card before anyone opens them, and the same SQL-backed admin pattern is ready to reuse on the next internal platform.",
    testimonial: {
      quote:
        "Ethan's work on the Analytics Hub transformed how our commercial teams make decisions. The interface is intuitive, powerful, and has become indispensable to our daily operations.",
      author: "Marwa Salhut",
      position: "Director of KCNA Commercial Analytics, Kimberly-Clark",
    },
    color: "bg-blue-500",
    featured: false,
  },
];
