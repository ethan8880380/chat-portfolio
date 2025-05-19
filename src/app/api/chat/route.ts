import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { categoryPrompts as trainingPrompts, validModels, additionalContext } from '@/lib/chat-training';

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

// Base system prompt
const systemPrompt = `You are a helpful AI assistant. Keep your responses concise and relevant to the conversation.`;

// Category-specific system prompts
const categoryPrompts = {
  default: `${systemPrompt}
  
When asked general questions, highlight your experience at Kimberly-Clark and your educational background from the University of Washington.`,

  uxDesign: `${systemPrompt}
  
Focus on your UX design process, the Figma design system you created, company-wide templates and standards, and your work on the Huggies site redesign. Mention specific metrics and improvements where relevant.`,

  development: `${systemPrompt}
  
Emphasize your front-end development expertise with Next.js, React, TypeScript, and Tailwind CSS. Discuss how you've standardized development practices at Kimberly-Clark and your freelance projects including the real estate platform and property development company website.`,

  research: `${systemPrompt}
  
Detail your research methodologies, including the 50+ interviews with parents, in-store research, A/B testing on the Huggies Rewards Platform, and usability testing on internal tools. Highlight specific insights gained and how they led to product improvements.`,

  projects: `${systemPrompt}
  
Describe your key projects including the GDUSA awarded internal analytics hub, dashboards for global teams, the Huggies site redesign, and your freelance work. Include specific metrics and outcomes that demonstrate the impact of your work.`,

  aiml: `${systemPrompt}
  
Focus on your AI/ML integration work, particularly the OpenAI model implementation for the internal analytics hub and your current work enhancing the chatbot to generate custom dashboards based on user prompts.`
};

// Map of keywords to project images
const projectImages = {
  analytics: "/projectImages/desktop/comm-analytics.png",
  design: "/projectImages/desktop/design-system.png",
  development: "/projectImages/desktop/dev-work.png",
  research: "/projectImages/desktop/research.png",
  default: "/projectImages/desktop/comm-analytics.png"
};

export async function POST(request: Request) {
  try {
    const { message, messages = [], category = 'default', model = 'gpt-4' } = await request.json();

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

    // Prepare conversation history
    const conversationHistory = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      content: msg.content
    }));

    // Add the current message
    conversationHistory.push({ role: 'user', content: message });

    // Get the appropriate system prompt based on category
    const validCategory = Object.keys(trainingPrompts).includes(category) ? category : 'default';
    let systemPrompt = trainingPrompts[validCategory as keyof typeof trainingPrompts];

    // Add relevant additional context based on the message content
    const lowerMessage = message.toLowerCase();
    
    // Check for general introduction/about me questions
    if (lowerMessage.includes('tell me about yourself') || 
        lowerMessage.includes('who are you') || 
        lowerMessage.includes('your background') ||
        lowerMessage.includes('your experience')) {
      systemPrompt = trainingPrompts.default;
    }
    
    // Check for role-specific questions
    if (lowerMessage.includes('role') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      systemPrompt = trainingPrompts.uxDesign;
      if (lowerMessage.includes('developer') || lowerMessage.includes('coding')) {
        systemPrompt = trainingPrompts.development;
      }
    }
    
    // Add specific project context
    if (lowerMessage.includes('analytics') || lowerMessage.includes('data')) {
      systemPrompt += `\n\n${additionalContext.commercialAnalytics}`;
      if (lowerMessage.includes('iris') || lowerMessage.includes('predictive')) {
        systemPrompt += `\n\n${additionalContext.irisAnalytics}`;
      }
    }
    if (lowerMessage.includes('supply chain') || lowerMessage.includes('logistics')) {
      systemPrompt += `\n\n${additionalContext.supplyChain}`;
    }
    if (lowerMessage.includes('design system') || lowerMessage.includes('figma')) {
      systemPrompt += `\n\n${additionalContext.designSystem}`;
    }
    if (lowerMessage.includes('huggies') || lowerMessage.includes('redesign')) {
      systemPrompt += `\n\n${additionalContext.huggiesRedesign}`;
    }
    if (lowerMessage.includes('real estate') || lowerMessage.includes('freelance')) {
      systemPrompt += `\n\n${additionalContext.realEstatePlatform}`;
    }
    
    // Add personal context
    if (lowerMessage.includes('philosophy') || lowerMessage.includes('approach')) {
      systemPrompt += `\n\n${additionalContext.designPhilosophy}`;
    }
    if (lowerMessage.includes('workflow') || lowerMessage.includes('development')) {
      systemPrompt += `\n\n${additionalContext.developmentApproach}`;
    }
    if (lowerMessage.includes('research') || lowerMessage.includes('testing')) {
      systemPrompt += `\n\n${additionalContext.researchMethods}`;
    }
    if (lowerMessage.includes('project') || lowerMessage.includes('management')) {
      systemPrompt += `\n\n${additionalContext.projectManagement}`;
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('goals')) {
      systemPrompt += `\n\n${additionalContext.careerGoals}`;
    }

    // Determine which image to return based on the message content
    let selectedImage: string | null = null;
    if ((lowerMessage.includes('analytics') || lowerMessage.includes('data')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
      selectedImage = projectImages.analytics;
    } else if ((lowerMessage.includes('design') || lowerMessage.includes('figma')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
      selectedImage = projectImages.design;
    } else if ((lowerMessage.includes('development') || lowerMessage.includes('code')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
      selectedImage = projectImages.development;
    } else if ((lowerMessage.includes('research') || lowerMessage.includes('user research')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
      selectedImage = projectImages.research;
    }

    // Validate model parameter - fall back to default if not valid
    const validModel = validModels.includes(model) ? model : 'gpt-3.5-turbo';

    try {
      const response = await openai.chat.completions.create({
        model: validModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          ...conversationHistory
        ],
        max_tokens: 300,
        temperature: 1.0,
      });

      return NextResponse.json({ 
        reply: response.choices[0].message.content,
        image: selectedImage || undefined
      });
    } catch (openaiError: unknown) {
      console.error('OpenAI API error:', openaiError);
      return NextResponse.json(
        { error: openaiError instanceof Error ? openaiError.message : 'Error communicating with OpenAI' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error processing your request' },
      { status: 500 }
    );
  }
} 