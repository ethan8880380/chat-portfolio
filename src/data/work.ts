import type { ProjectData } from "@/data/projects";

/**
 * Case studies, in the order they appear on the site (after the ones in
 * local-projects.ts). Moved out of Notion in November 2026; edit them here.
 * Images live in public/projectImages/work/<slug>/.
 */
export const workProjects: ProjectData[] = [
  {
    id: 0,
    slug: "drcs",
    title: "DRCS",
    shortDescription: "Modernizing a 30-year-old research and engineering system",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/drcs/hero.png"
    },
    tags: [
      "Research",
      "next.js",
      "Enterprise"
    ],
    year: "",
    role: [
      "Research",
      "Development",
      "Design"
    ],
    color: "bg-blue-500",
    featured: false,
    richContent: [
      {
        id: "2e661e67-1094-80bc-a71f-ecee90c6c59e",
        type: "paragraph",
        content: "DRCS is an internal tool used by Kimberly-Clark’s Research & Engineering team to store, review, and manage technical drawings. For decades, it had been the backbone of how designs were approved and versioned—but it was showing its age."
      },
      {
        id: "2e661e67-1094-80fd-8695-d3d511062b37",
        type: "paragraph",
        content: "I joined the project during research, design, and early development, helping rethink how a deeply legacy system could evolve to meet modern needs."
      },
      {
        id: "2e661e67-1094-8027-8888-dc9311c7f257",
        type: "image",
        url: "/projectImages/work/drcs/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-805a-a32e-c62fb25cbb49",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-805d-831a-ca06064a99b3",
        type: "paragraph",
        content: "The existing DRCS system was over 30 years old. While it still technically worked, it no longer supported everything the team needed to do. The interface was slow, confusing, and built around outdated assumptions about how people work."
      },
      {
        id: "2e661e67-1094-80a9-b7b4-f16aa4619614",
        type: "paragraph",
        content: "Engineers used it to upload drawings, annotate them, and approve or reject versions—but basic tasks felt harder than they should. Navigation was clunky, workflows were rigid, and the system didn’t match how teams actually collaborated anymore."
      },
      {
        id: "2e661e67-1094-802b-9fb6-fa119fdcdccd",
        type: "paragraph",
        content: "The risk was growing: if the tool didn’t evolve, it would eventually slow innovation instead of supporting it."
      },
      {
        id: "2e661e67-1094-80e3-81e6-ef896e4fbd31",
        type: "heading_3",
        content: "Research and discovery",
        level: 3
      },
      {
        id: "2e661e67-1094-8020-a5e0-f887e6c88225",
        type: "paragraph",
        content: "We started by talking directly to the people who used DRCS every day. Through stakeholder and user interviews, we mapped out how the current system fit into their real workflows—not just how it was supposed to work, but how it actually did."
      },
      {
        id: "2e661e67-1094-8046-aae7-cc90c45c858b",
        type: "paragraph",
        content: "We focused on:"
      },
      {
        id: "2e661e67-1094-80fe-8c29-ebb4e0cf2878",
        type: "list_item",
        content: "Where people felt slowed down"
      },
      {
        id: "2e661e67-1094-8007-97f8-e5ac77ef1724",
        type: "list_item",
        content: "Where they made mistakes"
      },
      {
        id: "2e661e67-1094-80e5-9113-f503a727be9f",
        type: "list_item",
        content: "What they worked around instead of with"
      },
      {
        id: "2e661e67-1094-8008-8095-d5094bd7b1cd",
        type: "list_item",
        content: "What they wished the system could do"
      },
      {
        id: "2e661e67-1094-80ab-a308-e93d1bc03ef8",
        type: "paragraph",
        content: "This gave us a clear picture of what to preserve and what to rethink."
      },
      {
        id: "2e661e67-1094-80a6-ac4f-ecdc45be0769",
        type: "image",
        url: "/projectImages/work/drcs/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8037-aacb-d8f98d46ab8f",
        type: "heading_3",
        content: "Redesigning a legacy system",
        level: 3
      },
      {
        id: "2e661e67-1094-8036-95e4-ca5cd76828c2",
        type: "paragraph",
        content: "Instead of layering new features on top of old structure, we treated this as a true redesign. The goal was to respect what worked while fixing what didn’t."
      },
      {
        id: "2e661e67-1094-8002-bd64-e4a8980fcb10",
        type: "paragraph",
        content: "We focused on:"
      },
      {
        id: "2e661e67-1094-8025-9e59-dff15539c5ee",
        type: "list_item",
        content: "Clearer navigation"
      },
      {
        id: "2e661e67-1094-807a-94d2-f9dda4cfeca0",
        type: "list_item",
        content: "Simpler version management"
      },
      {
        id: "2e661e67-1094-80f2-b24b-da755f130aa5",
        type: "list_item",
        content: "Easier annotation and review"
      },
      {
        id: "2e661e67-1094-807d-8946-de800d024e4a",
        type: "list_item",
        content: "More intuitive approval and rejection flows"
      },
      {
        id: "2e661e67-1094-8069-af22-db74454f361c",
        type: "paragraph",
        content: "Every design decision tied back to real user behavior from research—not assumptions about what engineers “should” want."
      },
      {
        id: "2e661e67-1094-806a-aed5-f69de0a99623",
        type: "image",
        url: "/projectImages/work/drcs/03.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8064-a1c9-ce2267de130c",
        type: "heading_3",
        content: "My role",
        level: 3
      },
      {
        id: "2e661e67-1094-803d-9988-f0c230aca122",
        type: "paragraph",
        content: "I worked on research synthesis, UX design, and early frontend development. I helped translate messy, complex workflows into clear interfaces and supported the transition from concept to working product."
      },
      {
        id: "2e661e67-1094-80d3-a0d7-def33b6c038f",
        type: "paragraph",
        content: "This meant balancing user needs with technical constraints—modernizing the experience without breaking the systems that depended on it."
      },
      {
        id: "2e661e67-1094-809a-bd2c-e54ce6572cfb",
        type: "heading_3",
        content: "Early feedback",
        level: 3
      },
      {
        id: "2e661e67-1094-80fe-9a12-f0dbbc4bc30f",
        type: "paragraph",
        content: "DRCS has just launched, so we don’t yet have long-term metrics. But during testing, feedback was consistently positive. Users told us it felt faster, clearer, and easier to learn than the old system. Many said they could finally understand what was happening in the system without relying on memory or training."
      },
      {
        id: "2e661e67-1094-8057-bff3-e9ac6648a451",
        type: "paragraph",
        content: "For a tool that had been unchanged for decades, even that reaction mattered. It showed that thoughtful UX could make a highly technical, deeply ingrained system feel human again."
      },
      {
        id: "2e661e67-1094-802b-b9b3-de6bd014063c",
        type: "heading_3",
        content: "Reflection",
        level: 3
      },
      {
        id: "2e661e67-1094-808e-aab5-f15c8b1883a1",
        type: "paragraph",
        content: "This project reminded me that some of the most important design work isn’t flashy. It’s about quietly removing friction from tools people rely on every day."
      },
      {
        id: "2e661e67-1094-80a0-8d19-d8e356113750",
        type: "paragraph",
        content: "Redesigning DRCS wasn’t about novelty—it was about respect: for users’ time, for their expertise, and for the work they do. Even without big metrics yet, the early response confirmed what I believe: when you listen carefully and design with intention, even a 30-year-old system can feel new again."
      }
    ]
  },
  {
    id: 1,
    slug: "huggies",
    title: "Huggies Redesign",
    shortDescription: "Designing for stressed, tired, and overwhelmed parents",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/huggies/hero.png"
    },
    tags: [
      "Consumer"
    ],
    year: "",
    role: [
      "Research",
      "Design"
    ],
    color: "bg-blue-500",
    featured: true,
    richContent: [
      {
        id: "2ef61e67-1094-80b6-ae74-fbf053c4a235",
        type: "image",
        url: "/projectImages/work/huggies/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8007-85e1-e4b7f62f35c3",
        type: "paragraph",
        content: "The Huggies website serves millions of parents every year. Over time, it had grown heavy with content, outdated templates, inconsistent UI, and a navigation system that made it hard to find what mattered most—especially for new, exhausted parents just looking for help."
      },
      {
        id: "2e661e67-1094-803e-b2d9-fcb67e603d29",
        type: "paragraph",
        content: "The goal of this project was to modernize the experience, make content easier to find, and improve product discovery—without losing the emotional warmth that the Huggies brand is known for."
      },
      {
        id: "2e661e67-1094-808e-a82c-c4d6c76c94ef",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-809f-8621-fb3066052c75",
        type: "paragraph",
        content: "Years of content had piled up. Navigation was confusing. Templates varied wildly. UI patterns were inconsistent. Important information was buried."
      },
      {
        id: "2e661e67-1094-80a8-9386-cf1c1739423b",
        type: "paragraph",
        content: "For parents—often visiting in stressful moments, late at night, on their phones—this made the experience frustrating. They weren’t browsing for fun. They were looking for guidance, reassurance, or a quick answer."
      },
      {
        id: "2e661e67-1094-801b-be20-ebf6db0d7b83",
        type: "paragraph",
        content: "The challenge was to simplify a massive, content-heavy site while respecting both the emotional state of the user and the scale of the business behind it."
      },
      {
        id: "2ef61e67-1094-80b9-8e38-d1d078c9fa49",
        type: "image",
        url: "/projectImages/work/huggies/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8047-a7f2-d7ccb93ea3d0",
        type: "heading_3",
        content: "Research",
        level: 3
      },
      {
        id: "2e661e67-1094-80dc-819f-fc9b0e33a322",
        type: "paragraph",
        content: "We started with user research and analytics reviews. We looked at where people dropped off, where they stayed engaged, and what they searched for."
      },
      {
        id: "2e661e67-1094-80b6-a869-eb53800874ac",
        type: "paragraph",
        content: "Three patterns stood out:"
      },
      {
        id: "2e661e67-1094-80e3-9db3-fef7faa045be",
        type: "paragraph",
        content: "Parents wanted faster access to age-specific guidance."
      },
      {
        id: "2e661e67-1094-80c7-a507-c621a5035ae6",
        type: "paragraph",
        content: "They struggled to understand product differences."
      },
      {
        id: "2e661e67-1094-8028-9be9-f6365512e24a",
        type: "paragraph",
        content: "They responded better to a softer, more empathetic tone."
      },
      {
        id: "2e661e67-1094-80a4-a290-f62e8b98a530",
        type: "paragraph",
        content: "These insights shaped everything that followed."
      },
      {
        id: "2ef61e67-1094-8092-97fd-dc73d17bf6f0",
        type: "image",
        url: "/projectImages/work/huggies/03.png",
        content: ""
      },
      {
        id: "2ef61e67-1094-80e5-99fa-f7a928b14864",
        type: "heading_3",
        content: "Sensitive Data",
        level: 3
      },
      {
        id: "2ef61e67-1094-8047-8cca-e6850b9e4ae1",
        type: "paragraph",
        content: "There are multiple different tools available on the site, the biggest we worked on was the diaper rash quiz. This was used to help parents diagnose their baby’s diaper rash condition and tell them what their course of action is regarding it. We had parents rank question stating how relevant they felt it was as well as if they would even answer it. These insights guided us to take out some aspects of personalization that we initially thought would be good, but at the end of the day most parents want to keep data about their baby private and we want to make sure we respect that. This helped us refine our questions leading to a high rate of completion through the test (72% of people that clicked start finished the quiz). "
      },
      {
        id: "2e661e67-1094-803e-accf-f3a49bd749d3",
        type: "heading_3",
        content: "Rethinking the structure",
        level: 3
      },
      {
        id: "2e661e67-1094-80e1-8f91-c644ccebd8a1",
        type: "paragraph",
        content: "Instead of organizing content around internal product lines, we reorganized the experience around life stages. Parents don’t think in SKUs—they think in “newborn,” “toddler,” and “potty training.”"
      },
      {
        id: "2e661e67-1094-80a3-9693-ccc3977753ac",
        type: "paragraph",
        content: "Navigation and page structure shifted to reflect that. Parenting guidance and product relevance were tied directly to age and need, making the site feel more like a helper than a catalog."
      },
      {
        id: "2ef61e67-1094-8003-b04d-fcf4c92239d3",
        type: "image",
        url: "/projectImages/work/huggies/04.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8079-b4f0-d81acea4b1d9",
        type: "heading_3",
        content: "Design and system thinking",
        level: 3
      },
      {
        id: "2e661e67-1094-80ef-943c-df599d0786f8",
        type: "paragraph",
        content: "Visually, the site was rebuilt using the enterprise component library to ensure consistency, accessibility, and scalability across global markets. Modular content blocks and dynamic templates gave regional teams flexibility without breaking the overall system."
      },
      {
        id: "2e661e67-1094-8037-87d5-d21e2d946b99",
        type: "paragraph",
        content: "Every design choice aimed to reduce cognitive load: clear hierarchy, friendly tone, scannable content, and strong mobile layouts."
      },
      {
        id: "2e661e67-1094-8089-9564-f3632c5194c9",
        type: "paragraph",
        content: "Performance mattered too. Most parents visit on their phones, often in chaotic moments. Speed, readability, and clarity were non-negotiable."
      },
      {
        id: "2ef61e67-1094-80c6-b07d-ee6df9c3f9f5",
        type: "image",
        url: "/projectImages/work/huggies/05.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8036-b5ca-e3fb0454e416",
        type: "heading_3",
        content: "The result",
        level: 3
      },
      {
        id: "2e661e67-1094-807d-ad8d-dd5ec92c8178",
        type: "paragraph",
        content: "The redesigned Huggies site delivered a calmer, more supportive experience. Parents could find age-specific guidance faster, understand products more clearly, and move through the site with less friction."
      },
      {
        id: "2e661e67-1094-8097-b36b-e937ffb9f645",
        type: "paragraph",
        content: "Average time on site increased by 30%. Bounce rate dropped by 35%. Product pages became more conversion-focused without losing their educational, empathetic tone."
      },
      {
        id: "2e661e67-1094-800c-bd69-c81a013543dd",
        type: "paragraph",
        content: "Beyond the numbers, the project became a benchmark for other global brands at Kimberly-Clark—showing how to modernize large, legacy websites without losing the human side of the experience."
      },
      {
        id: "2e661e67-1094-8010-9664-c3374d3bba04",
        type: "paragraph",
        content: "This project reinforced something I deeply believe: when you design with empathy, clarity, and real user needs at the center, both people and the business win."
      }
    ]
  },
  {
    id: 2,
    slug: "internal-hubs",
    title: "Internal Hubs",
    shortDescription: "Scaling a successful model across teams",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/internal-hubs/hero.png"
    },
    tags: [
      "next.js",
      "tailwind",
      "Enterprise"
    ],
    year: "",
    role: [],
    color: "bg-blue-500",
    featured: false,
    richContent: [
      {
        id: "2e661e67-1094-80aa-98c5-e75e927c1141",
        type: "paragraph",
        content: "After building the Commercial Analytics Hub, it became clear that the same problem existed elsewhere. Different analytics teams across the organization were struggling with the same issues: scattered dashboards, unclear ownership, broken links, and too much time spent just finding insights."
      },
      {
        id: "2e661e67-1094-80a0-83e8-cbae38193309",
        type: "paragraph",
        content: "That single project turned into a repeatable model. I went on to build four internal analytics hubs, each tailored to a different team but based on the same core structure:"
      },
      {
        id: "2e661e67-1094-80d6-856b-e6999170adbe",
        type: "list_item",
        content: "Commercial Analytics Hub"
      },
      {
        id: "2e661e67-1094-801a-a8c1-fee7de1310a0",
        type: "list_item",
        content: "Supply Chain Hub"
      },
      {
        id: "2e661e67-1094-8098-a659-e1ed7e2b5d07",
        type: "list_item",
        content: "IFP Insights & Analytics Hub"
      },
      {
        id: "2e661e67-1094-8021-8027-d2633c1c9e61",
        type: "list_item",
        content: "Holistic Measurement Product"
      },
      {
        id: "2e661e67-1094-803a-a974-d0986815e73a",
        type: "paragraph",
        content: "Each served a different group, but all solved the same fundamental problem: getting people to insights quickly."
      },
      {
        id: "2e661e67-1094-8047-8369-c6100cdc993e",
        type: "heading_3",
        content: "The shared problem",
        level: 3
      },
      {
        id: "2e661e67-1094-80c5-a5a8-f7a50fafc41a",
        type: "paragraph",
        content: "Across teams, the story was always the same. Dashboards lived in too many places. Access depended on tribal knowledge. New team members didn’t know where to start. Even experienced users wasted time hunting for the right report."
      },
      {
        id: "2e661e67-1094-8037-af24-d6bfc994a76e",
        type: "paragraph",
        content: "Every hub had different content, but the underlying pain was identical: too much effort just to get to the data."
      },
      {
        id: "2e661e67-1094-80bb-bd69-fad2971e03c1",
        type: "heading_3",
        content: "The approach",
        level: 3
      },
      {
        id: "2e661e67-1094-8068-9103-f0ab5f8a7f52",
        type: "paragraph",
        content: "Instead of redesigning from scratch each time, I reused the same proven foundation. All hubs used the same design system, the same information architecture, and the same interaction patterns."
      },
      {
        id: "2e661e67-1094-8024-9904-eb92a3ba5e18",
        type: "paragraph",
        content: "The work became less about inventing structure and more about applying a model that already worked—filling in the right content, adapting language to each team, and adding small features based on stakeholder needs."
      },
      {
        id: "2e661e67-1094-803b-b44f-f85b81739c2f",
        type: "paragraph",
        content: "Each hub was designed as a single entry point for that team’s insights: one place to start, one place to trust."
      },
      {
        id: "2e661e67-1094-8042-b6f2-f9b27a64f9f6",
        type: "heading_3",
        content: "Building at scale",
        level: 3
      },
      {
        id: "2e661e67-1094-80af-bb4f-edb1b18337ca",
        type: "paragraph",
        content: "Because the structure and components already existed, new hubs could be built quickly and consistently. Stakeholder feedback shaped small custom features, but the core experience stayed stable. This made the platforms easier to maintain, easier to update, and easier for users to move between if they worked across teams."
      },
      {
        id: "2e661e67-1094-80fa-92ae-e7aa11e68448",
        type: "heading_3",
        content: "The impact",
        level: 3
      },
      {
        id: "2e661e67-1094-8022-b708-fc8337ca71fb",
        type: "paragraph",
        content: "Across the Commercial Analytics Hub, Supply Chain Hub, IFP Insights & Analytics Hub, and Holistic Measurement Product, the outcome was the same: time saved. Users spent less time searching and more time actually working with data."
      },
      {
        id: "2e661e67-1094-809a-ae39-fadbddd7f1fb",
        type: "paragraph",
        content: "More importantly, these projects proved that good UX scales. A solution that works once can work many times—if it’s built as a system, not a one-off."
      }
    ]
  },
  {
    id: 3,
    slug: "brand-templates",
    title: "Brand Templates",
    shortDescription: "Turning one brand redesign into a global foundation",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/brand-templates/hero.png"
    },
    tags: [
      "Consumer",
      "Design System"
    ],
    year: "",
    role: [],
    color: "bg-blue-500",
    featured: false,
    richContent: [
      {
        id: "2e661e67-1094-80a8-8ab6-f444f3cee91b",
        type: "paragraph",
        content: "What started as a small redesign for a single brand site—Depend Australia—quickly turned into something much bigger. Halfway through the project, leadership decided this work would become the foundation for all future consumer-facing websites at Kimberly-Clark."
      },
      {
        id: "2e661e67-1094-80a6-92bc-eee7fecf5694",
        type: "paragraph",
        content: "That meant a design originally scoped for a small, content-light site suddenly had to scale to massive brands like Huggies, with hundreds of articles, product pages, and complex regional needs. The challenge wasn’t just redesigning a site—it was creating a system flexible enough to work everywhere, without losing consistency."
      },
      {
        id: "2e661e67-1094-80c9-8732-d3c3629e020b",
        type: "heading_3",
        content: "The challenge",
        level: 3
      },
      {
        id: "2e661e67-1094-801b-a2ac-f0bdd64a3761",
        type: "paragraph",
        content: "The original goal was simple: redesign the Depend Australia site. It was relatively small, with limited content and straightforward structure. But once leadership saw the direction of the work, they made a call to use it as the baseline for every consumer brand site going forward."
      },
      {
        id: "2e661e67-1094-80fa-bd7a-d9c1a79feb05",
        type: "paragraph",
        content: "That decision changed everything. Now the design had to support:"
      },
      {
        id: "2e661e67-1094-80cb-a6f8-f7714dc250d3",
        type: "list_item",
        content: "Huge content libraries"
      },
      {
        id: "2e661e67-1094-807b-97a7-e4f3643b898c",
        type: "list_item",
        content: "Product-heavy brands"
      },
      {
        id: "2e661e67-1094-8054-b54b-ed5d7aea9874",
        type: "list_item",
        content: "Regional differences and localization"
      },
      {
        id: "2e661e67-1094-8086-a2bb-c1ff08641312",
        type: "list_item",
        content: "Legacy content structures"
      },
      {
        id: "2e661e67-1094-8000-963e-e17c94a71327",
        type: "list_item",
        content: "Brand-specific visual identities"
      },
      {
        id: "2e661e67-1094-80c2-a0ba-e222e32c756d",
        type: "paragraph",
        content: "The hardest part was that there was no centralized documentation or design standard to start from. Every region and brand had evolved on its own, with different layouts, CMS needs, and edge cases. We had to reverse-engineer consistency from chaos."
      },
      {
        id: "2e661e67-1094-8006-abab-d22c417ba28c",
        type: "heading_3",
        content: "The solution",
        level: 3
      },
      {
        id: "2e661e67-1094-80ea-badb-db17f31c30c3",
        type: "paragraph",
        content: "We started with a full audit of consumer brand websites across regions. We cataloged layout patterns, CMS requirements, localization needs, and all the weird edge cases that had grown over time. From that, we designed a modular system of web templates that could handle very different types of content while still feeling like one cohesive family of sites."
      },
      {
        id: "2e661e67-1094-80ec-ad39-f03fdfd4d43c",
        type: "paragraph",
        content: "Each template was built to be flexible: responsive layouts, swappable content blocks, and customizable styling that allowed brands to keep their identity without breaking structure. The goal was simple—standardize what matters, and make everything else configurable."
      },
      {
        id: "2e661e67-1094-80d3-8307-efc6ca54d497",
        type: "paragraph",
        content: "I built the initial template using the Depend Australia site as the base. Once that was solid, the system expanded through our design system. Multi-brand support was handled largely through variable modes—by switching the brand mode, the same templates could instantly adapt to different brand styles. After that, the main work became helping brands plug in their content rather than redesigning layouts from scratch."
      },
      {
        id: "2e661e67-1094-80a7-bf3e-e0b049c52329",
        type: "paragraph",
        content: "I also helped lead the frontend implementation and documentation so developers and content teams across regions could confidently use the templates, even for large, complex sites."
      },
      {
        id: "2e661e67-1094-8079-b725-da66c2e5fb4a",
        type: "heading_3",
        content: "The result",
        level: 3
      },
      {
        id: "2e661e67-1094-804d-b4c6-d4b5712bdcd2",
        type: "paragraph",
        content: "What began as a single-site redesign became the baseline for all future consumer brand websites at Kimberly-Clark. The system now supports everything from small regional pages to massive global brands."
      },
      {
        id: "2e661e67-1094-80b6-a9aa-f4417d93a2b9",
        type: "paragraph",
        content: "The biggest wins were speed and clarity. New sites launched faster. Teams made fewer design decisions because the system already answered most of them. Brands could focus on content and storytelling instead of layout debates."
      },
      {
        id: "2e661e67-1094-80c3-b299-e64e6db76e8d",
        type: "paragraph",
        content: "Most importantly, the company finally had a shared foundation—one that balanced global consistency with local and brand-specific flexibility. Instead of reinventing the wheel for every site, teams now build on a system designed to scale."
      },
      {
        id: "2e661e67-1094-8078-ad32-f1aadd487d61",
        type: "paragraph",
        content: "This project showed me how quickly a small design decision can turn into a platform-level responsibility—and how important it is to design for growth, even when you don’t know yet how big something is going to become."
      }
    ]
  },
  {
    id: 4,
    slug: "design-system",
    title: "Design System",
    shortDescription: "Creating a single language for an enterprise",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/design-system/hero.png"
    },
    tags: [
      "Design System",
      "Figma",
      "Tokens"
    ],
    year: "",
    role: [
      "Research",
      "Design",
      "Development"
    ],
    color: "bg-blue-500",
    featured: false,
    richContent: [
      {
        id: "2e661e67-1094-80f1-b703-c51574792011",
        type: "paragraph",
        content: "When I started building this design system, Kimberly-Clark didn’t really have one. Every product looked and behaved differently. Fonts changed from page to page. Buttons meant different things in different tools. Developers defaulted to whatever framework was easiest—often Bootstrap—with no real design guidance. Even within the same product, consistency was rare."
      },
      {
        id: "2e661e67-1094-8038-b76a-d7bdc88db69c",
        type: "paragraph",
        content: "I set out to change that by building a company-wide enterprise design system—single-handedly—that standardized the user experience across all of Kimberly-Clark’s digital products."
      },
      {
        id: "2e661e67-1094-80e6-9938-d054acd8717c",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-8029-baf4-f47cb674e9f8",
        type: "paragraph",
        content: "There was virtually no shared design language. Each team made decisions in isolation. Products spanned wildly different tech stacks—React, Angular, legacy systems—which made alignment even harder. There was no governance, no shared components, and no clear standard."
      },
      {
        id: "2e661e67-1094-8002-97b5-dd475db08e9f",
        type: "paragraph",
        content: "Our UX team was excited about the idea of a system. Development teams were more skeptical. Many had ingrained habits and varying levels of technical maturity. Convincing them to change how they built things was just as big a challenge as designing the system itself."
      },
      {
        id: "2ef61e67-1094-808e-9d38-d33158a92be6",
        type: "image",
        url: "/projectImages/work/design-system/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80dc-9fc3-d3a65a509fa0",
        type: "heading_3",
        content: "The approach",
        level: 3
      },
      {
        id: "2e661e67-1094-80e3-9925-f528e73618d7",
        type: "paragraph",
        content: "I built the system from the ground up using atomic design principles. It included foundational styles, core UI components, and full application and website modules."
      },
      {
        id: "2e661e67-1094-80d1-b593-ec33e4c00955",
        type: "paragraph",
        content: "On the code side, I built the system on top of ShadCN components and Tailwind utility classes. Tokens and variables were named to match familiar Tailwind conventions so developers didn’t have to relearn everything from scratch."
      },
      {
        id: "2e661e67-1094-8017-a10d-e8033f29cdd6",
        type: "paragraph",
        content: "In Figma, I created a full component library using variables and modes, synced to the same tokens used in code. Designers could switch brands, themes, and modes without rebuilding components."
      },
      {
        id: "2e661e67-1094-80ba-b769-eae7ac423b91",
        type: "paragraph",
        content: "I also built the documentation, usage guidelines, and example patterns so people didn’t just have components—they knew how to use them."
      },
      {
        id: "2ef61e67-1094-8081-9070-f1a43fa3a277",
        type: "image",
        url: "/projectImages/work/design-system/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8034-af46-f892d6b8a14d",
        type: "heading_3",
        content: "Adoption and governance",
        level: 3
      },
      {
        id: "2e661e67-1094-8009-89c7-e4ed4f6ec423",
        type: "paragraph",
        content: "A system only works if people use it. I hosted weekly working sessions to walk designers and developers through the system. I standardized parts of the tech stack across teams so the system could be adopted without friction."
      },
      {
        id: "2e661e67-1094-805f-9cc7-ffe045cbaa57",
        type: "paragraph",
        content: "Every new component or change went through a governance process that I managed directly. This ensured quality, consistency, and long-term maintainability."
      },
      {
        id: "2e661e67-1094-804b-a4a3-c6c306dd6196",
        type: "paragraph",
        content: "Support wasn’t just docs—it was demos, open office hours, and direct help when teams were implementing something tricky."
      },
      {
        id: "2ef61e67-1094-8098-bd05-c075cf606f0d",
        type: "image",
        url: "/projectImages/work/design-system/03.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80bd-b25a-e456f973b77d",
        type: "heading_3",
        content: "The result",
        level: 3
      },
      {
        id: "2e661e67-1094-8077-aa93-c9a08a4d4a94",
        type: "paragraph",
        content: "The design system became the foundation for enterprise UI at Kimberly-Clark. What used to be a scattered landscape of mismatched interfaces became a cohesive ecosystem."
      },
      {
        id: "2e661e67-1094-801c-aeef-ea91a5a87e29",
        type: "paragraph",
        content: "While it’s hard to reduce the impact to a single number, the difference was dramatic. Teams shipped faster. Designs were more consistent. Developers spent less time reinventing patterns. Products felt like they belonged to the same family."
      },
      {
        id: "2e661e67-1094-80c1-a552-c6d25d8c30ae",
        type: "paragraph",
        content: "Most importantly, it raised the bar for everyone. Designers and developers now share a common language, a common toolkit, and a shared standard for quality."
      },
      {
        id: "2e661e67-1094-8040-9f67-dca9ccd3cbca",
        type: "paragraph",
        content: "This project showed me that a design system isn’t just a library of components—it’s a cultural shift. And when it works, it changes how an entire organization builds software."
      },
      {
        id: "2e661e67-1094-805c-8090-c792f6079061",
        type: "paragraph",
        content: ""
      }
    ]
  },
  {
    id: 5,
    slug: "buyer-spring",
    title: "Be My Buyer",
    shortDescription: "Reimagining how buyers and sellers find each other",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/buyer-spring/hero.png"
    },
    tags: [
      "Freelance",
      "next.js",
      "tailwind",
      "Full Stack Dev"
    ],
    year: "",
    role: [],
    color: "bg-blue-500",
    featured: true,
    richContent: [
      {
        id: "37461e67-1094-800a-aec4-e7ecb815d700",
        type: "paragraph",
        content: "Pre-launch · Tacoma pilot in prep · Patent pending"
      },
      {
        id: "37461e67-1094-8090-ad29-d39439c1ca42",
        type: "paragraph",
        content: "A real estate platform built on a contrarian premise: the best way to help someone buy a home isn't to show them more listings. It's to show them fewer, and to make clear why each one fits."
      },
      {
        id: "37461e67-1094-8095-8c3f-f91ea00684ab",
        type: "paragraph",
        content: "Be My Buyer isn't live yet. The core product is built and working, and the design keeps evolving as we move toward a pilot. I've led product design, frontend development, and user research, treating it as both a concept to prove and a real system to ship."
      },
      {
        id: "37461e67-1094-8067-b0c5-fadfc41bef94",
        type: "image",
        url: "/projectImages/work/buyer-spring/01.png",
        content: ""
      },
      {
        id: "37461e67-1094-80c5-86a2-d4ff4a7817a8",
        type: "heading_2",
        content: "The problem",
        level: 2
      },
      {
        id: "37461e67-1094-805a-a695-e249ab12df58",
        type: "paragraph",
        content: "Most real estate platforms treat buying a home like buying shoes: list everything, add filters, let people sort it out. Buyers scroll through hundreds of homes that almost fit. Sellers watch interest pile up with no sense of which buyers are actually serious. Everyone is busy, and nobody feels understood."
      },
      {
        id: "37461e67-1094-80b0-b3b1-e57653e27367",
        type: "paragraph",
        content: "It's also a hard industry to change. Real estate moves slowly and runs on trust and relationships, especially with agents. A new platform can't win on novelty alone. It has to earn confidence early, usually through small regional pilots where it can show real value before asking anyone to change how they work."
      },
      {
        id: "37461e67-1094-80e9-a43e-efc64f47dda2",
        type: "paragraph",
        content: "I set out to replace \"search and hope\" with something more deliberate."
      },
      {
        id: "37461e67-1094-8031-84c4-e4ef0daeca6b",
        type: "heading_2",
        content: "The idea",
        level: 2
      },
      {
        id: "37461e67-1094-802e-87ac-d12089ac167b",
        type: "paragraph",
        content: "Start with people, not listings."
      },
      {
        id: "37461e67-1094-809d-9444-fed8631e3a97",
        type: "paragraph",
        content: "Instead of dropping buyers into a feed, Be My Buyer asks what actually matters to them: budget, must-have features, lifestyle, priorities. A matching algorithm scores homes against that profile, so the experience leads with fit instead of volume."
      },
      {
        id: "37461e67-1094-80e6-a18e-ecf0230a8a13",
        type: "paragraph",
        content: "The same logic runs in reverse. A seller's home is never posted to the open market. It stays private, visible only to them, while the algorithm ranks verified buyers by how likely they are to buy. The seller picks a short list of buyers to connect with and can keep choosing until the fit is right. Be My Buyer makes the introduction; the people, and their agents, handle the deal."
      },
      {
        id: "37461e67-1094-80a8-b6f6-c5bf7f60e7fb",
        type: "paragraph",
        content: "Less browsing. More matching."
      },
      {
        id: "37461e67-1094-80d7-9abd-e5756f95b8b6",
        type: "image",
        url: "/projectImages/work/buyer-spring/02.png",
        content: ""
      },
      {
        id: "37461e67-1094-80bc-9a70-e64d49a7701d",
        type: "heading_2",
        content: "Designing the experience",
        level: 2
      },
      {
        id: "37461e67-1094-8096-8257-deb962e94e07",
        type: "paragraph",
        content: "I designed the product to feel guided and personal rather than transactional. A buyer doesn't just see a home, they see the reasons it matches them. Every match comes with an explanation, not only photos and a price."
      },
      {
        id: "37461e67-1094-8041-a4fc-ef377d7828c0",
        type: "paragraph",
        content: "Sellers get that same clarity in reverse. Rather than treating all interest as equal, they see which buyers genuinely fit, ranked and easy to act on, without ever exposing their home publicly."
      },
      {
        id: "37461e67-1094-805a-82b9-dcb987398180",
        type: "paragraph",
        content: "Agents are first-class participants, not an afterthought. They get tools to manage matches, track progress, and support both sides of a transaction, so the platform fits into how the industry already works instead of fighting it."
      },
      {
        id: "37461e67-1094-8005-b7b9-ff560e39b843",
        type: "paragraph",
        content: "Across all three roles, the flow reads like a sequence of clear steps with meaningful inputs and feedback that leaves people feeling understood. It's closer to a guided experience than a marketplace."
      },
      {
        id: "37461e67-1094-8013-89f0-f1fd66f82a38",
        type: "image",
        url: "/projectImages/work/buyer-spring/03.png",
        content: ""
      },
      {
        id: "37461e67-1094-80bb-840f-ff47dbcf315b",
        type: "heading_2",
        content: "Building the platform",
        level: 2
      },
      {
        id: "37461e67-1094-80bd-bd25-d4bdb43976dd",
        type: "paragraph",
        content: "Be My Buyer is built with Next.js, Tailwind, Supabase, and Mapbox. I implemented the frontend, the matching logic, the data flows, and the core journeys for buyers, sellers, and agents. The visual design is still maturing, but the underlying product works end to end."
      },
      {
        id: "37461e67-1094-80c9-8ff0-e3de139bd168",
        type: "paragraph",
        content: "That's been the point. This project is as much about shipping real software as it is about testing a product thesis."
      },
      {
        id: "37461e67-1094-80da-a9bd-c772490f1a7f",
        type: "image",
        url: "/projectImages/work/buyer-spring/04.png",
        content: ""
      },
      {
        id: "37461e67-1094-80b2-b25c-dfff50c3b4e0",
        type: "heading_2",
        content: "Where it's headed",
        level: 2
      },
      {
        id: "37461e67-1094-80f5-ab48-eb87b9ff5fb9",
        type: "paragraph",
        content: "Next is a pilot in Tacoma. It's where we'll tune the scoring model, validate the flows with real users, and answer the question that matters most: does a match-first model actually change how people behave?"
      },
      {
        id: "37461e67-1094-80ca-ac77-cb7c6027b0e0",
        type: "paragraph",
        content: "Even before launch, the work has confirmed the core bet. When you optimize for quality of matches instead of quantity of listings, buyers get a calmer, more confident experience, and sellers and agents get leads that actually mean something."
      },
      {
        id: "37461e67-1094-8025-b7b9-e432ede1be7f",
        type: "paragraph",
        content: "Be My Buyer isn't finished. But it already reflects the work I care about most: questioning default patterns, designing around real human needs, and building products that feel considered instead of noisy."
      }
    ]
  },
  {
    id: 6,
    slug: "hume-group",
    title: "The Hume Group",
    shortDescription: "Designing and building a high-converting site for a local real estate team",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/hume-group/hero.png"
    },
    tags: [
      "Freelance",
      "next.js",
      "tailwind"
    ],
    year: "",
    role: [
      "Research",
      "Development",
      "Design",
      "Project Management"
    ],
    color: "bg-blue-500",
    featured: true,
    richContent: [
      {
        id: "2e661e67-1094-801f-a15f-e998d56784ac",
        type: "paragraph",
        content: "The Hume Group is a small, high-performing real estate team based in Tacoma. In the real world, they were already one of the top-selling groups in the area—but online, you would never know it. Their website looked outdated, performed poorly in search, and rarely converted visitors into leads. On average, it generated about one form submission per month."
      },
      {
        id: "2e661e67-1094-80f7-acca-c1ee5a9a1546",
        type: "paragraph",
        content: "I partnered with them as a freelance designer and developer and owned the project end-to-end: research, strategy, UX, design, development, SEO, analytics, and CMS setup. The site launched in late December 2025 and immediately began outperforming the old site in traffic, engagement, and lead generation."
      },
      {
        id: "2e661e67-1094-8004-8e9e-ef3af6b1f67d",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-8072-8f74-c04567412fc4",
        type: "paragraph",
        content: "The old site failed on almost every front. It looked dated, was difficult to update, and didn’t reflect the quality of the business behind it. SEO performance was weak, which meant most potential clients never found it. And when people did land on the site, there wasn’t enough clear, useful information to build trust or guide them toward contacting the team."
      },
      {
        id: "2e661e67-1094-8043-b570-eb3d475f8e47",
        type: "paragraph",
        content: "The three realtors felt strongly that their business deserved better. They were winning in the real world through referrals and reputation, but their digital presence wasn’t helping them grow. Failure for this project would have been simple: low traffic, no increase in leads, and no meaningful improvement over the old site."
      },
      {
        id: "2e661e67-1094-8005-9113-d846686c720d",
        type: "heading_3",
        content: "Goals",
        level: 3
      },
      {
        id: "2e661e67-1094-80e2-8968-ef265a02315c",
        type: "paragraph",
        content: "The main goal was to increase visibility and conversions. They wanted more people to find them, understand what made them different, and reach out. Because the old site had no real analytics, we didn’t have clean benchmarks—but we did know they averaged about one form submission per month. Beating that was the minimum bar. Longer-term, the real goal was to make the site a true growth engine, not just a digital business card."
      },
      {
        id: "2e661e67-1094-807b-a232-f9808d867df9",
        type: "image",
        url: "/projectImages/work/hume-group/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80b3-91d3-c7d3fd8c0a05",
        type: "heading_3",
        content: "Understanding the audience",
        level: 3
      },
      {
        id: "2e661e67-1094-8096-93f2-eab4f8e53d67",
        type: "paragraph",
        content: "The primary audience is people selling their homes, with buyers as a strong secondary group. Most visitors arrive through search, with word of mouth and blog content playing a smaller but growing role."
      },
      {
        id: "2e661e67-1094-80a7-be3a-c312c6937c05",
        type: "paragraph",
        content: "For these users, what’s at stake is huge. Buying or selling a home is one of the biggest financial and emotional decisions people make. They’re anxious about choosing the wrong agent, worried about money, and looking for someone they can trust. The site didn’t just need to look good—it needed to reduce fear, build confidence, and clearly show that this team knows what they’re doing."
      },
      {
        id: "2e661e67-1094-8092-a57f-c75ca3a0e88a",
        type: "heading_3",
        content: "Research and insight",
        level: 3
      },
      {
        id: "2e661e67-1094-80bf-8ed9-cd1295c4ec43",
        type: "paragraph",
        content: "I met weekly with the client and talked with people who had recently bought or sold homes. One pattern came up again and again: people don’t choose agents based on clever taglines. They choose based on proof. They want to see results, reviews, experience, and local credibility."
      },
      {
        id: "2e661e67-1094-800f-a02c-e6bc30034a95",
        type: "paragraph",
        content: "That insight shaped everything. The design and content needed to make their success obvious—fast."
      },
      {
        id: "2e661e67-1094-80ea-9257-d5bedb14c3ad",
        type: "heading_3",
        content: "Strategy and UX",
        level: 3
      },
      {
        id: "2e661e67-1094-8001-9748-d3c335d97994",
        type: "paragraph",
        content: "The structure of the site was intentionally simple, especially because many users skew older. The main navigation focuses on clarity: Home, About, Selling, Buying, Blog, and Neighborhoods."
      },
      {
        id: "2e661e67-1094-8060-8155-c4089d137336",
        type: "paragraph",
        content: "The core experience is straightforward. Most users land on the homepage, learn what the group offers, see evidence of their results, and then follow a call-to-action to either the buying or selling flow. From there, the goal is simple: get them to feel confident enough to reach out."
      },
      {
        id: "2e661e67-1094-80d3-a8b2-dcca72d4180e",
        type: "paragraph",
        content: "One necessary tradeoff was using an IDX feed for listings. It isn’t the prettiest system, but it’s essential for real estate. We accepted the visual limitations in exchange for functionality, and focused design effort on everything around it."
      },
      {
        id: "2e661e67-1094-80f1-9239-d53a74dcb340",
        type: "image",
        url: "/projectImages/work/hume-group/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8030-bc34-dc66e491b701",
        type: "heading_3",
        content: "Design",
        level: 3
      },
      {
        id: "2e661e67-1094-80ed-9d3f-f7e8d61730d3",
        type: "paragraph",
        content: "Visually, the site needed to feel clean, premium, and trustworthy. Trust is built through clarity, not decoration. Large sections show recent sales, client reviews, and a map of sold homes to make their experience tangible. Typography is large and readable, layouts are simple, and nothing feels cramped—especially important for older users."
      },
      {
        id: "2e661e67-1094-804b-8f64-f8de364c70bf",
        type: "paragraph",
        content: "Every design decision came back to one question: does this make someone feel more confident choosing this team?"
      },
      {
        id: "2e661e67-1094-80a7-aeed-ecdf4cd0af4d",
        type: "heading_3",
        content: "Build and technology",
        level: 3
      },
      {
        id: "2e661e67-1094-80b3-b9fa-f7c4784504d1",
        type: "paragraph",
        content: "The site is built with Next.js, React, and Tailwind. For content, I used Ghost as a CMS because the client wanted something extremely simple for writing blog posts."
      },
      {
        id: "2e661e67-1094-80b3-b6e4-d868875f4b74",
        type: "paragraph",
        content: "I personally designed and built everything, set up the CMS, integrated APIs, implemented SEO, and configured analytics. The most meaningful technical growth for me was working through real-world integrations—connecting services, handling data cleanly, and making sure everything worked reliably together."
      },
      {
        id: "2e661e67-1094-803b-af07-e2a5f8f4fe9b",
        type: "image",
        url: "/projectImages/work/hume-group/03.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80d4-8cfb-cf4cf6c46623",
        type: "heading_3",
        content: "Early results",
        level: 3
      },
      {
        id: "2e661e67-1094-8043-8ae2-cc6da43b75fe",
        type: "paragraph",
        content: "Within the first few weeks after launch, the site had 856 unique visitors. About 55% of users scrolled more than 25% down the page they viewed—well above the typical ~40% benchmark. Just under half of all traffic came directly from search."
      },
      {
        id: "2e661e67-1094-8072-8827-e98e65540470",
        type: "paragraph",
        content: "The most visited neighborhood page was Proctor District, with Hilltop in second place. The most viewed blog post so far has been “Rehab Now, Pay at Closing.” Performance has also been strong: the site’s “Real Experience Score,” which measures load speed and overall experience, has hovered between 98 and 99—anything above 90 is considered excellent."
      },
      {
        id: "2e661e67-1094-8085-b2f4-f86daadb9d72",
        type: "paragraph",
        content: "Most importantly, the site generated eight form submissions in less than a month—compared to about one per month on the old site."
      },
      {
        id: "2e661e67-1094-80fb-aa3e-d5e2ebb5ae37",
        type: "heading_3",
        content: "Iteration",
        level: 3
      },
      {
        id: "2e661e67-1094-8065-a598-ed2fa3a60e27",
        type: "paragraph",
        content: "One early insight from analytics was that many users were reaching the bottom of blog posts and leaving. To fix this, I added a related-posts section at the end of each article so people always had a clear next step instead of hitting a dead end."
      },
      {
        id: "2e661e67-1094-8071-b245-e3e1f79ef251",
        type: "image",
        url: "/projectImages/work/hume-group/04.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80c9-bafd-f8cade93d058",
        type: "heading_3",
        content: "Impact",
        level: 3
      },
      {
        id: "2e661e67-1094-80bd-a489-fff316e6c737",
        type: "paragraph",
        content: "The new site has already delivered an eight-times increase in leads, strong early SEO traction, high engagement, and near-perfect performance scores. More than the numbers, it finally represents the quality of the business behind it. The Hume Group now has a digital presence that matches their real-world reputation."
      },
      {
        id: "2e661e67-1094-809c-8fd2-f48532bc3d3d",
        type: "heading_3",
        content: "Reflection",
        level: 3
      },
      {
        id: "2e661e67-1094-80e4-b95c-da62c12836e0",
        type: "paragraph",
        content: "This was one of my first freelance projects to fully launch, and it’s one I’m especially proud of. It pushed me to own everything—from research and strategy to design, development, and measurement. It also reinforced something I care deeply about: good UX isn’t just about making things look nice. It’s about helping real people make big, meaningful decisions with confidence."
      }
    ]
  },
  {
    id: 7,
    slug: "genfei",
    title: "GenFEI",
    shortDescription: "Designing an AI interface for research and engineering",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/genfei/hero.png"
    },
    tags: [
      "GenAI",
      "Enterprise"
    ],
    year: "",
    role: [],
    color: "bg-blue-500",
    featured: false,
    richContent: [
      {
        id: "2e661e67-1094-8024-bfd9-c624e3675e97",
        type: "paragraph",
        content: "GenFEI is an AI-powered chatbot built for the Research & Engineering team at Kimberly-Clark. It connects to multiple internal knowledge bases and allows highly technical users to query everything from product data to dense engineering documentation in natural language."
      },
      {
        id: "2e661e67-1094-80b0-913b-f4b840cbf4aa",
        type: "paragraph",
        content: "This was our first serious attempt at building an internal AI product—and it set the design and usability standard for everything that followed."
      },
      {
        id: "2e661e67-1094-80e8-94ba-c33e7644eb36",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-80b0-a3f2-fdc70cc55689",
        type: "paragraph",
        content: "Before GenFEI, finding information meant knowing exactly where to look. Data lived in different systems, with different search experiences, and different mental models. Engineers and researchers often had to guess which system might contain the answer they needed—and if they guessed wrong, they’d start over somewhere else."
      },
      {
        id: "2e661e67-1094-803e-a947-cd0174f4e97e",
        type: "paragraph",
        content: "These users were deeply technical, but their time was limited. They didn’t want to hunt for documentation—they wanted answers. The challenge wasn’t just building AI logic. It was designing an interface that made a very complex system feel simple, predictable, and trustworthy, even across multi-step, technical conversations."
      },
      {
        id: "2e661e67-1094-80b7-b91c-ff64d2cf29d6",
        type: "paragraph",
        content: "We also had to deal with new questions no one had answered before: How much control should users have over AI behavior? How do you show advanced options without overwhelming people? How do you keep context across long, technical conversations?"
      },
      {
        id: "2e661e67-1094-8081-a77a-fe75202debd2",
        type: "heading_3",
        content: "My role",
        level: 3
      },
      {
        id: "2e661e67-1094-8078-a636-f6810022b84c",
        type: "paragraph",
        content: "I owned UX research, UI/UX design, and frontend development. I worked closely with engineering to translate system complexity into something humans could actually use."
      },
      {
        id: "2e661e67-1094-80c2-9bc0-cfa27e2023a3",
        type: "heading_3",
        content: "Designing the solution",
        level: 3
      },
      {
        id: "2e661e67-1094-809e-9834-cbbf35ab1b1c",
        type: "paragraph",
        content: "I designed and built a conversational interface focused on clarity, flexibility, and control. The goal was to make the system powerful without making it feel complicated."
      },
      {
        id: "2e661e67-1094-8019-b637-e068f8903455",
        type: "paragraph",
        content: "One key feature was dynamic follow-up suggestions. Based on what a user asked, the interface suggested relevant next questions so users could explore a topic without constantly rephrasing or guessing what to ask next."
      },
      {
        id: "2e661e67-1094-80d8-81c2-d0d36804ba18",
        type: "paragraph",
        content: "Another important feature was temperature control. Instead of hiding AI behavior behind a black box, I exposed it in a simple way. Users could choose whether they wanted strict, precise answers for validation or more creative, high-level thinking for ideation. It gave users agency over how the AI behaved, which built trust."
      },
      {
        id: "2e661e67-1094-803f-892e-f27e7f42821e",
        type: "paragraph",
        content: "Under the hood, the system routed questions to different knowledge bases. On the frontend, my job was to make sure users never had to think about that complexity. The interface used progressive disclosure, showing advanced controls only when people needed them."
      },
      {
        id: "2e661e67-1094-80b4-b4e3-d4591d22cecf",
        type: "paragraph",
        content: "I also built in feedback loops. Users could quickly downvote bad answers, and we ran office hours to collect deeper feedback. That input directly shaped iteration."
      },
      {
        id: "2e661e67-1094-805c-af96-d1c21622ca5a",
        type: "heading_3",
        content: "Building the experience",
        level: 3
      },
      {
        id: "2e661e67-1094-80d5-a677-cbf00c2b88c6",
        type: "paragraph",
        content: "I built the frontend in Next.js with Tailwind and Framer Motion. I used subtle animations to make the experience feel responsive and alive—animated input states, smooth message loading, and gentle transitions between states."
      },
      {
        id: "2e661e67-1094-80b5-a340-d531619b7893",
        type: "paragraph",
        content: "These micro-interactions weren’t decoration. They helped users understand what the system was doing and reduced friction in long, multi-turn conversations. When you’re asking complex questions, speed and clarity matter."
      },
      {
        id: "2e661e67-1094-8032-9e79-fc02a148483a",
        type: "heading_3",
        content: "The result",
        level: 3
      },
      {
        id: "2e661e67-1094-80bf-8f3b-f79b53cb28db",
        type: "paragraph",
        content: "GenFEI launched as the first chatbot of its kind internally—and it immediately felt different from typical internal tools. Users commented on how polished it felt, more like a customer-facing product than an internal prototype."
      },
      {
        id: "2e661e67-1094-80ec-a3a4-df58c3d13a6a",
        type: "paragraph",
        content: "More importantly, it worked. People could finally ask natural-language questions and get answers without worrying about where the data lived. It gained quick traction and became the design and usability reference for future AI tools at Kimberly-Clark."
      },
      {
        id: "2e661e67-1094-80c0-8ba8-ccd12ef7c351",
        type: "paragraph",
        content: "This project taught me how much UX matters in AI products. The intelligence doesn’t matter if people don’t trust it, understand it, or enjoy using it. GenFEI showed that even highly technical tools can—and should—feel thoughtful, human, and well-designed."
      }
    ]
  },
  {
    id: 8,
    slug: "pu-app",
    title: "Pull Ups App",
    shortDescription: "When research proves the stakeholders wrong",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/pu-app/hero.png"
    },
    tags: [
      "Research",
      "Consumer"
    ],
    year: "",
    role: [
      "Research",
      "Design"
    ],
    color: "bg-blue-500",
    featured: false,
    richContent: [
      {
        id: "2e661e67-1094-8051-8554-ecde0d8c618c",
        type: "paragraph",
        content: "This project started as a straightforward challenge: find a real problem parents face during potty training and design a digital product that genuinely helps. The goal was to support parents, help kids succeed, and build stronger brand connection for Pull-Ups."
      },
      {
        id: "2e661e67-1094-8000-a1f4-d2a4ab96b750",
        type: "paragraph",
        content: "What it became was a lesson in what happens when research and decision-making don’t align."
      },
      {
        id: "2e661e67-1094-8093-b363-f429ee8bce94",
        type: "image",
        url: "/projectImages/work/pu-app/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8010-b836-f4b5a3841b38",
        type: "heading_3",
        content: "The challenge",
        level: 3
      },
      {
        id: "2e661e67-1094-8062-84ee-f83f2b5c9f41",
        type: "paragraph",
        content: "Pull-Ups wanted a mobile app to support parents through potty training. The brief was intentionally open-ended: talk to parents, find real pain points, and design something useful."
      },
      {
        id: "2e661e67-1094-8045-b50f-eb643e38f340",
        type: "paragraph",
        content: "We took a research-first approach. But halfway through the project, we learned that the brand team had already spent $100,000 on a fully illustrated app concept—created outside the UX team—without any validation. While we were preparing research insights and early concepts, leadership already had a favorite solution."
      },
      {
        id: "2e661e67-1094-809a-9e69-c09ad1898df6",
        type: "paragraph",
        content: "Suddenly, the real challenge wasn’t designing the best product. It was proving, with real evidence, that the pre-made idea wasn’t solving a real problem."
      },
      {
        id: "2e661e67-1094-80d1-a941-d56ce852749b",
        type: "image",
        url: "/projectImages/work/pu-app/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80b1-af67-e2a8603eb7c3",
        type: "heading_3",
        content: "Research",
        level: 3
      },
      {
        id: "2e661e67-1094-80c2-a25e-d0923eb84aac",
        type: "paragraph",
        content: "We interviewed more than 50 parents who were currently potty training, had recently finished, or were just about to start. After synthesizing interviews, patterns emerged quickly."
      },
      {
        id: "2e661e67-1094-80e1-a75b-fa7fb29716df",
        type: "paragraph",
        content: "Only first-time parents showed any interest in downloading a potty training app. Everyone else either already knew what to do or didn’t have the time or energy for another app."
      },
      {
        id: "2e661e67-1094-803f-a0ac-cd7392189da1",
        type: "paragraph",
        content: "The biggest frustration wasn’t tracking progress—it was accidents. Especially during screen time, when kids were too distracted to realize they needed to go."
      },
      {
        id: "2e661e67-1094-8083-998a-e95539ce91c0",
        type: "paragraph",
        content: "Parents weren’t looking for more work. They wanted something that helped without demanding attention."
      },
      {
        id: "2e661e67-1094-8010-a2a1-cab3c6d7491e",
        type: "image",
        url: "/projectImages/work/pu-app/03.png",
        content: ""
      },
      {
        id: "2e661e67-1094-800b-af46-c5f1ad8cfebb",
        type: "heading_3",
        content: "The opportunity",
        level: 3
      },
      {
        id: "2e661e67-1094-803d-a7ae-d99c9a2632c1",
        type: "paragraph",
        content: "We mapped our insights into an Opportunity Solution Tree, connecting real parent pain points to possible solutions. One idea stood out: instead of asking parents to log accidents or rewards, what if the app helped prevent accidents?"
      },
      {
        id: "2e661e67-1094-8067-b058-f7def9018dd8",
        type: "paragraph",
        content: "We designed a video player that paused at intervals and reminded kids to try going potty. It turned screen time—one of the biggest accident triggers—into a training tool. It was passive, supportive, and didn’t require parents to constantly interact with the app."
      },
      {
        id: "2e661e67-1094-80f2-96e9-d59b95fb0d60",
        type: "paragraph",
        content: "When we prototyped and tested it, parents immediately saw the value. It felt realistic. It fit into their lives instead of adding more work."
      },
      {
        id: "2e661e67-1094-80a9-ac4c-daa6c1336bf1",
        type: "heading_3",
        content: "What actually shipped",
        level: 3
      },
      {
        id: "2e661e67-1094-8038-9378-e65c45f870f7",
        type: "paragraph",
        content: "Despite strong feedback on our concept, the brand moved forward with their original $100K idea: a potty tracking app with a Candyland-style board, stickers, and manual logging of every success and accident."
      },
      {
        id: "2e661e67-1094-800a-92bb-c1ee41d475ac",
        type: "paragraph",
        content: "We tested that version too. The results were blunt. Parents didn’t want to track anything."
      },
      {
        id: "2e661e67-1094-8047-917b-f5ed743ed916",
        type: "paragraph",
        content: "The most common response was:"
      },
      {
        id: "2e661e67-1094-8087-b6ea-e44804d467b4",
        type: "paragraph",
        content: "“I don’t have time for this.”"
      },
      {
        id: "2e661e67-1094-8076-8243-d4eb19eec4c0",
        type: "paragraph",
        content: "We delivered the findings. They were ignored. Our team was removed from the project."
      },
      {
        id: "2e661e67-1094-808b-a481-dd4688434b18",
        type: "paragraph",
        content: "The app launched about a year later. Less than a year after that, it was pulled from app stores due to low engagement."
      },
      {
        id: "2e661e67-1094-80a4-b937-ffc0fd4d2e34",
        type: "heading_3",
        content: "Reflection",
        level: 3
      },
      {
        id: "2e661e67-1094-8002-8ac2-ddeaf2c25448",
        type: "paragraph",
        content: "This project didn’t end with a product I was proud to see in the world. But it’s one of the clearest examples I’ve experienced of why user research matters."
      },
      {
        id: "2e661e67-1094-80d2-90f2-f2958e3fe378",
        type: "paragraph",
        content: "We did the work. We talked to users. We found real problems. We validated solutions. And when leadership chose to ignore that in favor of sunk costs and gut instinct, the product failed exactly the way research predicted."
      },
      {
        id: "2e661e67-1094-8029-bb5b-df54d02ac7e7",
        type: "paragraph",
        content: "It taught me that good UX isn’t just about designing interfaces—it’s about advocating for users, even when that’s uncomfortable. And sometimes, the most important work you do is proving that a shiny idea shouldn’t exist at all."
      }
    ]
  },
  {
    id: 9,
    slug: "iris",
    title: "IRIS Advanced Analytics",
    shortDescription: "Designing a predictive analytics platform from the ground up",
    fullDescription: "",
    images: {
      hero: "/projectImages/work/iris/hero.png"
    },
    tags: [
      "Analytics",
      "Dashboard",
      "Enterprise",
      "Data Visualization"
    ],
    year: "",
    role: [
      "Research",
      "Design",
      "Product Strategy"
    ],
    color: "bg-blue-500",
    featured: true,
    richContent: [
      {
        id: "2e661e67-1094-80b4-ae5a-fd0a2c60b9de",
        type: "paragraph",
        content: "IRIS is an internal analytics platform at Kimberly-Clark that reimagines how promotional and predictive data is explored. It helps growth management and trade promotion analysts understand not just what the data says, but why it behaves the way it does."
      },
      {
        id: "2e661e67-1094-8052-be1a-cadc5e8f2ab7",
        type: "paragraph",
        content: "The project began about two years ago and launched a few months later. Since then, it has never really “ended”—IRIS is an always-evolving product, with new views and functionality added continuously as the business grows and its needs change."
      },
      {
        id: "2e661e67-1094-809a-8872-f41e4344d0ae",
        type: "paragraph",
        content: "I was the only designer on a 10–15 person product team, owning all UX, research, and data visualization design."
      },
      {
        id: "2ef61e67-1094-80d6-9cf4-dd146a03f955",
        type: "image",
        url: "/projectImages/work/iris/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8061-b6ba-ea741b3d3ed9",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-80b6-b1d1-e776c82b1433",
        type: "paragraph",
        content: "Before IRIS, analysts relied on Power BI and several external analytics tools that together cost over $2 million per year. These tools weren’t customizable, didn’t quite fit the business’s needs, and forced analysts to work around limitations instead of with the data."
      },
      {
        id: "2e661e67-1094-80f5-8c10-d45c6c33f078",
        type: "paragraph",
        content: "Leadership wanted to lean heavily into forecasting and predictive analytics, but the existing tools weren’t built for that kind of strategic, forward-looking work. Analysts often had to make assumptions simply because the tools couldn’t explain what was really happening under the surface."
      },
      {
        id: "2e661e67-1094-80d8-9b58-f35b02b529b6",
        type: "paragraph",
        content: "IRIS was core to both the main promotional strategy teams and the revenue growth management team. The stakes were high: a massive investment, high visibility with leadership before design even began, and real pressure to prove that this could replace multiple expensive systems. Failure would have looked like people asking for the old tools back."
      },
      {
        id: "2e661e67-1094-805c-9d5f-c5392b1bce5b",
        type: "heading_3",
        content: "Goals",
        level: 3
      },
      {
        id: "2e661e67-1094-806d-8a4c-c9b5d41eca77",
        type: "paragraph",
        content: "The goal wasn’t just to build another dashboard. It was to create a platform that could:"
      },
      {
        id: "2e661e67-1094-8042-be83-fb85e3bed579",
        type: "list_item",
        content: "Support advanced forecasting and scenario planning"
      },
      {
        id: "2e661e67-1094-8078-a395-e49d692b01fd",
        type: "list_item",
        content: "Replace multiple external tools and Power BI"
      },
      {
        id: "2e661e67-1094-80f9-8835-dc7280795b32",
        type: "list_item",
        content: "Let analysts explore why data behaves the way it does"
      },
      {
        id: "2e661e67-1094-800c-9832-d64336ca35d8",
        type: "list_item",
        content: "Fit the business instead of forcing the business to fit the tool"
      },
      {
        id: "2e661e67-1094-8096-9597-c90f7d3c96cc",
        type: "paragraph",
        content: "Success meant adoption—if analysts didn’t use IRIS as their primary tool, the project failed."
      },
      {
        id: "2ef61e67-1094-80c8-b4d9-dc1d40cea8ba",
        type: "image",
        url: "/projectImages/work/iris/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80c8-acc7-ec7f13532436",
        type: "heading_3",
        content: "Users",
        level: 3
      },
      {
        id: "2e661e67-1094-8067-a904-f3fdc29ae700",
        type: "paragraph",
        content: "IRIS is built for growth management and trade promotion analysts. These are highly technical users who work with analytics tools every day. They’re comfortable with complexity, but they don’t want unnecessary friction."
      },
      {
        id: "2e661e67-1094-80a6-8cd4-ea6dd38a33cb",
        type: "paragraph",
        content: "For them, success meant being able to quickly find what they needed, trust what they were seeing, and confidently use the tool to guide major business decisions."
      },
      {
        id: "2ef61e67-1094-8019-9bf8-f28026e22e85",
        type: "image",
        url: "/projectImages/work/iris/03.png",
        content: ""
      },
      {
        id: "2e661e67-1094-802e-92df-db5111b0b0ea",
        type: "heading_3",
        content: "Research",
        level: 3
      },
      {
        id: "2e661e67-1094-8076-aee9-dc65683500ef",
        type: "paragraph",
        content: "Research for IRIS was deep and continuous. I ran interviews and testing with both stakeholders and real users throughout the process, talking with over 30 people across roles."
      },
      {
        id: "2e661e67-1094-8044-bef9-ea6615af8dc9",
        type: "paragraph",
        content: "The biggest surprise wasn’t resistance—it was excitement. People were genuinely eager for a tool that felt built for them instead of forced on them."
      },
      {
        id: "2e661e67-1094-802d-b2dc-f78a2c317b00",
        type: "paragraph",
        content: "One insight shaped everything: users didn’t just want to see data. They wanted to understand why the data said what it did. IRIS needed to be a tool for explanation, not just presentation."
      },
      {
        id: "2ef61e67-1094-8029-9e9f-d9a53360a8eb",
        type: "image",
        url: "/projectImages/work/iris/04.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8006-87b1-f3cad296032e",
        type: "heading_3",
        content: "Core modules",
        level: 3
      },
      {
        id: "2e661e67-1094-80ac-a034-df93fc3eb97c",
        type: "paragraph",
        content: "IRIS is made up of several major tools, each solving a different predictive problem."
      },
      {
        id: "2e661e67-1094-8082-a62b-e510a75f6887",
        type: "paragraph",
        content: "The Scenario Planner helps analysts simulate how pricing and promotions affect product performance over time. Designing it was incredibly difficult. It had to support complex modeling while still making sense at a glance. Fitting everything in without overwhelming users was a constant challenge."
      },
      {
        id: "2e661e67-1094-8052-8376-cd015b5d52d0",
        type: "paragraph",
        content: "The Demand Planner visualizes product demand across different product groups and markets. This was the first module we built, which meant it set the foundation for navigation that had to scale as new tools were added later."
      },
      {
        id: "2e661e67-1094-80d3-aeae-fa4a36135abf",
        type: "paragraph",
        content: "Netflow shows how product sales move from brand to brand and in and out of the market month by month. There were no good references for this—it didn’t really exist anywhere else. We had to invent patterns, visuals, and interactions from scratch."
      },
      {
        id: "2e661e67-1094-80a7-87f6-e8850d98cabc",
        type: "heading_3",
        content: "Handling complexity",
        level: 3
      },
      {
        id: "2e661e67-1094-8091-b511-ee9a05ad9713",
        type: "paragraph",
        content: "One of the things I care most about is handling complexity without dumbing it down. With IRIS, we focused on showing what users needed most first, and creating clear affordances for finding deeper detail when they wanted it. That kept the interface clean while preserving power."
      },
      {
        id: "2e661e67-1094-808a-960d-f9c9191f9dc6",
        type: "paragraph",
        content: "We standardized navigation patterns and built persistent filtering so users always felt oriented, no matter how complex the data became."
      },
      {
        id: "2ef61e67-1094-80c8-9efe-dbd0a1c8c8d8",
        type: "image",
        url: "/projectImages/work/iris/05.png",
        content: ""
      },
      {
        id: "2e661e67-1094-801b-af0a-ce0b27d33050",
        type: "heading_3",
        content: "Collaboration and build",
        level: 3
      },
      {
        id: "2e661e67-1094-8068-9e5c-f4f0c56389c1",
        type: "paragraph",
        content: "IRIS was built by an internal development team. We ran daily UX–dev syncs."
      },
      {
        id: "2e661e67-1094-8077-ac61-eff45135de99",
        type: "paragraph",
        content: "This was one of the hardest parts of the project. I often had to fight for quality—developers would mark work “done” even when it didn’t meet UX standards. I spent hours in QA pushing for fixes, and sometimes hearing there “wasn’t time.” It taught me how to pick battles, advocate for users, and push for quality without burning bridges."
      },
      {
        id: "2e661e67-1094-8061-b769-f8158b903971",
        type: "paragraph",
        content: "The only major technical constraint was the charting library, which limited some interactions and visuals."
      },
      {
        id: "2ef61e67-1094-8032-a77e-e966434a5350",
        type: "image",
        url: "/projectImages/work/iris/06.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8090-93a5-d70ae5f4a3fe",
        type: "heading_3",
        content: "Launch and adoption",
        level: 3
      },
      {
        id: "2e661e67-1094-802c-b071-f236b2b4b57b",
        type: "paragraph",
        content: "IRIS rolled out in stages as new modules became ready. Power users adopted it immediately, and feedback was overwhelmingly positive."
      },
      {
        id: "2e661e67-1094-80b9-8d97-f85b82fb9aca",
        type: "paragraph",
        content: "Over time, IRIS replaced:"
      },
      {
        id: "2e661e67-1094-80f0-8867-ec33a2147e0f",
        type: "list_item",
        content: "Power BI"
      },
      {
        id: "2e661e67-1094-80d6-a1ca-cccf20f0cb2f",
        type: "list_item",
        content: "The TPM tool"
      },
      {
        id: "2e661e67-1094-803a-880c-e920523c03aa",
        type: "list_item",
        content: "The Facilitated Cleansing tool"
      },
      {
        id: "2e661e67-1094-80db-bf14-ff632dcbcfab",
        type: "list_item",
        content: "Several smaller external tools"
      },
      {
        id: "2e661e67-1094-800d-80a8-e40da928f08d",
        type: "paragraph",
        content: "It saved the company millions of dollars while delivering something far more tailored to user needs."
      },
      {
        id: "2ef61e67-1094-801b-af9e-fd700e398176",
        type: "image",
        url: "/projectImages/work/iris/07.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80d8-b74c-cba69f88dce2",
        type: "heading_3",
        content: "Impact",
        level: 3
      },
      {
        id: "2e661e67-1094-8040-9fe9-f1a376138aea",
        type: "paragraph",
        content: "IRIS became the core analytics platform for promotional strategy and revenue growth management. It gave teams the ability to make fewer assumptions and more informed decisions."
      },
      {
        id: "2e661e67-1094-8097-84f0-dc79f05bc8ae",
        type: "paragraph",
        content: "Our team earned credibility for being able to build truly complex tools. IRIS became the gold standard for predictive dashboards at Kimberly-Clark."
      },
      {
        id: "2e661e67-1094-80d3-abe9-c5f7c61575be",
        type: "paragraph",
        content: "This is a multi-million dollar success story driven by UX and research. It would not have happened without deep user understanding, constant testing, and a designer willing to live inside complexity."
      },
      {
        id: "2ef61e67-1094-80cf-9ec3-c0c5acfcac5a",
        type: "image",
        url: "/projectImages/work/iris/08.png",
        content: ""
      },
      {
        id: "2e661e67-1094-80f3-af31-ef5355932c43",
        type: "heading_3",
        content: "Reflection",
        level: 3
      },
      {
        id: "2e661e67-1094-8027-bd1d-d4ea3a0884fe",
        type: "paragraph",
        content: "IRIS taught me how to work in extremely complex spaces, how to fight for quality, and how to pick my battles. It pushed every part of my skillset—research, data visualization, interaction design, and collaboration."
      },
      {
        id: "2e661e67-1094-8028-b232-f34caa413634",
        type: "paragraph",
        content: "IRIS belongs in my portfolio because it proves that UX can drive massive business impact. We didn’t just make something nicer—we replaced multiple million-dollar tools with a platform that does exactly what users asked for."
      }
    ],
    showcase: {
      label: "The website",
      body: "IRIS also has a front door: a site where commercial teams discover what the platform can do, learn it at their own pace, and request access. It sits on the same design language as the product it introduces, so moving from the site into the app feels like one experience.",
      images: [
        {
          src: "/projectImages/projectContent/iris-site-home.png",
          width: 2880,
          height: 1800,
          title: "Home",
          caption: "IRIS as a decision copilot, with a live carousel of its capabilities.",
          wide: true
        },
        {
          src: "/projectImages/projectContent/iris-site-capabilities.png",
          width: 2880,
          height: 1800,
          title: "Capabilities",
          caption: "Every capability in one library, filterable by analytics type, data source and team."
        },
        {
          src: "/projectImages/projectContent/iris-site-training.png",
          width: 2880,
          height: 1800,
          title: "Training",
          caption: "Tutorials, documentation and release notes for every capability."
        },
        {
          src: "/projectImages/projectContent/iris-site-about.png",
          width: 2880,
          height: 1800,
          title: "About",
          caption: "What IRIS is and who it serves."
        },
        {
          src: "/projectImages/projectContent/iris-app-post-event.png",
          width: 2880,
          height: 1800,
          title: "Post Event Analyzer",
          caption: "Inside the app: how each promotion performed, with unit lift, trade spend and margin per event."
        },
        {
          src: "/projectImages/projectContent/iris-app-pea-cleansing.png",
          width: 2880,
          height: 1800,
          title: "PEA Cleansing",
          caption: "A guided step for reviewing and overriding volume before the results are used.",
          wide: true
        }
      ]
    }
  },
  {
    id: 10,
    slug: "kcna-hub",
    title: "Commercial Analytics Hub",
    shortDescription: "Designing a single entry point for enterprise analytics",
    fullDescription: "",
    images: {
      hero: "/projectImages/desktop/comm-v2-hero.png"
    },
    tags: [
      "next.js",
      "tailwind",
      "Enterprise"
    ],
    year: "2023–2026",
    role: [
      "Research",
      "Development",
      "Design",
      "Project Management"
    ],
    color: "bg-blue-500",
    featured: true,
    richContent: [
      {
        id: "2e661e67-1094-8019-afb3-ef0453c91be3",
        type: "paragraph",
        content: "The Commercial Analytics Hub is an internal platform I designed and built to centralize access to dozens of enterprise analytics dashboards. Before it existed, finding the right report could take over an hour. After launch, most users could get where they needed to go in under a minute. It became the primary starting point for more than 1,000 people across the organization."
      },
      {
        id: "2e661e67-1094-809f-93fd-d3f3d0ddd629",
        type: "paragraph",
        content: "This project is a good example of how UX isn’t always about making new tools—it’s often about making existing tools usable, trustworthy, and easy to find."
      },
      {
        id: "2e661e67-1094-80fc-9962-d5936c8547d2",
        type: "heading_3",
        content: "The problem",
        level: 3
      },
      {
        id: "2e661e67-1094-8021-8e12-d0f3d0bfcca2",
        type: "paragraph",
        content: "Analytics access was messy. Dashboards were scattered across Power BI workspaces, SharePoint sites, and personal bookmarks. Links changed often and without warning. Ownership was unclear. New hires and occasional users had no reliable way to learn what to use or where to go."
      },
      {
        id: "2e661e67-1094-8059-90be-dc37f04eef3c",
        type: "paragraph",
        content: "Power users survived by memorizing paths and saving bookmarks. Everyone else lost time clicking broken links, searching old emails, or messaging coworkers for help. People regularly spent more time finding dashboards than using them."
      },
      {
        id: "2e661e67-1094-80b4-9718-c07a7cec2114",
        type: "paragraph",
        content: "The real issue wasn’t the dashboards themselves. It was discovery, trust, and clarity."
      },
      {
        id: "2e661e67-1094-8000-9198-f4ef6702163b",
        type: "heading_3",
        content: "Goals",
        level: 3
      },
      {
        id: "2e661e67-1094-8075-8001-cce9a5d0ae29",
        type: "paragraph",
        content: "From a user perspective, the goal was simple: find the right dashboard fast, know which one to use, and trust that it would actually work. From a business perspective, the goal was to create a single source of truth for analytics access, reduce wasted time, and increase confidence in data usage."
      },
      {
        id: "2e661e67-1094-800b-a092-c2da1629c353",
        type: "paragraph",
        content: "There wasn’t a complicated success metric. If people didn’t use it, it failed."
      },
      {
        id: "2e661e67-1094-80ed-aa18-db7d4f4f88aa",
        type: "heading_3",
        content: "My role",
        level: 3
      },
      {
        id: "2e661e67-1094-809b-b5ce-c3ef59473d28",
        type: "paragraph",
        content: "I owned the project end-to-end. I led research and stakeholder interviews, defined the product vision, designed the information architecture and UX, designed and built the UI, maintained the front end, and managed stakeholders through multiple iterations. Aside from a small team that helped with backend chatbot integration, I owned design, UX, and front-end development."
      },
      {
        id: "2e661e67-1094-80d3-9943-c541ae82cb6d",
        type: "heading_3",
        content: "Research and insight",
        level: 3
      },
      {
        id: "2e661e67-1094-804e-b4b7-e6823aee7bac",
        type: "paragraph",
        content: "Through interviews and behavioral analysis in FullStory, I saw a clear split between user types. Power users had built their own systems: bookmarks, memorized workspace paths, and direct navigation. Occasional users had no such system. They bounced between SharePoint sites, clicked outdated links, and messaged teammates for help. Some spent hours just trying to find the right report."
      },
      {
        id: "2e661e67-1094-80a5-90ec-f9142fff29bf",
        type: "paragraph",
        content: "When I analyzed click paths and hesitation points, a simple pattern emerged: users didn’t need better dashboards. They needed a single, trusted place to start. Fragmentation—not complexity—was the root cause of wasted time and low confidence."
      },
      {
        id: "2e661e67-1094-80d6-a25d-c2e6b669a4a4",
        type: "heading_3",
        content: "Information architecture",
        level: 3
      },
      {
        id: "2e661e67-1094-80b6-8714-cd7c673db59d",
        type: "paragraph",
        content: "I organized dashboards by type of analysis—market share, assortment, revenue management, shelf planning, promotions, and more. This matched how analysts already thought about their work and reduced cognitive load."
      },
      {
        id: "2e661e67-1094-8062-a867-e3266a20eaef",
        type: "paragraph",
        content: "I explored organizing by questions like “How do we grow market share?” but rejected it. It was too subjective, hard to scale, and required interpretation. Instead, when dashboards overlapped, each entry included a clear description, when to use it, and what level of detail it provided. That removed the need for tribal knowledge."
      },
      {
        id: "2ef61e67-1094-80ea-848c-c3d69d561f91",
        type: "image",
        url: "/projectImages/work/kcna-hub/01.png",
        content: ""
      },
      {
        id: "2e661e67-1094-807d-a276-f5b073cafffb",
        type: "heading_3",
        content: "Key design decisions",
        level: 3
      },
      {
        id: "2e661e67-1094-8055-ba4c-d03eb06bb982",
        type: "paragraph",
        content: "Rather than trying to fix navigation inside Power BI or SharePoint, I built a dedicated access layer whose only job was clarity and discovery. Dashboards were clearly separated from power-user data tools so non-technical users didn’t land in workflows they couldn’t use."
      },
      {
        id: "2e661e67-1094-8013-bce0-ecfca4acd406",
        type: "paragraph",
        content: "The experience was designed for browsing. Clear categories, scannable descriptions, and predictable navigation made it easy to explore even if you didn’t know what you were looking for yet. Trust was built through consistency: links stayed current, changes were communicated, and the hub became the single authoritative source."
      },
      {
        id: "2e661e67-1094-8038-9dc3-c3eadaa69675",
        type: "heading_3",
        content: "Training and enablement",
        level: 3
      },
      {
        id: "2e661e67-1094-80cb-9b93-dd8a51cc0054",
        type: "paragraph",
        content: "Training used to disappear after live office hours. Once a session ended, the knowledge was effectively gone. I changed that by recording sessions, embedding videos directly into the platform, and labeling them by topic and dashboard."
      },
      {
        id: "2e661e67-1094-80a2-b1f7-ece189acd157",
        type: "paragraph",
        content: "What used to be temporary became an on-demand knowledge base. New hires could onboard themselves, occasional users could refresh their memory, and anyone could learn independently without waiting for a live session."
      },
      {
        id: "2ef61e67-1094-80f9-bd33-e34cb48938d4",
        type: "image",
        url: "/projectImages/work/kcna-hub/02.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8074-b1ba-d4103d273dca",
        type: "heading_3",
        content: "Iteration and evolution",
        level: 3
      },
      {
        id: "2e661e67-1094-807a-82ee-cff8f7b011ca",
        type: "paragraph",
        content: "The first version was a simple MVP built in Webflow to validate adoption. Usage quickly proved there was demand."
      },
      {
        id: "2e661e67-1094-80bb-b6f5-e5f33cbb34e1",
        type: "paragraph",
        content: "In the second phase, I expanded the platform by adding training content, improving the information architecture, and aligning the visuals more closely with the internal design system."
      },
      {
        id: "2e661e67-1094-8045-b78c-cbaf2c683e3e",
        type: "paragraph",
        content: "As the site grew, Webflow became a bottleneck. Global changes required page-by-page edits, and shared logic was hard to manage. I rebuilt the platform in React to centralize logic, improve performance, and make iteration faster. Users explicitly noticed the speed and clarity improvement."
      },
      {
        id: "2e661e67-1094-8088-bbe7-f1cbe42dc5c4",
        type: "paragraph",
        content: "In its most mature phase, the hub fully aligned with the enterprise design system and reusable components. It became a reference model that influenced four to five other internal platforms."
      },
      {
        id: "2ef61e67-1094-8004-bec3-cd083586551e",
        type: "image",
        url: "/projectImages/work/kcna-hub/03.png",
        content: ""
      },
      {
        id: "2e661e67-1094-8092-abae-fa91fb1f7c58",
        type: "heading_3",
        content: "AI search and Analytics Academy",
        level: 3
      },
      {
        id: "2e661e67-1094-8073-a3da-fd642b6be7d5",
        type: "paragraph",
        content: "To reduce friction even further, I integrated a natural-language chatbot. Instead of browsing categories, users could ask something like, “Where do I find promo performance for Target?” and get a direct link."
      },
      {
        id: "2e661e67-1094-8051-9150-cd7ca15b3c1b",
        type: "paragraph",
        content: "I also helped launch the Analytics Academy, a role-based learning system with live sessions, recorded content, and structured learning paths. All of it lived inside the hub, so learning and doing were never far apart."
      },
      {
        id: "2e661e67-1094-808e-8c73-e396a5dda247",
        type: "heading_3",
        content: "Impact",
        level: 3
      },
      {
        id: "2e661e67-1094-80f0-ba0e-eae043c92d39",
        type: "paragraph",
        content: "The platform reduced dashboard discovery time from about 60 minutes to about 1 minute. It reached more than 1,000 active users within a few months and was adopted organically across teams. Trust in analytics improved, and the platform became a reusable model adopted by other groups."
      },
      {
        id: "2e661e67-1094-8066-a5aa-ceda24c6c9b3",
        type: "paragraph",
        content: "One of the most common things I heard was: “It’s the first thing I open every day.”"
      },
      {
        id: "2e661e67-1094-80a1-b221-d335077be4b1",
        type: "heading_3",
        content: "Reflection",
        level: 3
      },
      {
        id: "2e661e67-1094-804d-9db8-df7a31e3a370",
        type: "paragraph",
        content: "This project pushed me to grow from designer into a true UX engineer. By owning both design and implementation, I reduced handoff friction, iterated directly on user feedback, and built faster with more confidence."
      },
      {
        id: "2e661e67-1094-8072-803f-f369e4b020cf",
        type: "paragraph",
        content: "More than anything, it reinforced what I care about most: great UX isn’t just about interfaces. It’s about clarity, trust, and making people’s work easier every day."
      }
    ],
    client: "Kimberly-Clark",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Azure SQL",
      "Okta",
      "Power BI",
      "Docker"
    ],
    testimonial: {
      quote: "Ethan's work on the Analytics Hub transformed how our commercial teams make decisions. The interface is intuitive, powerful, and has become indispensable to our daily operations.",
      author: "Marwa Salhut",
      position: "Director of KCNA Commercial Analytics, Kimberly-Clark"
    },
    showcase: {
      label: "Version 2",
      body: "Version 2 started from one bottleneck: me. Every new dashboard, broken-report notice, webinar or training video was a code change and a deploy, so the site always lagged the team that owned the content. So I moved the content out of the code and gave the analytics team an admin console to run it themselves.\n\nEach content type is an Azure SQL table that mirrors its TypeScript type, and every admin area follows the same pattern: API routes call a small server module, the module talks to SQL, and if the database can't be reached it falls back to an in-memory store seeded from the original static data. Local development runs with no database at all, an outage degrades to read-only content instead of a blank page, and a script generates SQL seed files from the TypeScript data so a fresh database can be rebuilt end to end. Okta handles sign-in, and a superadmin tab decides who sees the admin shield and which tabs each person can use.\n\nThe console is designed for people who don't think in forms. Every edit shows its result before it's saved: the tool editor renders the live card, the alert editor renders the alert strip, and a Tools-page preview shows the whole public page with unsaved changes applied. A Needs attention column flags tools missing a link, description or filters.\n\nThe public side was rebuilt around what people come to do. The home page opens on Jump right in, the Tools page adds taxonomy filters, favorites, recently viewed and table views, a short survey asks each person once how the Hub is working, and each quarter's release notes ship as a narrated, animated video built in React.",
      images: [
        {
          src: "/projectImages/projectContent/comm-v2-admin-tools.png",
          width: 2880,
          height: 1800,
          title: "Admin console · Tools",
          caption: "Ten tabs, one pattern. 47 dashboards and self-service tools in one table, each cell editable in place, with a Needs attention column for anything incomplete.",
          wide: true
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-editor.png",
          width: 2880,
          height: 1800,
          title: "Tool editor",
          caption: "Editing a section shows the public card above the form, so links, menus and demo buttons are checked before they ship."
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-alert.png",
          width: 2880,
          height: 1800,
          title: "Tool alerts",
          caption: "When a data source breaks, an admin flags the card in seconds. Critical alerts also disable the Open button so nobody lands on a broken report."
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-events.png",
          width: 2880,
          height: 1800,
          title: "Events",
          caption: "The commercial calendar. Turning on a badge promotes an event to the home hero for three weeks, then it retires itself."
        },
        {
          src: "/projectImages/projectContent/comm-v2-admin-preview.png",
          width: 2880,
          height: 1800,
          title: "Tools page preview",
          caption: "The full public page rendered inside the console with unsaved banners and alerts applied. Nothing is saved from this view."
        },
        {
          src: "/projectImages/projectContent/comm-v2-tools.png",
          width: 2880,
          height: 1800,
          title: "Tools page",
          caption: "47 tools with taxonomy filters, favorites and recently viewed, in card or table view."
        },
        {
          src: "/projectImages/projectContent/comm-v2-release-video.jpg",
          width: 2880,
          height: 1800,
          title: "Release notes video",
          caption: "Quarterly release notes as a narrated, animated video built in React with recorded voiceover."
        }
      ]
    }
  }
];
