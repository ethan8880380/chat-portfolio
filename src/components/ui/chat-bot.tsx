"use client";

import { useState, useRef, useEffect } from "react";
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
const WordByWordTypewriter = ({ text, speed = 40, delayBetweenWords = 30 }: { 
  text: string; 
  speed?: number;
  delayBetweenWords?: number;
}) => {
  const [displayedWords, setDisplayedWords] = useState<Array<{word: string, highlight: boolean}>>([]);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Split text into words on mount
    const splitWords = text.split(/(\s+)/); // Split keeping spaces
    
    // Show full text immediately if reduced motion is preferred
    if (prefersReducedMotion) {
      setDisplayedWords(splitWords.map(word => ({ word, highlight: false })));
      setIsComplete(true);
      return;
    }
    
    // Reset state when text changes
    setDisplayedWords([]);
    setIsComplete(false);
    
    let wordIndex = 0;
    
    const animateNextWord = () => {
      if (wordIndex < splitWords.length) {
        const word = splitWords[wordIndex];
        
        // Add the new word with highlight true
        setDisplayedWords(prev => [
          ...prev.map(item => ({...item, highlight: false})), // Turn off highlight for all previous words
          { word, highlight: true } // Add new word with highlight
        ]);
        
        wordIndex++;
        
        // Turn off highlight after a short delay
        setTimeout(() => {
          setDisplayedWords(prev => 
            prev.map((item, i) => i === prev.length - 1 ? {...item, highlight: false} : item)
          );
        }, 150); // Duration of highlight effect
        
        // Sophisticated timing algorithm for natural-feeling text
        // Longer words take longer, punctuation adds pauses, slight randomness for human feel
        const baseDelay = word.length * speed;
        const randomFactor = Math.random() * delayBetweenWords; 
        const punctuationDelay = word.match(/[.,!?;:]/) ? 200 : 0;
        const endOfSentenceDelay = word.match(/[.!?]\s*$/) ? 350 : 0;
        const nextTiming = baseDelay + randomFactor + punctuationDelay + endOfSentenceDelay;
        
        setTimeout(animateNextWord, nextTiming);
      } else {
        setIsComplete(true);
      }
    };
    
    // Start the animation
    setTimeout(animateNextWord, 100); // Small initial delay
    
    // Cleanup function
    return () => {
      setDisplayedWords([]);
      setIsComplete(false);
    };
  }, [text, prefersReducedMotion, speed, delayBetweenWords]);
  
  if (prefersReducedMotion) {
    return <p className="text-sm whitespace-pre-wrap">{text}</p>;
  }
  
  return (
    <p className="text-sm whitespace-pre-wrap">
      {/* Render words with highlights */}
      {displayedWords.map((item, index) => (
        <span 
          key={index} 
          className={`transition-colors duration-150 ease-out ${
            item.highlight 
              ? 'text-primary font-medium' 
              : ''
          }`}
        >
          {item.word}
        </span>
      ))}
      
      {/* Add blinking cursor at the end when not complete */}
      {!isComplete && (
        <span 
          className="inline-block h-4 w-[1px] mx-[1px] bg-foreground animate-pulse" 
          style={{ animationDuration: "750ms" }} 
        />
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
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Failed to get response");
        responseMessage = data.reply;
        
        // Check if we should show an image based on the response content
        imageData = getProjectImage(responseMessage);
      }
      
      // Bot message with seen=true since it's added while chat is open
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: responseMessage,
        image: imageData,
        seen: true
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
                key="backdrop"
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
                className="fixed inset-0 m-4 md:m-auto md:inset-[5%] lg:inset-[10%] max-h-[90vh] md:max-h-[80vh] max-w-[70vw] mx-auto z-50"
                initial={!hasOpenedBefore ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <motion.div
                  layoutId="chat-content"
                  transition={linearTransition}
                  className="w-full h-full bg-background/70 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl flex flex-col border"
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
                              <WordByWordTypewriter text={message.content} />
                            ) : (
                              <p className="text-sm">{message.content}</p>
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
                                  delay: message.role === 'bot' && message === messages[messages.length - 1] && !message.seen ? 
                                    message.content.length * 0.01 : 0 // Delay image after text finishes typing
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
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="h-2 w-2 rounded-full bg-foreground/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
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