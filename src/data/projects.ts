export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  images: {
    hero: string;
    gallery?: string[];
  };
  tags: string[];
  year: string;
  client?: string;
  role: string[];
  technologies?: string[];
  challenges?: string;
  solution?: string;
  results?: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  liveUrl?: string;
  githubUrl?: string;
  color: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 0,
    slug: "commercial-analytics-hub",
    title: "Commercial Analytics Hub",
    shortDescription: "GDUSA Award-winning internal analytics platform serving 1,000+ users weekly. Centralizes PowerBI reports and dashboards for North American Commercial Analytics teams, featuring integrated training modules and an AI chatbot for seamless data discovery and navigation.",
    fullDescription: "The Commercial Analytics Hub is a comprehensive internal platform that revolutionized how Kimberly-Clark's commercial teams access and analyze data. This award-winning project serves over 1,000 internal users weekly and has become the central hub for commercial decision-making across the organization.",
    images: {
      hero: "/projectImages/desktop/comm-analytics.png",
      gallery: [
        "/projectImages/projectContent/comm-2.png",
        "/projectImages/projectContent/comm-1.png"
      ]
    },
    tags: ["Analytics", "AI Chatbot", "Enterprise", "Award-Winning"],
    year: "2023",
    client: "Kimberly-Clark",
    role: ["UX Research", "UX Design", "Full Stack Development", "Chatbot API Integration"],
    technologies: ["React", "Next.js", "Tailwind", "Framer Motion", "OKTA", "PowerBI", "Azure"],
    challenges: "This was our first attempt at building a centralized internal platform of this kind. The existing experience lived on a cluttered SharePoint site that was hard to find, visually outdated, and didn't reflect the professionalism the commercial team expected. We lacked the budget to hire a developer, so I had to take on full ownership of both design and development—despite only having a basic understanding of HTML, CSS, and some Tailwind familiarity. I had to quickly teach myself everything from React and Next.js to OKTA integration and API work to meet tight deadlines. There were definitely moments where the project felt at risk, especially when it came to handling backend-level tasks like authentication and chatbot integration.",
    solution: "The platform began as a Webflow site, but evolving needs—like integrating a custom chatbot—necessitated a complete rebuild in React, Next.js, and Tailwind. I leaned into progressive disclosure patterns, designed adaptive layouts for different user roles, and embedded contextual help throughout the experience. We continuously interviewed users across the project's lifespan, using their feedback to guide major design decisions, fix accessibility gaps, and refine workflows. Despite being built solo, the site established core architectural patterns that were later reused across multiple internal tools. It became the foundation for a wave of new digital products across the organization.",
    results: "Based on FullStory analytics, we estimate the new platform saves each user over 2 hours a week that would've otherwise been spent hunting for resources. Though it was originally built for one team, its success sparked a series of similar sites across the company. The project was featured in a company-wide town hall, and later won a GDUSA Award for Digital Design Excellence. While it didn't immediately lead to a promotion, it drastically expanded the trust in me as both a designer and developer, ultimately shifting my role into a hybrid capacity across both disciplines.",
    testimonial: {
      quote: "Ethan's work on the Analytics Hub transformed how our commercial teams make decisions. The interface is intuitive, powerful, and has become indispensable to our daily operations.",
      author: "Marwa Salhut",
      position: "Director of KCNA Commercial Analytics, Kimberly-Clark"
    },
    color: "bg-blue-500"
  },
  {
    id: 1,
    slug: "enterprise-design-system",
    title: "Enterprise Design System",
    shortDescription: "Company-wide enterprise design system for Kimberly-Clark. Standardized the user experience across all of Kimberly-Clark's digital products.",
    fullDescription: "Single handedly created a comprehensive design system that standardized the user experience across all of Kimberly-Clark's digital products. This system includes components, patterns, guidelines, and tools that enable consistent and efficient product development.",
    images: {
      hero: "/projectImages/desktop/design-system.png",
      gallery: [
        "/projectImages/projectContent/eds-1.png",
        "/projectImages/projectContent/eds-2.png",
      ]
    },
    tags: ["Design System", "Enterprise", "Components", "Figma Variables", "Code Connect"],
    year: "2022-2023",
    client: "Kimberly-Clark",
    role: ["Variable/Mode Systems", "Component Design", "Reusable Sections", "Documentation"],
    technologies: ["Figma Code Connect", "Figma Variables"],
    challenges: "Before the design system, there was virtually no visual or structural consistency across Kimberly-Clark's internal tools and websites. Fonts, button styles, layouts—even within the same product—were often completely different. There was no governance in place, and developers would default to whatever framework was easiest, often Bootstrap, with no regard for design consistency. On top of this, our products spanned a wide range of tech stacks—from React to Angular to legacy systems—making standardization even more complex. While our own UX team was excited to adopt the system, gaining buy-in from scattered dev teams with ingrained habits and varying technical maturity proved to be a significant challenge.",
    solution: "I led the creation of a scalable, atomic-design-based component library that included foundational styles, UI elements, and full application and website modules. The system was built on top of ShadCN components, styled with Tailwind utility classes, and structured so developers could easily plug in tokens and variables named to match familiar Tailwind conventions. We created Figma kits with synchronized tokens and hosted weekly working sessions to walk both designers and developers through how to apply the system. I also helped standardize the tech stack across teams to ensure optimal compatibility and performance. All new components or additions were reviewed through a governance process I managed directly, ensuring everything aligned with system standards and patterns. Our support model included demos, documentation, and open-door access to answer implementation questions.",
    results: "The design system became the visual and functional foundation of our enterprise UI, shifting us from a scattered design landscape to a cohesive ecosystem. While the numbers are difficult to quantify precisely, the difference was night and day—what were once wildly inconsistent products are now part of a unified suite, delivering higher-quality experiences and dramatically reducing design and development inefficiencies. Most importantly, the system elevated the quality of work across the entire team, empowering designers and developers to ship faster, more confidently, and with a shared standard for excellence.",
    color: "bg-purple-500"
  },
  {
    id: 2,
    slug: "genfei-chatbot",
    title: "GenFEI Chatbot",
    shortDescription: "Complex AI chatbot designed for the Research & Engineering team at Kimberly-Clark. Connected to multiple different knowledge bases.",
    fullDescription: "An advanced AI-powered chatbot interface that connects to multiple knowledge bases to provide intelligent responses across various domains. The system features natural language processing, contextual understanding, and seamless integration with existing workflows.",
    images: {
      hero: "/projectImages/desktop/gen-fei.png",
      gallery: [
        "/projectImages/projectContent/fei-1.png",
        "/projectImages/projectContent/fei-2.png",
      ]
    },
    tags: ["AI", "Chatbot", "Enterprise", "Interface Design"],
    year: "2023",
    client: "Kimberly-Clark",
    role: ["UX Research", "UI/UX Design", "Frontend Development"],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    challenges: "The GenFEI Chatbot was our first attempt at building an AI tool that could intelligently pull from multiple data sources to support the Research & Engineering (R&E) team's innovation work. These were highly technical users who needed quick, reliable access to everything from consumer product data to dense engineering documentation. The existing search experience was fragmented, often requiring users to know exactly where to look. Designing an intuitive interface for such a powerful system posed several unique challenges—especially when factoring in the wide range of data sources, the need for output control, and the importance of maintaining context across complex, multi-turn queries.",
    solution: "I designed and developed a conversational interface that offered clarity, flexibility, and control. The UI included dynamic follow-up suggestions based on past queries, allowing users to explore topics without having to manually rephrase their questions. A key feature was the adjustable temperature control—a simple but powerful tool that let users choose whether they wanted strictly accurate answers for validation or more creative, high-level ideation. To handle the variety of data sources, the system used routing logic under the hood, while the frontend ensured that users didn't feel the complexity. The entire experience was designed to feel seamless, with progressive disclosure patterns to surface advanced options only when needed. Feedback mechanisms included quick downvote buttons and more structured feedback loops through office hours, which helped us continuously refine the experience. As the first chatbot of its kind internally, GenFEI became the foundation for future AI tools, setting the design and usability standard for all that followed.",
    results: "The final product was clean, modern, and highly polished—far beyond what most users expected from an internal tool. I used Framer Motion to bring the interface to life with subtle transitions, animated input feedback, and smooth message loading that made the entire chat experience feel fast and responsive. These micro-interactions weren't just for show—they made the tool more enjoyable and intuitive to use, especially for complex, multi-turn queries.\n\nThe design and frontend implementation gave the GenFEI chatbot a level of finesse typically reserved for customer-facing products, helping it gain immediate traction and setting the tone for future internal AI tools at Kimberly-Clark.",
    color: "bg-green-500"
  },
  {
    id: 3,
    slug: "iris-analytics",
    title: "IRIS Analytics Dashboard",
    shortDescription: "Complex analytic dashboard innovating the analytics experience at Kimberly-Clark. Focus on Raw Insights and Predictive Analytics.",
    fullDescription: "IRIS is an innovative analytics platform that reimagines how promotional data is visualized and analyzed. The dashboard provides actionable insights through advanced data visualization techniques and predictive analytics.",
    images: {
      hero: "/projectImages/desktop/IRIS.png",
      gallery: [
        "/projectImages/projectContent/iri-1.png",
        "/projectImages/projectContent/iri-2.png",
      ]
    },
    tags: ["Enterprise", "Data Visualization", "Analytics", "Dashboard"],
    year: "2023",
    client: "Kimberly-Clark",
    role: ["Data Visualization Design", "UX Research", "UX Design"],
    technologies: ["Figma", "Data Visualization", "PowerBI"],
    challenges: "IRIS was the most complex analytics product I've worked on at Kimberly-Clark. The core challenge was transforming deeply complex promotional and predictive data into tools that were not only powerful but usable. There were no existing dashboards to build from—many of the tools, like the Scenario Planner and Netflow model, were entirely new concepts for the business. Users needed to understand predictive demand, simulate promotional changes, and see the impact of cross-brand dynamics (e.g., how Pampers sales affected Huggies) in a clear, intuitive way. The legacy reporting tools were cluttered, hard to navigate, and lacked the ability to support strategic, forward-looking planning.",
    solution: "We designed IRIS from the ground up, guided by extensive user research, interviews, and continuous testing. Each tool in the platform—like the Demand Planner, Scenario Planner, and Netflow visualizer—was crafted to serve a specific predictive need while remaining easy to understand at a glance. The Scenario Planner let users simulate pricing and promotional strategies over time, while the Demand Planner visualized expected shifts based on seasonality and product performance.I created guided workflows for each module to walk users through complex data-driven tasks without overwhelming them. We applied consistent visual patterns, emphasized interpretability, and used clear visual hierarchies to reduce friction across the experience. Every screen was vetted with stakeholders and power users to ensure clarity, accuracy, and impact.",
    results: "The final IRIS platform introduced entirely new ways to interact with predictive data. Although it was built for highly technical analytics users, the design ensured that even complex modeling could be approached with confidence and clarity. The tools we created laid the foundation for more strategic decision-making across North America and became the gold standard for future predictive dashboards at Kimberly-Clark. The project demonstrated the power of user-centered design in transforming raw data into strategic foresight.",
    color: "bg-yellow-500"
  },
  {
    id: 4,
    slug: "web-templates",
    title: "Standardized Web Templates",
    shortDescription: "Standardized web templates for Kimberly-Clark consumer websites currently being used by almost all consumer brands at Kimberly-Clark.",
    fullDescription: "A comprehensive library of standardized web templates designed to ensure consistency across all Kimberly-Clark consumer-facing websites while maintaining flexibility for brand-specific customizations.",
    images: {
      hero: "/projectImages/desktop/web-templates.png",
      gallery: [
        "/projectImages/projectContent/web-1.png",
        "/projectImages/projectContent/web-2.png",
      ]
    },
    tags: ["Consumer Websites", "Standardization", "Templates"],
    year: "2022",
    client: "Kimberly-Clark",
    role: ["Template Design", "Scalability Planning", "Reusable Flexible Components"],
    technologies: ["Figma", "User Testing", "Responsive Design"],
    challenges: "The original goal was simply to redesign the Depend Australia site—a small, content-light brand page. But halfway through, leadership decided this work would become the foundation for all consumer brand websites across Kimberly-Clark. That meant we had to quickly pivot, taking a design meant for a simple site and retrofitting it into a flexible, scalable system that could handle vastly different content structures—including massive sites like Huggies with hundreds of articles, product pages, and dynamic content needs. We also had to account for regional differences, brand-specific requirements, and legacy content variations—without any upfront documentation or centralized design standards to rely on.",
    solution: "We conducted a full audit across consumer brand websites in every region, cataloging layout needs, CMS requirements, localization quirks, and edge cases. From there, we created a modular design system of web templates—each built to handle a variety of content types while maintaining strict brand consistency.Each template was designed with flexibility in mind: responsive layouts, swappable content blocks, and customizable styling options that allowed each brand to maintain its own identity. I helped lead the frontend implementation and documentation, ensuring that content teams and developers could apply the templates confidently regardless of the region or site complexity. Despite the unexpected scope change, we turned a narrow redesign into a global design foundation.",
    results: "The final template system struck a balance between standardization and flexibility, enabling brands to maintain their unique voices without sacrificing consistency. While it began with a single market site, it ultimately became the baseline for all future consumer brand websites—dramatically streamlining development workflows and aligning the company's digital presence across markets.",
    color: "bg-red-500"
  },
  {
    id: 5,
    slug: "pullups-research",
    title: "Pull-Ups Potty Training Research",
    shortDescription: "Comprehensive user research focusing on finding a real problem parents face and designing a digital solution that helps.",
    fullDescription: "Comprehensive user research and prototype development for a mobile application designed to support parents and children through the potty training journey with Pull-Ups products.",
    images: {
      hero: "/projectImages/desktop/pull-ups-research.png",
      gallery: [
        "/projectImages/projectContent/pu-1.png",
        "/projectImages/projectContent/pu-2.png",
      ]
    },
    tags: ["User Research", "Mobile App", "Prototyping", "Parenting"],
    year: "2023",
    client: "Kimberly-Clark",
    role: ["UX Research", "Prototype Development", "User Testing"],
    technologies: ["Figma", "Protopie", "UserTesting.com", "Figjam"],
    challenges: "Pull-Ups set out to create a mobile app to support parents during potty training while promoting their brand. The ask seemed simple: find a real problem parents face and design a digital solution that helps. We began the project with open minds and a research-first approach—but halfway through, we found out that while we were presenting our concepts and research analysis, the brand had already spent $100K on a completely unvalidated, pre-drawn app concept created outside the UX team. Our challenge shifted from designing a good product to trying to prove—through actual research—that their idea wasn't going to work. And we did exactly that.",

    solution: "We interviewed over 50 parents of children currently potty training, recently finished, or just starting the journey. Through rigorous synthesis, we identified two core truths: The only people interested in downloading a potty training app are first-time parents—everyone else either already figured it out or didn't have time. The most common pain point wasn't about tracking progress, but about accidents—especially during screen time, when kids are too distracted to notice when they need to go. From this, we created an Opportunity Solution Tree, mapping our interview insights to pain points, then to solution concepts. The standout idea was a built-in video player that pauses at intervals with potty reminders—transforming screen time into a training tool. We prototyped this and brought it back to parents who immediately saw the value: it was passive, supportive, and didn't require constant effort from the parent.",

    results: "Despite overwhelmingly positive feedback on our concept, the Pull-Ups team chose to move forward with their original $100K sketch: a potty tracking app complete with a Candyland-style progress board and virtual stickers. We user-tested it anyway—just to be sure—and results were clear: parents had zero interest in manually logging every accident or success. 'I don't have time for this' was the most common reaction. We delivered the findings. They ignored them. We were removed from the project. A year later, the app launched. A year after that, it was pulled from stores due to low engagement. This project didn't end with a live product we were proud of—but it remains one of the clearest case studies in the cost of ignoring user research in favor of gut instincts and expensive illustrations.",

    color: "bg-indigo-500"
  },
  {
    id: 6,
    slug: "buyerspring",
    title: "BuyerSpring Real Estate Platform",
    shortDescription: "Real estate website focused on a new way to buy and sell homes. Combining a unique concept with user-centered design for a personalized buying experience.",
    fullDescription: "An innovative real estate platform that reimagines the home buying and selling experience through technology, transparency, and user-centered design. Please note: this project is not live, but is an in progress build that I have been working on the functionality for. The design is a work in progress, but the functionality is fully functional.",
    images: {
      hero: "/projectImages/desktop/buyer-spring.png",
      gallery: [
        "/projectImages/projectContent/bs-1.png",
        "/projectImages/projectContent/bs-2.png",
      ]
    },
    tags: ["Real Estate", "Platform", "Innovation", "User Experience"],
    year: "2021",
    client: "BuyerSpring",
    role: ["Product Design", "Frontend Development", "User Research"],
    technologies: ["Next.js", "Tailwind CSS", "Supabase", "Mapbox"],
    challenges: "The traditional home-buying experience is inefficient and impersonal. Most platforms show buyers every available listing, regardless of how well it fits their needs, and sellers have little visibility into which buyers are a strong match for their property. BuyerSpring set out to change that—but the challenge was designing a system that could intelligently connect buyers and sellers based on deeper data. On top of that, the real estate industry is notoriously resistant to change, so launching a new platform meant building trust with both agents and buyers, validating the concept regionally, and proving early on that a smarter, more targeted experience could benefit all parties involved.",

    solution: "I built BuyerSpring as a match-first platform—focusing not on listing everything, but on showing the right homes to the right people. The product gathers meaningful inputs from buyers (budget, desired features, lifestyle fit, etc.) and compares them with a curated database of seller properties using a custom scoring algorithm. The UX was crafted to feel personal and assistive rather than transactional—buyers get a clear sense of why a home matches them, and sellers gain insight into which buyers are most likely to convert. We also built features for real estate professionals to track and manage matches, creating value across the entire pipeline.",

    results: "BuyerSpring is on track to successfully reframed how buyers and sellers interact—transforming the experience from 'search and hope' to 'match and engage.' The eventual Tacoma pilot will allow us to refine both the scoring system and user flows, proving that even in a competitive space like real estate, there's demand for a smarter, more personalized approach. More importantly, it validated the hypothesis that when you focus on quality matches over quantity of listings, you create a better experience for everyone involved—buyers, sellers, and agents alike.",
    color: "bg-pink-500"
  },
  {
    id: 7,
    slug: "huggies-website",
    title: "Huggies Website Redesign",
    shortDescription: "Redesigned the Huggies website, focusing on improving user experience, increasing engagement, and driving product discovery for parents.",
    fullDescription: "A complete redesign of the Huggies consumer website focused on improving user experience, increasing engagement, and driving product discovery for parents.",
    images: {
      hero: "/projectImages/desktop/huggies.png",
      gallery: [
        "/projectImages/projectContent/hug-1.png",
        "/projectImages/projectContent/hug-2.png",
      ]
    },
    tags: ["Website Redesign", "Consumer Brand", "E-commerce", "Parenting"],
    year: "2022",
    client: "Kimberly-Clark",
    role: ["UI/UX Design", "User Research", "User Testing"],
    technologies: ["User Testing", "Figma", "Figjam", "Maze"],
    challenges: "The Huggies website had grown bloated over time—stacked with years of content, outdated templates, inconsistent UI elements, and a navigation system that made it difficult for users (especially new parents) to find what they needed quickly. With millions of annual visitors, the stakes were high: the site needed to balance brand storytelling, educational content, and product promotion without overwhelming users. The biggest challenge was creating a user experience that spoke to stressed-out, sleep-deprived parents—often visiting the site for help, guidance, or reassurance—while also modernizing the backend and visual system to match current UX standards and brand tone.",
    solution: "We began with in-depth user research and analytics reviews to understand where users were dropping off, where they were engaging, and what information they were actually looking for. Key insights included the need for faster access to age-specific content, clearer product explanations, and softer, more empathetic tone throughout the experience. We restructured the site architecture to prioritize parenting guidance and product relevance by life stage, not just product lines. From a visual and technical standpoint, we rebuilt the site using our enterprise component library, ensuring consistency, accessibility, and scalability across global markets. Modular content blocks and dynamic page templates gave regional teams flexibility without sacrificing cohesion. Special attention was given to performance and mobile UX, knowing that most users are visiting during chaotic parenting moments—from their phones.",
    results: "The redesigned Huggies site delivered a significantly more supportive, modern, and usable experience for parents. The new IA made it easier to access parenting content by stage and need, while the refreshed UI elevated trust and visual appeal. Product pages became more conversion-focused without losing their educational support tone, and performance optimizations improved speed and engagement across mobile. The redesign also served as a benchmark for other global Kimberly-Clark brands, demonstrating how to modernize legacy content-heavy sites while still deeply honoring the emotional state and needs of the user. The average time on site increased by 30%, and the bounce rate decreased by 35%.",
    color: "bg-orange-500"
  },
  {
    id: 8,
    slug: "defoor-development",
    title: "DEFOOR Property Development",
    shortDescription: "Custom website for DEFOOR Property Development, showcasing their work and services. Focus on storytelling and showcasing their portfolio.",
    fullDescription: "A sophisticated website for a luxury property development company, showcasing their portfolio and services with elegant design and seamless user experience.",
    images: {
      hero: "/projectImages/desktop/defoor.png",
      gallery: [
        "/projectImages/projectContent/d4-1.png",
        "/projectImages/projectContent/d4-2.png",
      ]
    },
    tags: ["Property Development", "Brand Site", "Local Company"],
    year: "2021",
    client: "DEFOOR Development",
    role: ["Web Design", "Frontend Development", "Content Strategy"],
    technologies: ["Next.js", "Tailwind CSS", "Sanity.io", "Animations", "SEO"],
    challenges: "DEFOOR, a long-standing, family-owned property development company, had a website that failed to reflect the depth, scale, and legacy of their work. The original site lacked structure, visual cohesion, and a clear narrative about who they were and what they built. With decades of development experience across residential, commercial, and mixed-use spaces, their portfolio was impressive—but buried under vague copy and outdated design. The challenge was to redesign the site to properly represent the credibility, pride, and local roots of the company—while making their extensive portfolio approachable and visually engaging.",
    solution: "I approached the redesign with a focus on clarity, storytelling, and legacy. The homepage was restructured to immediately communicate who DEFOOR is and what makes their work distinct. Clean typography, generous spacing, and subtle transitions gave the site a modern but grounded feel—fitting for a local developer with deep community ties. I built out a modular project showcase system that highlighted each development with high-res imagery, brief context, and relevant tags (e.g., commercial, multi-family, etc.). I also introduced sections for company history, services, and a more humanized leadership profile to reflect the personal nature of the brand. The result was a site that felt both professional and personal—aligned with their identity as trusted local developers.",
    results: "The redesigned DEFOOR site transformed how the company presents itself to partners, investors, and the local community. Their portfolio is now easy to browse and visually impactful, their story is clear and authentic, and the site finally reflects the pride they take in building for their region. While a personal project, it demonstrated how thoughtful design can elevate a business's digital presence—especially for companies with deep offline credibility but underwhelming online storytelling.",
    color: "bg-red-500"
  }
];

// Helper function to get project by slug
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find(project => project.slug === slug);
}

// Helper function to get all project slugs
export function getAllProjectSlugs(): string[] {
  return projectsData.map(project => project.slug);
}

// Helper function to get related projects (excluding current)
export function getRelatedProjects(currentSlug: string, limit: number = 4): ProjectData[] {
  return projectsData
    .filter(project => project.slug !== currentSlug)
    .slice(0, limit);
} 