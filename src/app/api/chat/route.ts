import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { categoryPrompts as trainingPrompts, validModels, additionalContext } from '@/lib/chat-training';

// Initialize OpenAI client with timeout
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 25000, // 25 second timeout
});

export async function POST(request: Request) {
  // Add request timeout handling
  const startTime = Date.now();
  
  try {
    const { message, messages = [], category = 'default', model = 'gpt-4', selectedProject } = await request.json();

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

    // Add project-specific context if a project is selected (simplified)
    if (selectedProject) {
      systemPrompt += `\n\nFocus on the "${selectedProject}" project. Only answer questions about this specific project and redirect any off-topic questions back to this project.`;
      
      // Add specific project context (truncated for performance)
      switch (selectedProject) {
        case 'commercial-analytics-hub':
          systemPrompt += `\n\n${additionalContext.commercialAnalyticsHub.substring(0, 500)}...`;
          break;
        case 'enterprise-design-system':
          systemPrompt += `\n\n${additionalContext.enterpriseDesignSystem.substring(0, 500)}...`;
          break;
        case 'genfei-chatbot':
          systemPrompt += `\n\n${additionalContext.genfeiChatbot.substring(0, 500)}...`;
          break;
        case 'iris-analytics':
          systemPrompt += `\n\n${additionalContext.irisAnalytics.substring(0, 500)}...`;
          break;
        case 'web-templates':
          systemPrompt += `\n\n${additionalContext.webTemplates.substring(0, 500)}...`;
          break;
        case 'pullups-research':
          systemPrompt += `\n\n${additionalContext.pullupsResearch.substring(0, 500)}...`;
          break;
        case 'buyerspring':
          systemPrompt += `\n\n${additionalContext.buyerspring.substring(0, 500)}...`;
          break;
        case 'huggies-website':
          systemPrompt += `\n\n${additionalContext.huggiesWebsite.substring(0, 500)}...`;
          break;
        case 'defoor-development':
          systemPrompt += `\n\n${additionalContext.defoorDevelopment.substring(0, 500)}...`;
          break;
      }
    } else {
      // Add relevant additional context based on the message content (simplified)
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
      
      // Add specific project context (truncated for performance)
      if (lowerMessage.includes('analytics') || lowerMessage.includes('data')) {
        systemPrompt += `\n\n${additionalContext.commercialAnalyticsHub.substring(0, 300)}...`;
        if (lowerMessage.includes('iris') || lowerMessage.includes('predictive')) {
          systemPrompt += `\n\n${additionalContext.irisAnalytics.substring(0, 300)}...`;
        }
      }
      if (lowerMessage.includes('supply chain') || lowerMessage.includes('logistics')) {
        systemPrompt += `\n\n${additionalContext.commercialAnalyticsHub.substring(0, 300)}...`;
      }
      if (lowerMessage.includes('design system') || lowerMessage.includes('figma')) {
        systemPrompt += `\n\n${additionalContext.enterpriseDesignSystem.substring(0, 300)}...`;
      }
      if (lowerMessage.includes('huggies') || lowerMessage.includes('redesign')) {
        systemPrompt += `\n\n${additionalContext.huggiesWebsite.substring(0, 300)}...`;
      }
      if (lowerMessage.includes('real estate') || lowerMessage.includes('freelance')) {
        systemPrompt += `\n\n${additionalContext.buyerspring.substring(0, 300)}...`;
      }
      
      // Add personal context (truncated for performance)
      if (lowerMessage.includes('philosophy') || lowerMessage.includes('approach')) {
        systemPrompt += `\n\n${additionalContext.designPhilosophy.substring(0, 200)}...`;
      }
      if (lowerMessage.includes('workflow') || lowerMessage.includes('development')) {
        systemPrompt += `\n\n${additionalContext.developmentApproach.substring(0, 200)}...`;
      }
      if (lowerMessage.includes('research') || lowerMessage.includes('testing')) {
        systemPrompt += `\n\n${additionalContext.researchMethods.substring(0, 200)}...`;
      }
      if (lowerMessage.includes('project') || lowerMessage.includes('management')) {
        systemPrompt += `\n\n${additionalContext.projectManagement.substring(0, 200)}...`;
      }
      if (lowerMessage.includes('career') || lowerMessage.includes('goals')) {
        systemPrompt += `\n\n${additionalContext.careerGoals.substring(0, 200)}...`;
      }
    }

    // Map of keywords to project images
    const projectImages = {
      analytics: "/projectImages/desktop/comm-analytics.png",
      design: "/projectImages/desktop/design-system.png",
      development: "/projectImages/desktop/dev-work.png",
      research: "/projectImages/desktop/research.png",
      default: "/projectImages/desktop/comm-analytics.png"
    };

    // Determine which image to return based on the message content or selected project
    let selectedImage: string | null = null;
    if (selectedProject) {
      // Return project-specific image based on selected project
      switch (selectedProject) {
        case 'commercial-analytics-hub':
        case 'iris-analytics':
          selectedImage = projectImages.analytics;
          break;
        case 'enterprise-design-system':
        case 'huggies-website':
        case 'web-templates':
          selectedImage = projectImages.design;
          break;
        case 'genfei-chatbot':
        case 'buyerspring':
        case 'defoor-development':
          selectedImage = projectImages.development;
          break;
        case 'pullups-research':
          selectedImage = projectImages.research;
          break;
      }
    } else {
      const lowerMessage = message.toLowerCase();
      if ((lowerMessage.includes('analytics') || lowerMessage.includes('data')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
        selectedImage = projectImages.analytics;
      } else if ((lowerMessage.includes('design') || lowerMessage.includes('figma')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
        selectedImage = projectImages.design;
      } else if ((lowerMessage.includes('development') || lowerMessage.includes('code')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
        selectedImage = projectImages.development;
      } else if ((lowerMessage.includes('research') || lowerMessage.includes('user research')) && !(lowerMessage.includes('who are you') || lowerMessage.includes('about yourself') || lowerMessage.includes('background'))) {
        selectedImage = projectImages.research;
      }
    }

    // Validate model parameter - fall back to default if not valid
    const validModel = validModels.includes(model) ? model : 'gpt-3.5-turbo';

    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), 20000); // 20 second timeout
    });

    try {
      const response = await Promise.race([
        openai.chat.completions.create({
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
          stream: false, // Explicitly disable streaming
        }),
        timeoutPromise
      ]) as Awaited<ReturnType<typeof openai.chat.completions.create>>;

      const responseTime = Date.now() - startTime;
      console.log(`Chat API response time: ${responseTime}ms`);
      
      // Check if response has choices property (non-streaming response)
      if ('choices' in response && response.choices && response.choices.length > 0) {
        return NextResponse.json({ 
          reply: response.choices[0].message.content,
          image: selectedImage || undefined
        });
      } else {
        throw new Error('Invalid response format from OpenAI');
      }
    } catch (openaiError: unknown) {
      const responseTime = Date.now() - startTime;
      console.error('OpenAI API error:', openaiError);
      console.error(`Request failed after ${responseTime}ms`);
      
      // Handle timeout specifically
      if (openaiError instanceof Error && openaiError.message === 'Request timeout') {
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { error: openaiError instanceof Error ? openaiError.message : 'Error communicating with OpenAI' },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    const responseTime = Date.now() - startTime;
    console.error('Error processing chat request:', error);
    console.error(`Request failed after ${responseTime}ms`);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error processing your request' },
      { status: 500 }
    );
  }
} 