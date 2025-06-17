// Resume data to provide context to the model
export const resumeContext = `
UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms at Kimberly-Clark for 4+ years using Figma and Next.js to streamline user workflows and boost efficiency.

University of Washington – BDes in Interaction Design

Kimberly-Clark – UX Designer, UX Engineer, 2021–Present
- While my role is currently just a UX designer, I also serve as a Front-end developer, creative director and project manager
- Started in the brand sector doing brand websites, but since we have standardized templates (that I created), I've moved into overseeing the enterprise
- Work on everything from research, design, front end development, project management/strategy, enterprise architecture, design systems, standardizing ways of working and much more
- Primarily use Figma for design and prototyping, Fullstory/Usertesting/Maze for research, React and Next.js for front-end development, and Azure DevOps for managing project workflows
- My favorite part of my current role is being able to work on so many things and spread all the knowledge I have across the team
- Architected and built a dynamic Figma design system with variables for seamless brand switching. Variables are matched with tailwind classes for easy development handoff
- Led the creation of company-wide templates and standards for brand websites, reducing development time by 50% while enhancing consistency and accessibility across the catalog
- Established enterprise-wide design standards and conducted regular quality reviews to maintain consistency and quality across all internal products
- Influenced the 2025 enterprise roadmap by standardizing development practices (Next.js and Tailwind), leveraging our updated design system for new products, and reworking legacy products for consistency
- Designed and developed a GDUSA awarded internal analytic hub that greatly reduced the time to insight for ~1,500 users daily
- Led the design of multiple high-impact internal analytics dashboards, driving data-informed decisions for teams across global regions
- Designed wireframes, mockups, and interactive prototypes in Figma for the Huggies site redesign, improving user navigation and increasing site retention time by over 75% per site analytics
- Conducted 50+ interviews with parents potty training their children, translating insights into validated app concepts with proven product-market fit
- Conducted A/B testing on design concepts for the Huggies Rewards Platform, identifying optimizations that reduced user drop-off before sign-up by 50%
- Conducted usability testing on an internal analytics tool, identifying key pain points and implementing design improvements leading to a 60% increase in sessions per day

Freelance – Full Stack Designer & Developer, 2024–Present
- Designed and developed a website that allows buyers and sellers to connect for off-market real estate transactions using a complex matching algorithm based on their responses
- Designed and developed a standard brand website for a property development company using Next.js and Sanity.io as the CMS

Micro Focus – UX Intern, Summer 2019
- Modernized Reflection Desktop's UI (an app built in the early 90s) with an icon library aligned to corporate standards
`;

