import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import {
  categoryPrompts as trainingPrompts,
  validModels,
  additionalContext,
  resumeContext,
  responseGuidelines,
} from '@/lib/chat-training';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DEFAULT_MODEL = 'gpt-4o-mini';

// Map project slugs to their detailed case-study context
const projectContext: Record<string, string> = {
  'commercial-analytics-hub': additionalContext.commercialAnalyticsHub,
  'enterprise-design-system': additionalContext.enterpriseDesignSystem,
  'genfei-chatbot': additionalContext.genfeiChatbot,
  'iris-analytics': additionalContext.irisAnalytics,
  'web-templates': additionalContext.webTemplates,
  'pullups-research': additionalContext.pullupsResearch,
  buyerspring: additionalContext.buyerspring,
  'huggies-website': additionalContext.huggiesWebsite,
  'defoor-development': additionalContext.defoorDevelopment,
};

// Keyword-driven case-study / personal context. Append-only and deduped so triggers
// layer extra grounding onto the prompt instead of clobbering it.
const contextRules: { test: RegExp; context: string }[] = [
  { test: /\b(iris|predictive|forecast|demand|scenario planner|netflow)/, context: additionalContext.irisAnalytics },
  { test: /\b(analytics|dashboard|power\s?bi|insight|metrics|\bdata\b)/, context: additionalContext.commercialAnalyticsHub },
  { test: /\b(supply chain|logistics)/, context: additionalContext.commercialAnalyticsHub },
  { test: /\b(design system|figma|component library|tokens?)/, context: additionalContext.enterpriseDesignSystem },
  { test: /\b(genfei|chatbot|conversational|llm|gpt|ai assistant)/, context: additionalContext.genfeiChatbot },
  { test: /\bhuggies/, context: additionalContext.huggiesWebsite },
  { test: /\b(template|consumer (?:site|website|brand))/, context: additionalContext.webTemplates },
  { test: /\b(pull[- ]?ups|potty|parents?)/, context: additionalContext.pullupsResearch },
  { test: /\b(buyerspring|real estate|home buying|off-market)/, context: additionalContext.buyerspring },
  { test: /\b(defoor|property development)/, context: additionalContext.defoorDevelopment },
  { test: /\bfreelance/, context: additionalContext.buyerspring },
  { test: /\b(philosophy|design approach)/, context: additionalContext.designPhilosophy },
  { test: /\b(workflow|how (?:do|did) you (?:build|develop|code))/, context: additionalContext.developmentApproach },
  { test: /\b(research|usability|user testing|interviews?)/, context: additionalContext.researchMethods },
  { test: /\b(project management|prioriti|deadlines?|juggl)/, context: additionalContext.projectManagement },
  { test: /\b(career|goals?|future|aspiration)/, context: additionalContext.careerGoals },
];

type Category = keyof typeof trainingPrompts;

// Lightly infer a category prompt from the message when the client doesn't send one.
function inferCategory(lowerMessage: string): Category {
  if (/\b(develop|coding|engineer|tech stack|react|next\.?js|typescript|front[- ]?end)/.test(lowerMessage)) return 'development';
  if (/\b(research|usability|interview|a\/b|testing)/.test(lowerMessage)) return 'research';
  if (/\b(design system|figma|component|tokens?)/.test(lowerMessage)) return 'design';
  if (/\b(analytics|dashboard|power\s?bi|\bdata\b)/.test(lowerMessage)) return 'analytics';
  if (/\b(career|goals?|future|growth)/.test(lowerMessage)) return 'career';
  if (/\b(philosophy|approach|process)/.test(lowerMessage)) return 'philosophy';
  if (/\bproject/.test(lowerMessage)) return 'projects';
  return 'default';
}

function buildSystemPrompt(message: string, category: unknown, selectedProject: unknown): string {
  const lowerMessage = message.toLowerCase();

  const resolvedCategory: Category =
    typeof category === 'string' && category in trainingPrompts
      ? (category as Category)
      : inferCategory(lowerMessage);

  // Foundation every answer is grounded in: category guidance + the full résumé + voice/format rules.
  let systemPrompt =
    `${trainingPrompts[resolvedCategory]}\n\n` +
    `Résumé and background — treat this as your source of truth:\n${resumeContext.trim()}\n` +
    responseGuidelines;

  // Layer in deeper case-study context.
  if (typeof selectedProject === 'string' && projectContext[selectedProject]) {
    systemPrompt +=
      `\n\nThe visitor is focused on the "${selectedProject}" project. Center your answers on it and gently steer tangents back to it.\n\n` +
      projectContext[selectedProject];
    return systemPrompt;
  }

  const added = new Set<string>();
  for (const { test, context } of contextRules) {
    if (added.size >= 3) break;
    if (test.test(lowerMessage) && !added.has(context)) {
      systemPrompt += `\n\n${context}`;
      added.add(context);
    }
  }

  return systemPrompt;
}

export async function POST(request: Request) {
  try {
    const { message, messages = [], category, model, selectedProject } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key is not configured' }, { status: 500 });
    }

    // Only carry forward valid, non-empty user/assistant turns from the client.
    const conversationHistory: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = (
      Array.isArray(messages) ? messages : []
    )
      .filter(
        (msg: { role?: string; content?: string }) =>
          msg && (msg.role === 'user' || msg.role === 'assistant') && typeof msg.content === 'string' && msg.content.trim()
      )
      .map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    conversationHistory.push({ role: 'user', content: message });

    const systemPrompt = buildSystemPrompt(message, category, selectedProject);
    const validModel = typeof model === 'string' && validModels.includes(model) ? model : DEFAULT_MODEL;

    try {
      const response = await openai.chat.completions.create({
        model: validModel,
        messages: [{ role: 'system', content: systemPrompt }, ...conversationHistory],
        max_tokens: 600,
        temperature: 0.6,
      });

      const reply = response.choices[0]?.message?.content?.trim();

      return NextResponse.json({
        reply:
          reply ||
          "Sorry — I couldn't put a response together just then. Mind rephrasing, or reach out directly at ethan0380@gmail.com?",
      });
    } catch (openaiError: unknown) {
      console.error('OpenAI API error:', openaiError);
      const errorMessage = openaiError instanceof Error ? openaiError.message.toLowerCase() : '';

      // Handle quota/rate limit errors with a friendly fallback.
      if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
        return NextResponse.json({
          reply:
            "Thanks for your interest! The AI assistant is taking a quick break. Feel free to reach out directly at ethan0380@gmail.com or explore my projects in the Work section.",
        });
      }

      return NextResponse.json({ error: 'Error communicating with OpenAI' }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error processing your request' },
      { status: 500 }
    );
  }
}
