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
}

// Sample project images to use in responses
const projectImages = {
  "analytics hub": {
    src: "/projects.png",
    alt: "Analytics Hub Dashboard",
    width: 600,
    height: 400
  },
  "huggies": {
    src: "/citation.png",
    alt: "Huggies Website Redesign",
    width: 600,
    height: 400
  },
  "chatbot": {
    src: "/projects.png",
    alt: "AI Chatbot Interface",
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
    let timers: NodeJS.Timeout[] = [];
    
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  // Ref to the collapsed chatbot component to measure its size
  const collapsedChatRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

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
    
    // Check for project references
    if (messageLower.includes("analytics hub") || messageLower.includes("analytics dashboard")) {
      return projectImages["analytics hub"];
    } else if (messageLower.includes("huggies") || messageLower.includes("e-commerce") || messageLower.includes("redesign")) {
      return projectImages["huggies"];
    } else if (messageLower.includes("chatbot") || messageLower.includes("chat interface") || messageLower.includes("ai interface")) {
      return projectImages["chatbot"];
    }
    
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsExpanded(true);

    // Add user message with seen=true since it's being added while chat is open
    setMessages(prev => [...prev, { role: 'user', content: userMessage, seen: true }]);

    try {
      // In a real implementation, this would come from the server
      // Simulating a response with image detection here
      // This would normally be handled by the API
      
      let responseMessage = "";
      let imageData;
      
      // Simple logic to mimic a server responding with project information
      if (userMessage.toLowerCase().includes("analytics") || userMessage.toLowerCase().includes("dashboard")) {
        responseMessage = "The Analytics Hub was one of our most successful projects. It helped reduce time to insight for ~1,500 users daily and integrated OpenAI for natural language queries.";
        imageData = projectImages["analytics hub"];
      } else if (userMessage.toLowerCase().includes("huggies") || userMessage.toLowerCase().includes("redesign")) {
        responseMessage = "The Huggies redesign completely transformed their e-commerce platform, improving user navigation and increasing site retention time by over 75%.";
        imageData = projectImages["huggies"];
      } else if (userMessage.toLowerCase().includes("chatbot") || userMessage.toLowerCase().includes("ai")) {
        responseMessage = "Our AI Chatbot Interface provides a seamless way for users to interact with information using natural language. It's been implemented in several client projects.";
        imageData = projectImages["chatbot"];
      } else {
        // For demo purposes, try to make a server request that would normally return data
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: userMessage,
            model: selectedModel 
          }),
        });

        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Failed to get response");
        responseMessage = data.reply;
        
        // Check if we should show an image based on the response content
        imageData = getProjectImage(responseMessage);
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
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={linearTransition}
              ref={collapsedChatRef}
            >
              <motion.div 
                layoutId="chat-content"
                className="backdrop-blur-xl rounded-xl p-3 border bg-background/60"
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
                    <div className="flex-1">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Send a message..."
                        className="w-full bg-background/30 backdrop-blur-xl"
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
                  className="w-full h-full bg-background/70 backdrop-blur-md rounded-none md:rounded-xl overflow-hidden shadow-2xl flex flex-col border-none md:border"
                >
                  <motion.div
                    initial={!hasOpenedBefore ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={linearTransition}
                    className="flex justify-between items-center p-4 border-b"
                  >
                    <h2 className="text-lg font-semibold">ethanGPT</h2>
                    <Button variant="ghost" size="icon" onClick={handleClose}>
                      ✕
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={!hasOpenedBefore ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={linearTransition}
                    className="flex-1 overflow-y-auto bg-background/40 dark:bg-background/30 space-y-4 p-4"
                  >
                    {messages.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={linearTransition}
                        className="text-center text-muted-foreground"
                      >
                        Start a conversation
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
                            message.role === 'user' ? 'bg-background' : ''
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
                                <Image
                                  src={message.image.src}
                                  alt={message.image.alt}
                                  width={message.image.width || 600}
                                  height={message.image.height || 400}
                                  className="w-full h-auto object-cover max-h-[300px] rounded-lg"
                                />
                                <p className="text-xs text-muted-foreground mt-1">{message.image.alt}</p>
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
                    className="p-4 border-t"
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
                        <div className="flex-1">
                          <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Send a message..."
                            className="w-full bg-background/30 backdrop-blur-sm"
                            disabled={isLoading}
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