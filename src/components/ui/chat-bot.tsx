"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from "framer-motion";
import { SendIcon } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";

interface Message {
  role: 'user' | 'bot';
  content: string;
  seen?: boolean;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const collapsedChatRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const { shouldExpandChat, setShouldExpandChat } = useChatContext();

  // Listen for expand requests from the context
  useEffect(() => {
    if (shouldExpandChat) {
      setIsExpanded(true);
      setShouldExpandChat(false);
    }
  }, [shouldExpandChat, setShouldExpandChat]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setIsExpanded(true);

    // Add user message
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: userMessage,
      seen: true
    }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          messages: messages.map(msg => ({
            role: msg.role === 'bot' ? 'assistant' : msg.role,
            content: msg.content
          }))
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }
      
      // Add bot response
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: data.reply,
        seen: false
      }]);
      
    } catch (err: unknown) {
      console.error("Error:", err);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: err instanceof Error ? err.message : "Sorry, I encountered an error. Please try again.",
        seen: true
      }]);
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
    setTimeout(() => {
      setIsExpanded(false);
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
                className="backdrop-blur-xl rounded-xl p-3 border bg-background"
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
                        placeholder="Type your message..."
                        className="w-full bg-background backdrop-blur-sm border text-foreground cursor-text focus:ring-2 focus:ring-primary"
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
                className="fixed inset-0 bg-background backdrop-blur-none"
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
                  className="w-full h-full bg-background/80 backdrop-blur-xl rounded-none md:rounded-xl overflow-hidden shadow-2xl flex flex-col border-none md:border"
                >
                  <motion.div
                    initial={!hasOpenedBefore ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={linearTransition}
                    className="flex justify-between items-center p-4 border-b"
                  >
                    <h2 className="text-lg font-semibold text-foreground">Chat</h2>
                    <Button variant="ghost" size="icon" onClick={handleClose} className="text-foreground">
                      ✕
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    initial={!hasOpenedBefore ? { opacity: 0 } : { opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={linearTransition}
                    className="flex-1 overflow-y-auto space-y-4 p-4"
                  >
                    {messages.length === 0 ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={linearTransition}
                        className="text-center h-[90%] flex items-center justify-center text-foreground"
                      >
                        Start a conversation!
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
                          <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.role === 'user' ? 'bg-background text-foreground border' : 'text-foreground/80'
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
                        <div className="flex-1 relative">
                          <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="w-full backdrop-blur-xl cursor-text focus:ring-2 focus:ring-primary"
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