"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { SendIcon } from "lucide-react";
import Image from "next/image";

interface Message {
  role: 'user' | 'bot';
  content: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }
  seen?: boolean; // Track if message has been seen before
  context?: string; // Store context about the message for follow-ups
}

// Sample project images to use in responses
const projectImages = {
  "analytics hub": {
    src: "/projectImages/desktop/comm-analytics.png",
    alt: "Commercial Analytics Hub Dashboard",
    width: 600,
    height: 400
  },
  "design system": {
    src: "/projectImages/desktop/design-system.png",
    alt: "Enterprise Design System",
    width: 600,
    height: 400
  },
  "genfei": {
    src: "/projectImages/desktop/gen-fei.png",
    alt: "GenFEI AI Chatbot Interface",
    width: 600,
    height: 400
  },
  "iris": {
    src: "/projectImages/desktop/IRIS.png",
    alt: "IRIS Analytics Dashboard",
    width: 600,
    height: 400
  },
  "web templates": {
    src: "/projectImages/desktop/web-templates.png",
    alt: "Web Templates for Consumer Websites",
    width: 600,
    height: 400
  },
  "pull ups": {
    src: "/projectImages/desktop/pull-ups-research.png",
    alt: "Pull Ups Research Prototype",
    width: 600,
    height: 400
  },
  "buyerspring": {
    src: "/projectImages/desktop/buyer-spring.png",
    alt: "BuyerSpring Real Estate Website",
    width: 600,
    height: 400
  },
  "huggies": {
    src: "/projectImages/desktop/huggies.png",
    alt: "Huggies Website Redesign",
    width: 600,
    height: 400
  }
};

