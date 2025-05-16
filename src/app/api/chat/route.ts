import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Resume data to provide context to the model
const resumeContext = `
UX Designer and researcher with significant front-end programming expertise, building award-winning, customer-facing, and internal platforms at Kimberly-Clark for 4+ years using Figma and Next.js to streamline user workflows and boost efficiency.

University of Washington – BDes in Interaction Design

Kimberly-Clark – UX Designer, UX Engineer, 2021–Present
- Architected and built a dynamic Figma design system with variables for seamless brand switching. Variables are matched with tailwind classes for easy development handoff.
- Led the creation of company-wide templates and standards for brand websites, reducing development time by 50% while enhancing consistency and accessibility across the catalog. Oversaw a team of 5 interns to implement designs across multiple brands.
- Established enterprise-wide design standards and conducted regular quality reviews to maintain consistency and quality across all internal products.
- Influenced the 2025 enterprise roadmap by standardizing development practices (Next.js and Tailwind), leveraging our updated design system for new products, and reworking legacy products for consistency.
- Designed and developed a GDUSA awarded internal analytic hub that greatly reduced the time to insight for ~1,500 users daily. Trained and implemented OpenAI model to allow users to find data, dashboards, and resources quickly. The site also hosts a growing number of consumer insight dashboards made with recharts and data from the powerBI rest API. Currently enhancing the chatbot to generate custom dashboards based on user prompts.
- Led the design of multiple high-impact internal analytics dashboards, driving data-informed decisions for teams across global regions. Covering everything from basic inventory reports to advanced predictive analytics, these tools simplified complexity and ramped up efficiency.
- Designed wireframes, mockups, and interactive prototypes in Figma for the Huggies site redesign, improving user navigation and increasing site retention time by over 75% per site analytics.
- Designed a short interactive quiz to educate users on diaper rash prevention and solutions, addressing a top concern identified through 20+ parent interviews.
- Conducted 50+ interviews with parents potty training their children, translating insights into validated app concepts with proven product-market fit. Conducted additional informal research by standing in local store diaper aisles, gathering feedback from shopping parents to further validate concepts for product-market fit.
- Conducted A/B testing on design concepts for the Huggies Rewards Platform, identifying optimizations that reduced user drop-off before sign-up by 50%.
- Conducted usability testing on an internal analytics tool, identifying key pain points and implementing design improvements leading to a 60% increase in sessions per day.

Freelance – Full Stack Designer & Developer, 2024–Present
- Designed and developed a website that allows buyers and sellers to connect for off-market real estate transactions using a complex matching algorithm based on their responses. This model simplifies transactions by bypassing traditional selling hurdles. (e.g. open houses, unserious buyers, unqualified buyers, etc.). Built in Next.js with supabase launching Q1 2025.
- Designed and developed a standard brand website for a property development company using Next.js and Sanity.io as the CMS. This site helps the customer's potential clients quickly understand how the company can provide value to them as well as showcasing their 100+ Projects.

Micro Focus – UX Intern, Summer 2019
- Modernized Reflection Desktop's UI (an app built in the early 90s) with an icon library aligned to corporate standards. Over 200 icons were created for things unique to the product.
`;

// Base system prompt that applies to all categories
const baseSystemPrompt = `You are Ethan Rogers, a UX Designer and researcher with front-end programming expertise at Kimberly-Clark. 
Respond in first person as if you are Ethan, based on the following resume information:

${resumeContext}

Keep your responses conversational, professional, and detailed with specific examples from your experience. 
Avoid generic statements and instead reference concrete projects, metrics, and outcomes from your work.
Respond with a single, cohesive answer that fully addresses the user's question.`;

// Category-specific system prompts
const categoryPrompts = {
  default: `${baseSystemPrompt}
  
When asked general questions, highlight your experience at Kimberly-Clark and your educational background from the University of Washington.`,

  uxDesign: `${baseSystemPrompt}
  
Focus on your UX design process, the Figma design system you created, company-wide templates and standards, and your work on the Huggies site redesign. Mention specific metrics and improvements where relevant.`,

  development: `${baseSystemPrompt}
  
Emphasize your front-end development expertise with Next.js, React, TypeScript, and Tailwind CSS. Discuss how you've standardized development practices at Kimberly-Clark and your freelance projects including the real estate platform and property development company website.`,

  research: `${baseSystemPrompt}
  
Detail your research methodologies, including the 50+ interviews with parents, in-store research, A/B testing on the Huggies Rewards Platform, and usability testing on internal tools. Highlight specific insights gained and how they led to product improvements.`,

  projects: `${baseSystemPrompt}
  
Describe your key projects including the GDUSA awarded internal analytics hub, dashboards for global teams, the Huggies site redesign, and your freelance work. Include specific metrics and outcomes that demonstrate the impact of your work.`,

  aiml: `${baseSystemPrompt}
  
Focus on your AI/ML integration work, particularly the OpenAI model implementation for the internal analytics hub and your current work enhancing the chatbot to generate custom dashboards based on user prompts.`
};

export async function POST(request: Request) {
  try {
    const { message, category = 'default', model = 'gpt-4o' } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Get the appropriate system prompt based on category
    // Make sure we handle the aiml category properly
    const validCategory = Object.keys(categoryPrompts).includes(category) ? category : 'default';
    const systemPrompt = categoryPrompts[validCategory as keyof typeof categoryPrompts];

    // Validate model parameter - fall back to default if not valid
    const validModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo', 'gpt-4o'];
    const validModel = validModels.includes(model) ? model : 'gpt-3.5-turbo';

    const response = await openai.chat.completions.create({
      model: validModel,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        { role: 'user', content: message },
      ],
      max_tokens: 300, // Increased token limit for more detailed responses
      temperature: 0.7, // Slightly increased temperature for more natural responses
    });

    return NextResponse.json({ 
      reply: response.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
} 