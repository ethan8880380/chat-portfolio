"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { TextAnimate } from "@/components/ui/text-animate";
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

// Faster and smoother loading animation
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
                {/* Faster pulsing dot */}
                <div className="relative">
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: [0.4, 0, 0.6, 1] // Smoother easing
                        }}
                        className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"
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
                        className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full"
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
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });

    // Project options based on training data
    const projects = [
        { id: "commercial-analytics-hub", name: "Commercial Analytics Hub", description: "GDUSA Award-winning internal analytics platform serving 1,000+ users weekly" },
        { id: "enterprise-design-system", name: "Enterprise Design System", description: "Company-wide design system standardizing UX across all digital products" },
        { id: "genfei-chatbot", name: "GenFEI Chatbot", description: "Complex AI chatbot for Research & Engineering team with multiple knowledge bases" },
        { id: "iris-analytics", name: "IRIS Analytics Dashboard", description: "Complex analytics dashboard focusing on raw insights and predictive analytics" },
        { id: "web-templates", name: "Standardized Web Templates", description: "Web templates used by almost all consumer brands at Kimberly-Clark" },
        { id: "pullups-research", name: "Pull-Ups Potty Training Research", description: "Comprehensive user research for digital potty training solution" },
        { id: "buyerspring", name: "BuyerSpring Real Estate Platform", description: "Innovative real estate platform reimagining home buying and selling" },
        { id: "huggies-website", name: "Huggies Website Redesign", description: "Complete website redesign improving UX and driving product discovery" },
        { id: "defoor-development", name: "DEFOOR Property Development", description: "Custom website for luxury property development company" },
    ];

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowProjectDropdown(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                    selectedProject: selectedProject // Include selected project context
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

    const handleProjectSelect = (projectId: string) => {
        setSelectedProject(projectId);
        setShowProjectDropdown(false);
        setShowingResponse(false);
        
        // Clear messages when switching projects
        setMessages([]);
        
        // Add initial message about the selected project
        const selectedProjectData = projects.find(p => p.id === projectId);
        if (selectedProjectData) {
            const initialMessage = `Tell me about the ${selectedProjectData.name} project.`;
            handleSubmit(initialMessage);
        }
    };

    const clearProjectSelection = () => {
        setSelectedProject(null);
        setMessages([]);
        setShowingResponse(false);
    };

    // If no messages, show centered layout
    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-80px)] w-full max-w-4xl mx-auto p-4 space-y-8">
                <h1 className="text-4xl font-bold text-foreground text-center">
                    What do you want to know about me?
                </h1>

                <div className="w-full">
                    <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
                        <div className="overflow-y-auto">
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
                                    "w-full px-4 py-3",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none",
                                    "text-white text-lg font-normal",
                                    "focus:outline-none",
                                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                                    "placeholder:text-neutral-500 placeholder:text-lg",
                                    "min-h-[60px]"
                                )}
                                style={{
                                    overflow: "hidden",
                                    fontSize: "18px",
                                    lineHeight: "1.75"
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                                {/* Removed attach button */}
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="px-2 py-1 rounded-lg text-sm text-zinc-400 transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1"
                                    disabled={isLoading}
                                >
                                    <PlusIcon className="w-4 h-4" />
                                    Project
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSendClick}
                                    disabled={!value.trim() || isLoading}
                                    className={cn(
                                        "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1",
                                        value.trim() && !isLoading
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "text-zinc-400 cursor-not-allowed"
                                    )}
                                >
                                    <ArrowUpIcon
                                        className={cn(
                                            "w-4 h-4",
                                            value.trim() && !isLoading
                                                ? "text-black"
                                                : "text-zinc-400"
                                        )}
                                    />
                                    <span className="sr-only">Send</span>
                                </button>
                            </div>
                        </div>
                    </div>

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
        <div className="flex flex-col h-[calc(100vh-80px)] w-full -mt-6">
            {/* Messages Display - Full width scrolling */}
            <div className="flex-1 w-full overflow-y-auto pb-24">
                <div className="max-w-4xl mx-auto space-y-4 py-4 pt-24 px-4 md:px-0">
                    <AnimatePresence>
                        {messages.map((message, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] rounded-lg mb-6 ${
                                    message.role === 'user' 
                                        ? 'bg-foreground text-background px-4 py-2' 
                                        : 'text-foreground'
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
            <div className="absolute bottom-0 left-0 right-0 w-full p-4 ">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-neutral-900 rounded-xl border border-neutral-800">
                        <div className="overflow-y-auto">
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
                                    "w-full px-4 py-3",
                                    "resize-none",
                                    "bg-transparent",
                                    "border-none",
                                    "text-white text-lg font-normal",
                                    "focus:outline-none",
                                    "focus-visible:ring-0 focus-visible:ring-offset-0",
                                    "placeholder:text-neutral-500 placeholder:text-lg",
                                    "min-h-[60px]"
                                )}
                                style={{
                                    overflow: "hidden",
                                    fontSize: "18px",
                                    lineHeight: "1.75"
                                }}
                            />
                        </div>

                        <div className="flex items-center justify-end p-3">
                            <div className="flex items-center gap-2">
                                <div className="relative z-10">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowProjectDropdown(!showProjectDropdown);
                                        }}
                                        className={cn(
                                            "px-2 py-1 rounded-lg text-sm transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1 text-zinc-400",
                                            selectedProject && "bg-zinc-800 border-zinc-600",
                                            "relative z-20"
                                        )}
                                        disabled={isLoading}
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        {selectedProject ? 
                                            projects.find(p => p.id === selectedProject)?.name.split(' ')[0] || 'Project'
                                            : 'Project'
                                        }
                                    </button>
                                    
                                    {/* Project Dropdown */}
                                    {showProjectDropdown && (
                                        <div 
                                            ref={dropdownRef}
                                            className="absolute bottom-full mb-2 right-0 w-80 max-w-[calc(100vw-2rem)] bg-neutral-900 border border-neutral-700 rounded-lg shadow-xl z-[100]"
                                        >
                                            <div className="p-3 border-b border-neutral-700">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-sm font-medium text-white">Select Project</h3>
                                                    {selectedProject && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                clearProjectSelection();
                                                            }}
                                                            className="text-xs text-zinc-400 hover:text-white transition-colors"
                                                        >
                                                            Clear
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="max-h-60 overflow-y-auto">
                                                {projects.map((project) => (
                                                    <button
                                                        key={project.id}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleProjectSelect(project.id);
                                                        }}
                                                        className={cn(
                                                            "w-full text-left p-3 hover:bg-neutral-800 transition-colors border-b border-neutral-800 last:border-b-0",
                                                            selectedProject === project.id && "bg-neutral-800"
                                                        )}
                                                    >
                                                        <div className="text-sm font-medium text-white mb-1">
                                                            {project.name}
                                                        </div>
                                                        <div className="text-xs text-zinc-400">
                                                            {project.description}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSendClick}
                                    disabled={!value.trim() || isLoading}
                                    className={cn(
                                        "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1",
                                        value.trim() && !isLoading
                                            ? "bg-white text-black hover:bg-gray-100"
                                            : "text-zinc-400 cursor-not-allowed"
                                    )}
                                >
                                    <ArrowUpIcon
                                        className={cn(
                                            "w-4 h-4",
                                            value.trim() && !isLoading
                                                ? "text-black"
                                                : "text-zinc-400"
                                        )}
                                    />
                                    <span className="sr-only">Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Disclaimer text */}
                    <p className="text-sm text-foreground/50 text-center mt-2">
                        AI can make mistakes, so only believe the things that make me look like a good candidate
                    </p>
                </div>
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
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors border border-neutral-300 dark:border-neutral-700",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600",
                "text-neutral-700 dark:text-neutral-300",
                disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}