// Word-by-word animation with staggered timing and word highlighting
const WordByWordTypewriter = ({ 
  text, 
  speed = 40,
  onComplete
}: { 
  text: string; 
  speed?: number;
  onComplete?: () => void;
}) => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  // Process text into words to display
  const words = useMemo(() => text.split(/(\s+)/).filter(w => w.length > 0), [text]);
  
  // When animation completes, call the onComplete callback
  useEffect(() => {
    if (isComplete && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isComplete, onComplete]);
  
  // Simple blinking cursor effect
  useEffect(() => {
    if (isComplete) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, [isComplete]);
  
  // Word by word typing effect
  useEffect(() => {
    // Show full text immediately if reduced motion is preferred
    if (prefersReducedMotion) {
      setVisibleWords(words);
      setIsComplete(true);
      return;
    }
    
    // Reset state when text changes
    setVisibleWords([]);
    setIsComplete(false);
    
    let currentIndex = 0;
    const timers: NodeJS.Timeout[] = [];
    
    // Add word by word with calculated delays
    const addNextWord = () => {
      if (currentIndex < words.length) {
        const word = words[currentIndex];
        const currentWord = word;
        
        // Calculate delay based on word length and type
        const isPunctuation = /^[.,!?;:]/.test(word);
        const wordDelay = word.trim() === '' ? speed * 0.5 : 
                          isPunctuation ? speed * 1.5 : 
                          Math.max(speed, word.length * speed * 0.15);
        
        // Add this word to visible words
        const timer = setTimeout(() => {
          setVisibleWords(prev => [...prev, currentWord]);
          
          // Move to next word
          currentIndex++;
          
          if (currentIndex < words.length) {
            addNextWord();
          } else {
            // All words added
            setTimeout(() => setIsComplete(true), 500);
          }
        }, wordDelay);
        
        timers.push(timer);
      }
    };
    
    // Start adding words
    addNextWord();
    
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [text, words, prefersReducedMotion, speed]);
  
  if (prefersReducedMotion) {
    return <p className="text-base leading-relaxed">{text}</p>;
  }
  
  return (
    <p className="font-medium text-base leading-relaxed">
      {visibleWords.map((word, index) => (
        <span key={index}>{word}</span>
      ))}
      {!isComplete && showCursor && (
        <span className="inline-block w-[2px] h-[1.2em] bg-primary animate-pulse ml-[1px] align-middle" />
      )}
    </p>
  );
};

export function ChatBot({ className = "" }: { className?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Track when the chat is closing
  const [selectedModel] = useState<string>("gpt-4o"); // Fixed to GPT-4o
  const [currentContext, setCurrentContext] = useState<string>(""); // Track current conversation context
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null); // Add a ref for the input element
  const prefersReducedMotion = useReducedMotion();
  // Ref to the collapsed chatbot component to measure its size
  const collapsedChatRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  // Example prompts that will cycle in the placeholder
  const examplePrompts = [
    "Tell me about your analytics hub project",
    "Can you show me your design system?",
    "What projects have you worked on?",
    "Show me the GenFEI chatbot",
    "Tell me about your experience with UX research",
    "What was the Huggies redesign about?",
  ];

  // Cycle through the placeholder prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % examplePrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [examplePrompts.length]);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Update hasOpenedBefore when the chat expands for the first time
  useEffect(() => {
    if (isExpanded && !hasOpenedBefore) {
      setHasOpenedBefore(true);
    }
  }, [isExpanded, hasOpenedBefore]);

  // Update the spacer height when the component renders and when window resizes
  useEffect(() => {
    const updateSpacerHeight = () => {
      if (collapsedChatRef.current) {
        setSpacerHeight(collapsedChatRef.current.offsetHeight);
      }
    };

    // Initial measurement
    updateSpacerHeight();
    
    // Update on resize
    window.addEventListener('resize', updateSpacerHeight);
    
    return () => {
      window.removeEventListener('resize', updateSpacerHeight);
    };
  }, []);

  // Update messages with seen flag when chat is expanded
  useEffect(() => {
    if (isExpanded && messages.length > 0) {
      // Mark all messages as seen
      setMessages(prev => 
        prev.map(msg => ({...msg, seen: true}))
      );
    }
  }, [isExpanded, messages.length]);

  // Function to analyze message and determine if we should show a project image
  const getProjectImage = (message: string): { src: string; alt: string; width: number; height: number } | undefined => {
    const messageLower = message.toLowerCase();
    
    // Only include images in responses, not in inquiries
    if (messageLower.includes("what is") || 
        messageLower.includes("tell me about") || 
        messageLower.includes("can you show") || 
        messageLower.includes("do you have") ||
        messageLower.includes("?")) {
      return undefined;
    }
    
    // Check for project references
    if (messageLower.includes("analytics hub") || messageLower.includes("analytics dashboard") || messageLower.includes("commercial analytics")) {
      return projectImages["analytics hub"];
    } else if (messageLower.includes("design system") || messageLower.includes("enterprise design")) {
      return projectImages["design system"];
    } else if (messageLower.includes("genfei") || messageLower.includes("chatbot") || messageLower.includes("ai interface")) {
      return projectImages["genfei"];
    } else if (messageLower.includes("iris") || messageLower.includes("data visualization")) {
      return projectImages["iris"];
    } else if (messageLower.includes("web templates") || messageLower.includes("consumer websites")) {
      return projectImages["web templates"];
    } else if (messageLower.includes("pull ups") || messageLower.includes("potty training")) {
      return projectImages["pull ups"];
    } else if (messageLower.includes("buyerspring") || messageLower.includes("real estate")) {
      return projectImages["buyerspring"];
    } else if (messageLower.includes("huggies") || messageLower.includes("e-commerce") || messageLower.includes("redesign")) {
      return projectImages["huggies"];
    }
    
    return undefined;
  };

  // Function to analyze messages and detect follow-up questions
  const isFollowUpQuestion = (message: string): boolean => {
    const followUpIndicators = [
      "what about", "tell me more", "can you explain", "how does that", 
      "why is", "and what", "what else", "is there more", "elaborate on",
      "more details", "go on", "what happened", "how did", "when was",
      "where was", "who was", "can you show", "follow up", "related to"
    ];
    
    const messageLower = message.toLowerCase();
    
    // Check if message contains pronouns that reference previous content
    const hasReferencePronouns = /\b(it|this|that|these|those|they|them|he|she|his|her|its|their)\b/.test(messageLower);
    
    // Check for short queries that are likely follow-ups
    const isShortQuery = message.split(" ").length <= 4 && message.includes("?");
    
    // Check for follow-up indicators
    const hasFollowUpIndicator = followUpIndicators.some(indicator => 
      messageLower.includes(indicator)
    );
    
    return hasReferencePronouns || isShortQuery || hasFollowUpIndicator;
  };

  // Function to get the context from previous messages
  const getConversationContext = (): string => {
    // Get the last 3 messages for context
    const recentMessages = messages.slice(-3);
    
    if (recentMessages.length === 0) return "";
    
    // Extract context from recent messages
    return recentMessages.map(msg => {
      return `${msg.role === 'user' ? 'Question' : 'Answer'}: ${msg.content}`;
    }).join("\n");
  };

  // Function to determine relevant project based on conversation
  const determineRelevantProject = (message: string, context: string): string | null => {
    const projects = [
      "analytics hub", "design system", "genfei", "iris", 
      "web templates", "pull ups", "buyerspring", "huggies"
    ];
    
    // First check the current message
    for (const project of projects) {
      if (message.toLowerCase().includes(project)) {
        return project;
      }
    }
    
    // If not found in message, check context
    for (const project of projects) {
      if (context.toLowerCase().includes(project)) {
        return project;
      }
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsExpanded(true);

    // Get conversation context
    const context = getConversationContext();
    const isFollowUp = isFollowUpQuestion(userMessage);
    
    // Add user message with seen=true since it's being added while chat is open
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage, 
      seen: true,
      context: isFollowUp ? context : "" // Store context for follow-up questions
    }]);

    try {
      // In a real implementation, this would come from the server
      // Simulating a response with image detection here
      
      let responseMessage = "";
      let imageData: { src: string; alt: string; width: number; height: number } | undefined;
      
      // Don't show images for inquiries
      const isInquiry = userMessage.toLowerCase().includes("?") || 
                        userMessage.toLowerCase().includes("what") ||
                        userMessage.toLowerCase().includes("show me") ||
                        userMessage.toLowerCase().includes("tell me about");
      
      // If it's a follow-up question, use the context to determine the response
      const relevantProject = determineRelevantProject(userMessage, context);
      
      if (isFollowUp && relevantProject) {
        // Handle follow-up questions about specific projects
        switch (relevantProject) {
          case "analytics hub":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's the Analytics Hub dashboard interface. It features interactive visualizations and natural language query capabilities powered by OpenAI.";
              imageData = projectImages["analytics hub"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "The Analytics Hub was built using React, TypeScript, and D3.js for visualizations. The backend used Node.js with a SQL database, and we integrated OpenAI for natural language processing of queries.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "The Analytics Hub had significant business impact: 73% reduction in time to insight, 1,500+ daily active users, and it became the central platform for all commercial analytics at the company. It won an internal innovation award.";
            } else {
              responseMessage = "The Analytics Hub project involved creating a centralized dashboard for commercial data. It featured interactive charts, drill-down capabilities, and natural language queries powered by AI.";
              imageData = isInquiry ? undefined : projectImages["analytics hub"];
            }
            break;
          
          case "design system":
            if (userMessage.toLowerCase().includes("component") || userMessage.toLowerCase().includes("elements") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "The Design System included over 150 standardized components, from basic elements like buttons and inputs to complex modules like data tables and visualization widgets. Here's a snapshot of the component library.";
              imageData = projectImages["design system"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "The Design System was built with React and Storybook for documentation. We used CSS-in-JS for styling and had comprehensive accessibility testing integrated into the CI pipeline.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "The Design System reduced development time by 40% for new applications and ensured consistent UI across 30+ internal tools. It also improved accessibility compliance from 65% to 98% across all company applications.";
            } else {
              responseMessage = "The Enterprise Design System standardized UI components and established design patterns across all internal applications. It included a comprehensive component library, documentation, and guidelines for developers and designers.";
              imageData = isInquiry ? undefined : projectImages["design system"];
            }
            break;
          
          case "genfei":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's the GenFEI chatbot interface. It features a clean design with conversation threads, knowledge base search, and contextual responses.";
              imageData = projectImages["genfei"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "GenFEI was built using a React frontend with a Node.js backend. We integrated OpenAI's GPT models and used vector embeddings to search through company knowledge bases for accurate answers.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "GenFEI reduced support ticket volume by 42% by answering common questions automatically. It handles over 5,000 queries per day and maintains a 92% satisfaction rating from users.";
            } else {
              responseMessage = "The GenFEI project created an AI assistant that could answer questions using the company's internal knowledge bases. It analyzed user questions and retrieved relevant information from multiple sources.";
              imageData = isInquiry ? undefined : projectImages["genfei"];
            }
            break;
            
          case "iris":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's the IRIS analytics dashboard interface. It features interactive data visualizations, promotion planning tools, and customizable reports.";
              imageData = projectImages["iris"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "IRIS was built with React, D3.js, and WebGL for complex visualizations. The backend used Python with pandas for data processing and a PostgreSQL database for storage.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "IRIS helped optimize $1.2B in promotional spending by providing better insights. Sales teams reported 35% more effective promotion planning and significantly reduced time spent on data analysis.";
            } else {
              responseMessage = "IRIS was an advanced analytics dashboard focused on promotional planning and sales analysis. It helped business users visualize complex data and make better decisions without needing data science expertise.";
              imageData = isInquiry ? undefined : projectImages["iris"];
            }
            break;
            
          case "web templates":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's an example of the web templates in action. They provided consistent components and layouts while allowing for brand-specific customization.";
              imageData = projectImages["web templates"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "The web templates were built with modern frontend technologies including React, Next.js, and Tailwind CSS. We implemented a modular architecture that allowed for easy customization while maintaining core functionality.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "The web templates reduced development time for new brand sites by 60% and improved page load performance by 32%. They also ensured 100% WCAG compliance across all consumer-facing websites.";
            } else {
              responseMessage = "The web templates project standardized the approach to building consumer websites across multiple brands. It provided a library of components and layouts that ensured brand consistency while improving development efficiency.";
              imageData = isInquiry ? undefined : projectImages["web templates"];
            }
            break;
            
          case "pull ups":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's the Pull Ups app prototype we developed. It features a child-friendly interface with progress tracking, reward systems, and educational content for parents.";
              imageData = projectImages["pull ups"];
            } else if (userMessage.toLowerCase().includes("research") || userMessage.toLowerCase().includes("user testing") || userMessage.toLowerCase().includes("study")) {
              responseMessage = "For the Pull Ups project, we conducted extensive user research including 24 in-home observations, 8 focus groups with parents, and diary studies with 45 families going through the potty training process.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "The Pull Ups app was downloaded over 200,000 times in the first year and dramatically increased brand engagement. User retention was 3x higher than industry average for parenting apps.";
            } else {
              responseMessage = "The Pull Ups project involved designing a mobile app to help parents with potty training. We combined child psychology principles with gamification to create an engaging experience for both parents and children.";
              imageData = isInquiry ? undefined : projectImages["pull ups"];
            }
            break;
            
          case "buyerspring":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's the BuyerSpring real estate platform interface. It features an intuitive property search, neighborhood insights, and financial planning tools for home buyers.";
              imageData = projectImages["buyerspring"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "BuyerSpring was built with a React frontend and a Node.js backend. We integrated multiple real estate data APIs and used MapBox for location-based features.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "BuyerSpring attracted 50,000 users in its first six months and facilitated over $80M in real estate transactions. User satisfaction scores were consistently above 4.8/5.";
            } else {
              responseMessage = "BuyerSpring was a real estate platform designed to simplify the home buying process. It provided tools for property search, neighborhood comparison, mortgage calculation, and scheduling viewings in one integrated experience.";
              imageData = isInquiry ? undefined : projectImages["buyerspring"];
            }
            break;
            
          case "huggies":
            if (userMessage.toLowerCase().includes("example") || userMessage.toLowerCase().includes("demo") || userMessage.toLowerCase().includes("show")) {
              responseMessage = "Here's the redesigned Huggies e-commerce interface. It featured simplified navigation, personalized product recommendations, and a streamlined checkout process.";
              imageData = projectImages["huggies"];
            } else if (userMessage.toLowerCase().includes("technology") || userMessage.toLowerCase().includes("stack") || userMessage.toLowerCase().includes("built")) {
              responseMessage = "The Huggies redesign used Shopify Plus with custom React components. We integrated personalization through Segment and implemented a headless CMS for content management.";
            } else if (userMessage.toLowerCase().includes("impact") || userMessage.toLowerCase().includes("result") || userMessage.toLowerCase().includes("success")) {
              responseMessage = "The Huggies redesign increased conversion rates by 24% and reduced cart abandonment by 35%. Site engagement metrics improved across the board with a 75% increase in average session duration.";
            } else {
              responseMessage = "The Huggies redesign transformed their e-commerce experience with a focus on simplicity and personalization. We completely reimagined the product discovery and purchasing journey based on extensive user research.";
              imageData = isInquiry ? undefined : projectImages["huggies"];
            }
            break;
          
          default:
            // General follow-up response if we can't determine specific context
            responseMessage = `I'm working on improving my follow-up responses about the ${relevantProject} project. What specific aspect would you like to know more about?`;
        }
      } else {
        // Handle regular (non-follow-up) questions as before
        // Simple logic to mimic a server responding with project information
        if (userMessage.toLowerCase().includes("analytics hub") || userMessage.toLowerCase().includes("commercial analytics")) {
          responseMessage = "The Commercial Analytics Hub was one of our most successful projects. It helped reduce time to insight for ~1,500 users daily and integrated OpenAI for natural language queries.";
          imageData = isInquiry ? undefined : projectImages["analytics hub"];
          setCurrentContext("analytics hub");
        } else if (userMessage.toLowerCase().includes("design system") || userMessage.toLowerCase().includes("enterprise design")) {
          responseMessage = "I created the Enterprise Design System for Kimberly-Clark, which standardized components across all their internal applications. This helped teams build consistent interfaces and reduced development time by 40%.";
          imageData = isInquiry ? undefined : projectImages["design system"];
          setCurrentContext("design system");
        } else if (userMessage.toLowerCase().includes("genfei") || userMessage.toLowerCase().includes("ai chatbot")) {
          responseMessage = "The GenFEI Chatbot is a sophisticated AI interface that connects to multiple knowledge bases. It allows users to ask questions in natural language and get accurate responses from company data.";
          imageData = isInquiry ? undefined : projectImages["genfei"];
          setCurrentContext("genfei");
        } else if (userMessage.toLowerCase().includes("iris") || userMessage.toLowerCase().includes("analytic dashboard")) {
          responseMessage = "IRIS is a complex analytics dashboard that focuses on innovative ways to visualize data and plan promotions. It combines multiple data sources into an intuitive interface for business users.";
          imageData = isInquiry ? undefined : projectImages["iris"];
          setCurrentContext("iris");
        } else if (userMessage.toLowerCase().includes("web templates") || userMessage.toLowerCase().includes("consumer websites")) {
          responseMessage = "I developed standardized web templates for Kimberly-Clark's consumer websites, ensuring brand consistency while improving page load times and accessibility compliance.";
          imageData = isInquiry ? undefined : projectImages["web templates"];
          setCurrentContext("web templates");
        } else if (userMessage.toLowerCase().includes("pull ups") || userMessage.toLowerCase().includes("potty training")) {
          responseMessage = "For the Pull Ups project, I conducted extensive user research and created prototypes for a potty training mobile app that helps parents track progress and encourages children through the process.";
          imageData = isInquiry ? undefined : projectImages["pull ups"];
          setCurrentContext("pull ups");
        } else if (userMessage.toLowerCase().includes("buyerspring") || userMessage.toLowerCase().includes("real estate")) {
          responseMessage = "BuyerSpring is a real estate platform I designed that focused on creating a new buying experience. The interface simplifies the home search and purchase process with innovative tools for buyers and sellers.";
          imageData = isInquiry ? undefined : projectImages["buyerspring"];
          setCurrentContext("buyerspring");
        } else if (userMessage.toLowerCase().includes("huggies") || userMessage.toLowerCase().includes("redesign")) {
          responseMessage = "The Huggies redesign completely transformed their e-commerce platform, improving user navigation and increasing site retention time by over 75%.";
          imageData = isInquiry ? undefined : projectImages["huggies"];
          setCurrentContext("huggies");
        } else if (userMessage.toLowerCase().includes("projects") || userMessage.toLowerCase().includes("portfolio") || userMessage.toLowerCase().includes("work")) {
          responseMessage = "My portfolio includes various projects like the Commercial Analytics Hub, Enterprise Design System, GenFEI Chatbot, IRIS Analytics, Web Templates, Pull Ups Research, BuyerSpring, and the Huggies Website. Which would you like to know more about?";
          // No specific image for general inquiries
          setCurrentContext("");
        } else {
          // For demo purposes, try to make a server request that would normally return data
          try {
            const res = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                message: userMessage,
                context: context, // Send context to the API
                model: selectedModel 
              }),
            });

            const data = await res.json();
            
            if (!res.ok) throw new Error(data.error || "Failed to get response");
            responseMessage = data.reply;
          } catch (error) {
            // Fallback response if API fails
            responseMessage = "I'm not sure I understand your question. Could you rephrase or ask about a specific project like the Analytics Hub, Design System, or GenFEI chatbot?";
          }
          
          // Check if we should show an image based on the response content
          imageData = getProjectImage(responseMessage);
        }
      }
      
      // Bot message with seen=false initially to trigger the animation
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: responseMessage,
        image: imageData,
        seen: false
      }]);
      
    } catch (err) {
      console.error("Error:", err);
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I encountered an error. Please try again.", seen: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Linear transition presets - using the same transition for everything
  const linearTransition = {
    type: "tween",
    ease: "linear",
    duration: prefersReducedMotion ? 0.2 : 0.4
  };
  
  // Bouncy spring transition for the modal
  const springTransition = {
    type: "spring",
    stiffness: prefersReducedMotion ? 300 : 180,
    damping: prefersReducedMotion ? 30 : 12,
    mass: 1
  };

  // Handle closing the chat with a slight delay to allow exit animations
  const handleClose = () => {
    setIsClosing(true); // Set closing state to true
    setTimeout(() => {
      setIsExpanded(false);
      setIsClosing(false);
    }, 150); // Short delay to allow exit animations to start
  };

  // Add shimmer keyframe animation in global.css or add it inline in the component
  useEffect(() => {
    // Add shimmer animation keyframes to document if not already added
    if (!document.getElementById('shimmer-keyframes')) {
      const style = document.createElement('style');
      style.id = 'shimmer-keyframes';
      style.innerHTML = `
        @keyframes shimmer {
          0% {
            opacity: 0.6;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
          100% {
            opacity: 0.6;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  // Focus the input on first render
  useEffect(() => {
    // Small delay to ensure the component is fully mounted
    const timer = setTimeout(() => {
      if (inputRef.current && !isExpanded) {
        inputRef.current.focus();
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isExpanded]);

  return (
    <LayoutGroup>
      <div className={`${className}`}>
        {/* This spacer is only visible when the chatbot is expanded to prevent content jumping */}
        {isExpanded && (
          <div style={{ height: `${spacerHeight}px` }} aria-hidden="true" />
        )}
        
        <AnimatePresence mode="sync">
          {!isExpanded ? (
            <motion.div 
              layoutId="chat-container"
              className="w-full cursor-text relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={linearTransition}
              ref={collapsedChatRef}
              onClick={() => {
                // Focus the input when clicking anywhere
                inputRef.current?.focus();
              }}
            >
              <motion.div 
                layoutId="chat-content"
                className="backdrop-blur-xl rounded-xl p-3 border bg-foreground/90"
                transition={linearTransition}
              >
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="w-full"
                >
                  <motion.div 
                    layoutId="input-container"
                    className="flex gap-2 items-center"
                    transition={linearTransition}
                  >
                    <div className="flex-1 relative">
                      <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={examplePrompts[currentPromptIndex]}
                        className="w-full bg-foreground backdrop-blur-sm border-muted-foreground/50 text-background cursor-text focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                        onClick={(e) => {
                          // Prevent propagation to ensure clicks on the input don't trigger expansion
                          e.stopPropagation();
                        }}
                      />
                    </div>
                    <motion.div 
                      layoutId="send-button"
                      transition={linearTransition}
                    >
                      <Button size="icon" type="submit">
                        <SendIcon className="w-4 h-4" />
                      </Button>
                    </motion.div>
                    <motion.div
                      layoutId="expand-button"
                      transition={linearTransition}
                    >
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon"
                        onClick={() => setIsExpanded(true)}
                        title="Expand chat"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <polyline points="9 21 3 21 3 15"></polyline>
                          <line x1="21" y1="3" x2="14" y2="10"></line>
                          <line x1="3" y1="21" x2="10" y2="14"></line>
                        </svg>
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={!hasOpenedBefore ? { opacity: 0, backdropFilter: "blur(0px)" } : { opacity: 0.6, backdropFilter: "blur(10px)" }}
                animate={{ opacity: 0.6, backdropFilter: "blur(10px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.2 } }}
                transition={linearTransition}
                className="fixed inset-0 bg-black/25 backdrop-blur-none"
                style={{
                  transition: "backdrop-filter 0.3s ease-out, background-color 0.3s ease-out"
                }}
                onClick={handleClose}
              />
              <motion.div
                layoutId="chat-container"
                transition={{
                  ...linearTransition,
                  scale: !hasOpenedBefore ? springTransition : linearTransition,
                  exit: { duration: 0.15 }
                }}
                className="fixed inset-0 m-0 md:m-4 md:mx-auto md:inset-[5%] lg:inset-[10%] max-h-[100vh] md:max-h-[80vh] max-w-none md:max-w-[70vw] z-50"
                initial={!hasOpenedBefore ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <motion.div
                  layoutId="chat-content"
                  transition={linearTransition}
                  className="w-full h-full bg-foreground/80 backdrop-blur-md rounded-none md:rounded-xl overflow-hidden shadow-2xl flex flex-col border-none md:border md:border-foreground/50"
                >
                  <motion.div
                    initial={!hasOpenedBefore ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={linearTransition}
                    className="flex justify-between items-center p-4 border-b border-foreground/50"
                  >
                    <h2 className="text-lg font-semibold text-background">Portfolio Chat</h2>
                    <Button variant="ghost" size="icon" onClick={handleClose} className="text-background">
                      ✕
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={!hasOpenedBefore ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={linearTransition}
                    className="flex-1 overflow-y-auto bg-background/10 backdrop-blur-md space-y-4 p-4"
                  >
                    {messages.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={linearTransition}
                        className="text-center text-background"
                      >
                        Ask about anything!
                      </motion.div>
                    ) : (
                      messages.map((message, i) => (
                        <motion.div
                          initial={!message.seen ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={linearTransition}
                          key={i}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] rounded-lg px-4 py-3 ${
                            message.role === 'user' ? 'bg-foreground/20 text-background border border-foreground/50' : 'text-background/80'
                          }`}>
                            {message.role === 'bot' && message === messages[messages.length - 1] && !message.seen ? (
                              <WordByWordTypewriter 
                                text={message.content}
                                onComplete={() => {
                                  // Mark the message as seen when animation completes
                                  setMessages(prev => 
                                    prev.map((msg, idx) => 
                                      idx === prev.length - 1 && msg.role === 'bot' && !msg.seen
                                        ? { ...msg, seen: true }
                                        : msg
                                    )
                                  );
                                }}
                              />
                            ) : (
                              <p className="text-base leading-relaxed">{message.content}</p>
                            )}
                            
                            {/* Render image if available and not in closing state */}
                            {message.image && !isClosing && (
                              <motion.div 
                                initial={!message.seen ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                                transition={{
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 20,
                                  delay: message.role === 'bot' && !message.seen ? 0.3 : 0 // Small fixed delay after typing starts
                                }}
                                className="mt-3 overflow-hidden rounded-lg"
                              >
                                <div className="aspect-video w-full relative overflow-hidden rounded-lg">
                                  <Image
                                    src={message.image.src}
                                    alt={message.image.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 600px"
                                    className="object-cover"
                                    style={{ objectPosition: '50% 10%' }}
                                    quality={100}
                                    priority
                                  />
                                </div>
                                <p className="text-xs text-background/70 mt-1">{message.image.alt}</p>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={linearTransition}
                        className="flex justify-start"
                      >
                        <div className="bg-muted rounded-lg px-4 py-2">
                          <div className="relative">
                            <span className="font-medium text-base relative inline-block">
                              <span className="opacity-0">thinking</span>
                              <span className="absolute inset-0 flex justify-center">
                                {/* Shimmer effect for each letter of "thinking" */}
                                {"thinking".split('').map((letter, index) => (
                                  <span 
                                    key={index} 
                                    className="relative inline-block"
                                    style={{
                                      animation: `shimmer 1.5s infinite`,
                                      animationDelay: `${index * 100}ms`,
                                    }}
                                  >
                                    {letter}
                                  </span>
                                ))}
                              </span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </motion.div>

                  <motion.div
                    className="p-4 border-t border-foreground/50"
                  >
                    <motion.form 
                      onSubmit={handleSubmit} 
                      className="w-full"
                    >
                      <motion.div 
                        layoutId="input-container"
                        className="flex gap-2 items-center"
                        transition={linearTransition}
                      >
                        <div className="flex-1 relative">
                          <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={examplePrompts[currentPromptIndex]}
                            className="w-full bg-foreground/30 border-muted-foreground/50 text-background backdrop-blur-xl cursor-text focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <motion.div 
                          layoutId="send-button"
                          transition={linearTransition}
                        >
                          <Button size="icon" type="submit" disabled={isLoading}>
                            <SendIcon className="w-4 h-4" />
                          </Button>
                        </motion.div>
                        <motion.div
                          layoutId="expand-button"
                          transition={linearTransition}
                        >
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={handleClose}
                            title="Minimize chat"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="4 14 10 14 10 20"></polyline>
                              <polyline points="20 10 14 10 14 4"></polyline>
                              <line x1="14" y1="10" x2="21" y2="3"></line>
                              <line x1="3" y1="21" x2="10" y2="14"></line>
                            </svg>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.form>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
} 