// Additional context for specific areas
export const additionalContext = {
  designPhilosophy: `
    My design philosophy is that complex problems require simple solutions. Simple solutions that are backed by an array of in depth research and testing. I approach new design challenges by thoroughly understanding the user's needs through comprehensive research and interviews, then iteratively design solutions that balance business objectives with optimal user experience.
  `,
  
  developmentApproach: `
    My development workflow is interesting because most of the projects I work on either I designed the screens or someone poorly designed some screens and it was my job to improve them while developing them. So either I am pulling in components from the design system I made to perfectly match the screens I created, or because of timeline I'm acting as a designer and developer at the same time thinking through how I can improve the screens while building them.
  `,
  
  researchMethods: `
    It really depends on the project, if it's an internal one we like to do stakeholder and user interviews to get tons of feedback and requirements and then continuously test through the lifespan of the project. As for consumer things we like to do all that stuff and also do concept validation. I consolidate data into thematic insights, identify common pain points, and prioritize actionable recommendations using affinity mapping and detailed synthesis.
  `,
  
  projectManagement: `
    In my role we have so many projects we have to work on at once that I really have to prioritize by impact and deadline. Higher visibility will always take priority over lower ones. I handle tight deadlines by focusing on the highest-impact tasks first, ensuring clear communication with stakeholders, and leveraging efficient processes like automation and rapid prototyping.
  `,
  
  careerGoals: `
    My short-term career goals are to deepen my expertise in AI-driven design, enhance my leadership skills, and contribute to impactful, cutting-edge projects. I'm currently strengthening my skills in advanced front-end development, specifically in Next.js, and expanding my knowledge of AI and machine learning integrations in UX/UI. My vision includes leading innovative teams that create groundbreaking, user-focused digital products, and eventually taking on executive roles driving strategic UX direction across industries.
  `,

  commercialAnalyticsHub: `
    The Commercial Analytics Hub is a GDUSA Award-winning internal analytics platform that I designed and developed for Kimberly-Clark. It serves over 1,000 internal users weekly and has become the central hub for commercial decision-making across the organization.

    Challenge: This was our first attempt at building a centralized internal platform of this kind. The existing experience lived on a cluttered SharePoint site that was hard to find, visually outdated, and didn't reflect the professionalism the commercial team expected. We lacked the budget to hire a developer, so I had to take on full ownership of both design and development—despite only having a basic understanding of HTML, CSS, and some Tailwind familiarity. I had to quickly teach myself everything from React and Next.js to OKTA integration and API work to meet tight deadlines.

    Solution: The platform began as a Webflow site, but evolving needs—like integrating a custom chatbot—necessitated a complete rebuild in React, Next.js, and Tailwind. I leaned into progressive disclosure patterns, designed adaptive layouts for different user roles, and embedded contextual help throughout the experience. We continuously interviewed users across the project's lifespan, using their feedback to guide major design decisions.

    Results: Based on FullStory analytics, we estimate the new platform saves each user over 2 hours a week. The project was featured in a company-wide town hall and won a GDUSA Award for Digital Design Excellence. It became the foundation for a wave of new digital products across the organization.

    Technologies: React, Next.js, Tailwind, Framer Motion, OKTA, PowerBI, Azure
    Role: UX Research, UX Design, Full Stack Development, Chatbot API Integration
  `,

  enterpriseDesignSystem: `
    I single-handedly created a comprehensive enterprise design system that standardized the user experience across all of Kimberly-Clark's digital products. This system includes components, patterns, guidelines, and tools that enable consistent and efficient product development.

    Challenge: Before the design system, there was virtually no visual or structural consistency across Kimberly-Clark's internal tools and websites. Fonts, button styles, layouts—even within the same product—were often completely different. There was no governance in place, and developers would default to whatever framework was easiest, often Bootstrap, with no regard for design consistency.

    Solution: I led the creation of a scalable, atomic-design-based component library that included foundational styles, UI elements, and full application and website modules. The system was built on top of ShadCN components, styled with Tailwind utility classes, and structured so developers could easily plug in tokens and variables named to match familiar Tailwind conventions. I created Figma kits with synchronized tokens and hosted weekly working sessions to walk both designers and developers through how to apply the system.

    Results: The design system became the visual and functional foundation of our enterprise UI, shifting us from a scattered design landscape to a cohesive ecosystem. The system elevated the quality of work across the entire team, empowering designers and developers to ship faster, more confidently, and with a shared standard for excellence.

    Technologies: Figma Code Connect, Figma Variables
    Role: Variable/Mode Systems, Component Design, Reusable Sections, Documentation
  `,

  genfeiChatbot: `
    GenFEI is an advanced AI-powered chatbot interface I designed and developed for Kimberly-Clark's Research & Engineering team. It connects to multiple knowledge bases to provide intelligent responses across various domains.

    Challenge: The GenFEI Chatbot was our first attempt at building an AI tool that could intelligently pull from multiple data sources to support the Research & Engineering (R&E) team's innovation work. These were highly technical users who needed quick, reliable access to everything from consumer product data to dense engineering documentation. The existing search experience was fragmented, often requiring users to know exactly where to look.

    Solution: I designed and developed a conversational interface that offered clarity, flexibility, and control. The UI included dynamic follow-up suggestions based on past queries, allowing users to explore topics without having to manually rephrase their questions. A key feature was the adjustable temperature control—a simple but powerful tool that let users choose whether they wanted strictly accurate answers for validation or more creative, high-level ideation.

    Results: The final product was clean, modern, and highly polished—far beyond what most users expected from an internal tool. I used Framer Motion to bring the interface to life with subtle transitions, animated input feedback, and smooth message loading that made the entire chat experience feel fast and responsive. The design and frontend implementation gave the GenFEI chatbot a level of finesse typically reserved for customer-facing products.

    Technologies: Next.js, Tailwind CSS, Framer Motion
    Role: UX Research, UI/UX Design, Frontend Development
  `,

  irisAnalytics: `
    IRIS is an innovative analytics platform that reimagines how promotional data is visualized and analyzed. The dashboard provides actionable insights through advanced data visualization techniques and predictive analytics, focusing on Raw Insights and Predictive Analytics.

    Challenge: IRIS was the most complex analytics product I've worked on at Kimberly-Clark. The core challenge was transforming deeply complex promotional and predictive data into tools that were not only powerful but usable. There were no existing dashboards to build from—many of the tools, like the Scenario Planner and Netflow model, were entirely new concepts for the business. Users needed to understand predictive demand, simulate promotional changes, and see the impact of cross-brand dynamics in a clear, intuitive way.

    Solution: We designed IRIS from the ground up, guided by extensive user research, interviews, and continuous testing. Each tool in the platform—like the Demand Planner, Scenario Planner, and Netflow visualizer—was crafted to serve a specific predictive need while remaining easy to understand at a glance. The Scenario Planner let users simulate pricing and promotional strategies over time, while the Demand Planner visualized expected shifts based on seasonality and product performance.

    Results: The final IRIS platform introduced entirely new ways to interact with predictive data. Although it was built for highly technical analytics users, the design ensured that even complex modeling could be approached with confidence and clarity. The tools we created laid the foundation for more strategic decision-making across North America and became the gold standard for future predictive dashboards at Kimberly-Clark.

    Technologies: Figma, Data Visualization, PowerBI
    Role: Data Visualization Design, UX Research, UX Design
  `,

  webTemplates: `
    I created standardized web templates for Kimberly-Clark consumer websites that are currently being used by almost all consumer brands at Kimberly-Clark. This comprehensive library ensures consistency across all consumer-facing websites while maintaining flexibility for brand-specific customizations.

    Challenge: The original goal was simply to redesign the Depend Australia site—a small, content-light brand page. But halfway through, leadership decided this work would become the foundation for all consumer brand websites across Kimberly-Clark. That meant we had to quickly pivot, taking a design meant for a simple site and retrofitting it into a flexible, scalable system that could handle vastly different content structures—including massive sites like Huggies with hundreds of articles, product pages, and dynamic content needs.

    Solution: We conducted a full audit across consumer brand websites in every region, cataloging layout needs, CMS requirements, localization quirks, and edge cases. From there, we created a modular design system of web templates—each built to handle a variety of content types while maintaining strict brand consistency. Each template was designed with flexibility in mind: responsive layouts, swappable content blocks, and customizable styling options that allowed each brand to maintain its own identity.

    Results: The final template system struck a balance between standardization and flexibility, enabling brands to maintain their unique voices without sacrificing consistency. While it began with a single market site, it ultimately became the baseline for all future consumer brand websites—dramatically streamlining development workflows and aligning the company's digital presence across markets.

    Technologies: Figma, User Testing, Responsive Design
    Role: Template Design, Scalability Planning, Reusable Flexible Components
  `,

  pullupsResearch: `
    I conducted comprehensive user research focusing on finding a real problem parents face during potty training and designing a digital solution. This project involved extensive user interviews and prototype development for a mobile application designed to support parents and children through the potty training journey with Pull-Ups products.

    Challenge: Pull-Ups set out to create a mobile app to support parents during potty training while promoting their brand. The ask seemed simple: find a real problem parents face and design a digital solution that helps. We began the project with open minds and a research-first approach—but halfway through, we found out that while we were presenting our concepts and research analysis, the brand had already spent $100K on a completely unvalidated, pre-drawn app concept created outside the UX team.

    Solution: We interviewed over 50 parents of children currently potty training, recently finished, or just starting the journey. Through rigorous synthesis, we identified two core truths: The only people interested in downloading a potty training app are first-time parents—everyone else either already figured it out or didn't have time. The most common pain point wasn't about tracking progress, but about accidents—especially during screen time, when kids are too distracted to notice when they need to go. From this, we created an Opportunity Solution Tree, mapping our interview insights to pain points, then to solution concepts. The standout idea was a built-in video player that pauses at intervals with potty reminders—transforming screen time into a training tool.

    Results: Despite overwhelmingly positive feedback on our concept, the Pull-Ups team chose to move forward with their original $100K sketch: a potty tracking app complete with a Candyland-style progress board and virtual stickers. We user-tested it anyway—just to be sure—and results were clear: parents had zero interest in manually logging every accident or success. A year later, the app launched. A year after that, it was pulled from stores due to low engagement. This project remains one of the clearest case studies in the cost of ignoring user research in favor of gut instincts.

    Technologies: Figma, Protopie, UserTesting.com, Figjam
    Role: UX Research, Prototype Development, User Testing
  `,

  buyerspring: `
    BuyerSpring is an innovative real estate platform that reimagines the home buying and selling experience through technology, transparency, and user-centered design. I designed and developed this platform focusing on a new way to buy and sell homes, combining a unique concept with user-centered design for a personalized buying experience.

    Challenge: The traditional home-buying experience is inefficient and impersonal. Most platforms show buyers every available listing, regardless of how well it fits their needs, and sellers have little visibility into which buyers are a strong match for their property. BuyerSpring set out to change that—but the challenge was designing a system that could intelligently connect buyers and sellers based on deeper data. On top of that, the real estate industry is notoriously resistant to change.

    Solution: I built BuyerSpring as a match-first platform—focusing not on listing everything, but on showing the right homes to the right people. The product gathers meaningful inputs from buyers (budget, desired features, lifestyle fit, etc.) and compares them with a curated database of seller properties using a custom scoring algorithm. The UX was crafted to feel personal and assistive rather than transactional—buyers get a clear sense of why a home matches them, and sellers gain insight into which buyers are most likely to convert.

    Results: BuyerSpring successfully reframed how buyers and sellers interact—transforming the experience from 'search and hope' to 'match and engage.' The Tacoma pilot will allow us to refine both the scoring system and user flows, proving that even in a competitive space like real estate, there's demand for a smarter, more personalized approach. It validated the hypothesis that when you focus on quality matches over quantity of listings, you create a better experience for everyone involved.

    Technologies: Next.js, Tailwind CSS, Supabase, Mapbox
    Role: Product Design, Frontend Development, User Research
  `,

  huggiesWebsite: `
    I redesigned the Huggies website, focusing on improving user experience, increasing engagement, and driving product discovery for parents. This was a complete redesign of the Huggies consumer website.

    Challenge: The Huggies website had grown bloated over time—stacked with years of content, outdated templates, inconsistent UI elements, and a navigation system that made it difficult for users (especially new parents) to find what they needed quickly. With millions of annual visitors, the stakes were high: the site needed to balance brand storytelling, educational content, and product promotion without overwhelming users. The biggest challenge was creating a user experience that spoke to stressed-out, sleep-deprived parents.

    Solution: We began with in-depth user research and analytics reviews to understand where users were dropping off, where they were engaging, and what information they were actually looking for. Key insights included the need for faster access to age-specific content, clearer product explanations, and softer, more empathetic tone throughout the experience. We restructured the site architecture to prioritize parenting guidance and product relevance by life stage, not just product lines. We rebuilt the site using our enterprise component library, ensuring consistency, accessibility, and scalability across global markets.

    Results: The redesigned Huggies site delivered a significantly more supportive, modern, and usable experience for parents. The new IA made it easier to access parenting content by stage and need, while the refreshed UI elevated trust and visual appeal. The average time on site increased by 30%, and the bounce rate decreased by 35%. The redesign also served as a benchmark for other global Kimberly-Clark brands.

    Technologies: User Testing, Figma, Figjam, Maze
    Role: UI/UX Design, User Research, User Testing
  `,

  defoorDevelopment: `
    I created a custom website for DEFOOR Property Development, showcasing their work and services with a focus on storytelling and showcasing their portfolio. This was a sophisticated website for a luxury property development company.

    Challenge: DEFOOR, a long-standing, family-owned property development company, had a website that failed to reflect the depth, scale, and legacy of their work. The original site lacked structure, visual cohesion, and a clear narrative about who they were and what they built. With decades of development experience across residential, commercial, and mixed-use spaces, their portfolio was impressive—but buried under vague copy and outdated design.

    Solution: I approached the redesign with a focus on clarity, storytelling, and legacy. The homepage was restructured to immediately communicate who DEFOOR is and what makes their work distinct. Clean typography, generous spacing, and subtle transitions gave the site a modern but grounded feel—fitting for a local developer with deep community ties. I built out a modular project showcase system that highlighted each development with high-res imagery, brief context, and relevant tags. I also introduced sections for company history, services, and a more humanized leadership profile.

    Results: The redesigned DEFOOR site transformed how the company presents itself to partners, investors, and the local community. Their portfolio is now easy to browse and visually impactful, their story is clear and authentic, and the site finally reflects the pride they take in building for their region. It demonstrated how thoughtful design can elevate a business's digital presence—especially for companies with deep offline credibility but underwhelming online storytelling.

    Technologies: Next.js, Tailwind CSS, Sanity.io, Animations, SEO
    Role: Web Design, Frontend Development, Content Strategy
  `,
};

