"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { TextAnimate } from "@/components/ui/text-animate";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { LinearBlur } from "progressive-blur";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    FileUp,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    PlusIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

// Faster and smoother loading animation with liquid glass
const LoadingAnimation = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="flex justify-start mb-6"
        >
            <div className="px-6 py-4">
                {/* Pulsing dot with accent color */}
                <div className="relative">
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1]
                        }}
                        className="w-3 h-3 bg-[#0087ef] rounded-full shadow-lg"
                    />
                    <motion.div
                        animate={{
                            scale: [0, 1.8, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1]
                        }}
                        className="absolute inset-0 w-3 h-3 bg-[#0087ef]/50 rounded-full"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export function VercelV0Chat() {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showingResponse, setShowingResponse] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 40,
        maxHeight: 200,
    });

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSubmit = async (message: string) => {
        if (!message.trim() || isLoading) return;

        const userMessage = message.trim();
        setValue("");
        adjustHeight(true);
        setIsLoading(true);
        setShowingResponse(false);

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    message: userMessage,
                    messages: messages,
                }),
            });

            const data = await res.json();
            
            if (!res.ok) {
                throw new Error(data.error || "Failed to get response");
            }
            
            // Add bot response with smooth transition
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
            
            // Smooth transition: fade out loading, then fade in response
            setTimeout(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setShowingResponse(true);
                }, 150); // Small delay for smooth transition
            }, 300); // Allow loading animation to fade out
            
        } catch (err) {
            console.error("Error:", err);
            const errorMessage = err instanceof Error ? err.message : "Sorry, I encountered an error. Please try again.";
            setMessages(prev => [...prev, { role: 'assistant', content: errorMessage }]);
            setIsLoading(false);
            setShowingResponse(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (value.trim()) {
                handleSubmit(value);
            }
        }
    };

    const handleSendClick = () => {
        if (value.trim()) {
            handleSubmit(value);
        }
    };

    const handleQuickAction = (prompt: string) => {
        setValue(prompt);
        setShowingResponse(false);
        handleSubmit(prompt);
    };

    // If no messages, show centered layout
    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-80px)] w-full max-w-4xl mx-auto p-4 space-y-8">
                <h1 className="text-4xl font-bold text-chalk text-center">
                    What do you want to know about me?
                </h1>

                <div className="w-full">
                    <LiquidGlass
                        theme="dark"
                        blur={20}
                        opacity={0.6}
                        showBorder={true}
                        showGradient={true}
                        showLiquidBg={true}
                        applyDistortion={false}
                        className="rounded-full"
                    >
                        <div className="flex items-center gap-3 px-1.5">
                            <div className="flex-1 overflow-y-auto">
                                <Textarea
                                    ref={textareaRef}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                        adjustHeight();
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything about my work, experience, or projects..."
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full px-4 py-3.5",
                                        "resize-none",
                                        "bg-transparent",
                                        "border-none",
                                        "text-chalk text-sm font-normal",
                                        "focus:outline-none",
                                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                                        "placeholder:text-chalk/50 placeholder:text-sm",
                                        "min-h-[48px]"
                                    )}
                                    style={{
                                        overflow: "hidden",
                                        fontSize: "14px",
                                        lineHeight: "1.5"
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSendClick}
                                disabled={!value.trim() || isLoading}
                                className={cn(
                                    "px-2 py-2 rounded-full text-sm transition-colors flex items-center justify-between gap-1",
                                    value.trim() && !isLoading
                                        ? "bg-chalk text-ink hover:bg-chalk/90"
                                        : "text-chalk/40 border border-chalk/20 cursor-not-allowed"
                                )}
                            >
                                <ArrowUpIcon
                                    className={cn(
                                        "w-4 h-4",
                                        value.trim() && !isLoading
                                            ? "text-ink"
                                            : "text-chalk/40"
                                    )}
                                />
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </LiquidGlass>

                    <div className="flex items-center justify-center gap-3 mt-4 flex-wrap">
                        <ActionButton
                            icon={<ImageIcon className="w-4 h-4" />}
                            label="Tell me about your UX/UI work"
                            onClick={() => handleQuickAction("Tell me about your UX/UI design work and approach")}
                            disabled={isLoading}
                        />
                        <ActionButton
                            icon={<FileUp className="w-4 h-4" />}
                            label="Your development skills"
                            onClick={() => handleQuickAction("What are your development and technical skills?")}
                            disabled={isLoading}
                        />
                        <ActionButton
                            icon={<MonitorIcon className="w-4 h-4" />}
                            label="Notable projects"
                            onClick={() => handleQuickAction("Tell me about your most notable projects and achievements")}
                            disabled={isLoading}
                        />
                        <ActionButton
                            icon={<CircleUserRound className="w-4 h-4" />}
                            label="About you"
                            onClick={() => handleQuickAction("Tell me about yourself and your background")}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // If messages exist, show chat layout with input at bottom
    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Messages Display - Full width scrolling */}
            <div className="flex-1 w-full overflow-y-auto pb-32 min-h-0 relative">
                <div className="max-w-4xl mx-auto space-y-4 pt-6 pb-4 px-4 md:px-6">
                    <AnimatePresence>
                        {messages.map((message, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-2xl mb-6 ${
                                    message.role === 'user' 
                                        ? 'bg-chalk text-ink px-4 py-2' 
                                        : 'text-chalk'
                                }`}>
                                    {message.role === 'assistant' && message === messages[messages.length - 1] && showingResponse && !isLoading ? (
                                        <TextAnimate 
                                            animation="blurInUp" 
                                            by="word" 
                                            duration={0.08}
                                            delay={0.2}
                                            className="text-lg leading-relaxed"
                                            startOnView={false}
                                        >
                                            {message.content}
                                        </TextAnimate>
                                    ) : message.role === 'assistant' && message === messages[messages.length - 1] && (isLoading || !showingResponse) ? (
                                        // Don't show text content while loading or transitioning
                                        null
                                    ) : (
                                        <p className="text-lg leading-relaxed">{message.content}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && <LoadingAnimation />}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input fixed at bottom */}
            <div className="absolute bottom-0 left-0 right-0 w-full p-4 md:px-6 z-20">
                <div className="max-w-4xl mx-auto">
                    <LiquidGlass
                        theme="dark"
                        blur={20}
                        opacity={0.6}
                        showBorder={true}
                        showGradient={true}
                        showLiquidBg={true}
                        applyDistortion={false}
                        className="rounded-full"
                    >
                        <div className="flex items-center gap-3 px-1.5 h-12"> {/* static 48px = 12*4 */}
                            <div className="flex-1 h-full flex items-center">
                                <Textarea
                                    ref={textareaRef}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything about my work, experience, or projects..."
                                    disabled={isLoading}
                                    className={cn(
                                        "w-full h-12 px-4",
                                        "resize-none",
                                        "bg-transparent",
                                        "border-none",
                                        "text-chalk text-2xl font-normal",
                                        "focus:outline-none",
                                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                                        "placeholder:text-chalk/50 placeholder:text-sm"
                                    )}
                                    style={{
                                        overflow: "hidden",
                                        fontSize: "16px",
                                        lineHeight: "20px",
                                        paddingTop: "20px",
                                        paddingBottom: "4px",
                                        boxSizing: "border-box"
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleSendClick}
                                disabled={!value.trim() || isLoading}
                                className={cn(
                                    "px-2 py-2 rounded-full text-sm transition-colors flex items-center justify-between gap-1",
                                    value.trim() && !isLoading
                                        ? "bg-chalk text-ink hover:bg-chalk/90"
                                        : "text-chalk/40 border border-chalk/20 cursor-not-allowed"
                                )}
                            >
                                <ArrowUpIcon
                                    className={cn(
                                        "w-4 h-4",
                                        value.trim() && !isLoading
                                            ? "text-ink"
                                            : "text-chalk/40"
                                    )}
                                />
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </LiquidGlass>
                    
                    {/* Disclaimer text */}
                    <p className="text-sm text-chalk/50 text-center mt-2">
                        AI can make mistakes, so only believe the things that make me look like a good candidate
                    </p>
                </div>
            </div>
            
            {/* Progressive Blur below input */}
            <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10 h-32">
                <LinearBlur
                    steps={8}
                    strength={32}
                    falloffPercentage={100}
                    tint="rgba(9, 9, 11, 0.8)"
                    side="bottom"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "128px",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

function ActionButton({ icon, label, onClick, disabled }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm transition-all",
                "bg-chalk/[0.03] border border-chalk/[0.1]",
                "hover:bg-chalk/[0.08] hover:border-[#0087ef]/30",
                "text-chalk/70 hover:text-chalk",
                disabled && "opacity-50 cursor-not-allowed hover:bg-chalk/[0.03] hover:border-chalk/[0.1] hover:text-chalk/70"
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}



