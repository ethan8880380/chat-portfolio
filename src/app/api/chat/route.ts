import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { categoryPrompts as trainingPrompts, validModels, additionalContext } from '@/lib/chat-training';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Map of keywords to project images
    const projectImages = {
      analytics: "/projectImages/desktop/comm-analytics.png",
      design: "/projectImages/desktop/design-system.png",
      development: "/projectImages/desktop/dev-work.png",
      research: "/projectImages/desktop/research.png",
      default: "/projectImages/desktop/comm-analytics.png"
    };

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