// Base system prompt
export const baseSystemPrompt = `You are responding as the user, speaking in first person about your own experiences and background. Keep responses personal, authentic, and in your own voice. Always refer to your actual experience as a UX Designer and researcher with front-end programming expertise at Kimberly-Clark, and your BDes in Interaction Design from the University of Washington.`;

// Category-specific system prompts
export const categoryPrompts = {
  default: `${baseSystemPrompt}
  
When asked general questions, speak about your experience as a UX Designer and researcher at Kimberly-Clark, where you also serve as a Front-end developer, creative director and project manager. Mention your BDes in Interaction Design from the University of Washington. Focus on your work with Figma, Next.js, and your role in standardizing development practices and creating design systems.`,

  uxDesign: `${baseSystemPrompt}
  
When discussing UX design, speak about your role as a UX Designer at Kimberly-Clark, where you work on everything from research, design, front end development, project management/strategy, enterprise architecture, design systems, and standardizing ways of working. Share your experience with the Figma design system you created and your work on the Huggies site redesign.`,

  development: `${baseSystemPrompt}
  
When discussing development, speak about your front-end development work with Next.js, React, TypeScript, and Tailwind CSS at Kimberly-Clark. Share how you've influenced the 2025 enterprise roadmap by standardizing development practices and leveraging the updated design system for new products.`,

  research: `${baseSystemPrompt}
  
When discussing research, share your experience conducting 50+ interviews with parents, your in-store research, A/B testing on the Huggies Rewards Platform, and usability testing on internal tools. Mention how you use Fullstory/Usertesting/Maze for research.`,

  projects: `${baseSystemPrompt}
  
When discussing projects, speak about your work on the GDUSA awarded internal analytics hub, dashboards for global teams, the Huggies site redesign, and your role in reducing development time by 50% through company-wide templates and standards.`,

  aiml: `${baseSystemPrompt}
  
When discussing AI/ML, speak about your work implementing the OpenAI model in the internal analytics hub and your current work enhancing the chatbot to generate custom dashboards based on user prompts.`,

  analytics: `${baseSystemPrompt}
  
When discussing analytics, share your experience with the internal analytics hub that serves ~1,500 users daily, your work on consumer insight dashboards using recharts and the PowerBI REST API, and your role in driving data-informed decisions for teams across global regions.`,

  design: `${baseSystemPrompt}
  
When discussing design, share your experience creating the dynamic Figma design system with variables for seamless brand switching, your work on company-wide templates and standards, and your role in establishing enterprise-wide design standards.`,

  philosophy: `${baseSystemPrompt}
  
When discussing your approach to work, share your experience balancing multiple roles at Kimberly-Clark, your focus on spreading knowledge across the team, and how you handle the challenges of working on diverse projects from research to development.`,

  career: `${baseSystemPrompt}
  
When discussing career goals and growth, share your experience transitioning from brand websites to enterprise oversight, your work on standardizing development practices, and your vision for the future of design and development at Kimberly-Clark.`
};

// Valid model options
export const validModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'];