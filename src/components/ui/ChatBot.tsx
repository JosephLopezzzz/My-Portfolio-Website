import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import SpotlightCard from '@/components/ui/SpotlightCard';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `You are Joseph T Lopez, an IT student at Bestlink College of the Philippines (Expected 2027) based in Quezon City. 
You are acting as an interactive assistant on Joseph's portfolio website. 
Your goal is to answer questions about Joseph, his projects, skills, education, and contact information. 
Keep your answers brief, friendly, and professional (1-3 sentences max).
Do not break character. Do not say you are an AI language model.
Skills: React, Next.js, React Native, Node.js, PHP, Python, Java, C++, C, MySQL, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, Bootstrap, Git, GitHub, Linux.
Projects: 
1. Nokma: Macro tracking app with React Native. 
2. HR Management System G1: React-based HR system. 
3. Fraud Detection in Microfinance: Node.js fraud detection. 
4. Microfinance SMS: Automated SMS system. 
5. Fleet & Transport Management: Capstone project, full system.
Contact: Email: josephlopez102004@gmail.com, GitHub: JosephLopezzzz, LinkedIn: Joseph T. Lopez.
If asked something completely unrelated to Joseph, politely decline and steer the conversation back to his professional profile.`;

const INITIAL_MESSAGE = "Hey! I'm Joseph - feel free to ask about my projects, the stack I work with, or anything else on the site.";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isError?: boolean}[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initChat = async () => {
    if (chatSessionRef.current) return;
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });
      chatSessionRef.current = model.startChat({
        history: [],
      });
    } catch (e) {
      console.error("Failed to initialize chat:", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      initChat();
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle ChatBot with Cmd+K or /
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        // Prevent default if not typing in an input
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA' ||
          document.activeElement?.isContentEditable
        ) {
          return; // Ignore if user is already typing somewhere
        }
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      // Close on Escape if open
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  const sendMessageToBot = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        await initChat();
      }
      
      const result = await chatSessionRef.current.sendMessage(messageText);
      const botResponse = result.response.text();
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Sorry, I'm having trouble connecting right now. Please check your network or try again.", 
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    sendMessageToBot(userMessage);
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setMessages(prev => prev.filter(m => !m.isError));
      sendMessageToBot(lastUserMessage.text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-6 py-3 bg-secondary/80 backdrop-blur-md border border-border rounded-xl text-foreground font-medium hover:bg-secondary transition-all shadow-sm group"
          aria-label="Chat with me"
        >
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Chat with Joseph</span>
          <kbd className="hidden md:inline-flex items-center gap-1 ml-2 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-background rounded border border-border/50">
            <span className="text-[10px]">⌘</span>K
          </kbd>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <SpotlightCard className="!p-0 fixed bottom-6 right-6 z-[60] w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-100px)] flex flex-col bg-card/90 backdrop-blur-xl border border-border shadow-2xl overflow-hidden transition-all duration-300 animate-fade-in font-sans">
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-foreground/5 z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/pfp/white1x1.png" 
                  alt="Joseph Lopez" 
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  onError={(e) => {
                     // Fallback to a placeholder if the avatar fails to load
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-foreground font-semibold text-sm">Chat with Joseph</h3>
                <span className="text-green-500 text-xs tracking-wider font-bold">ONLINE</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-foreground/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent z-10">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <img 
                    src="/pfp/white1x1.png" 
                    alt="Bot" 
                    className="w-8 h-8 rounded-full object-cover mr-2 self-end mb-1"
                    onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
                  />
                )}
                <div className="flex flex-col gap-1 max-w-[75%]">
                  <div 
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-br-sm' 
                        : msg.isError 
                          ? 'bg-destructive/20 border border-destructive/50 text-destructive-foreground rounded-bl-sm'
                          : 'bg-secondary/50 border border-border text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.isError && (
                    <button 
                      onClick={handleRetry}
                      disabled={isLoading}
                      className="self-start text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 mt-1"
                    >
                      Retry sending message
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex w-full justify-start items-end">
                 <img src="/pfp/white1x1.png" className="w-8 h-8 rounded-full mr-2" alt="typing" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                <div className="max-w-[75%] p-3 rounded-2xl text-sm bg-secondary/50 border border-border text-foreground rounded-bl-sm flex gap-1.5 px-4 items-center h-10">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '400ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-foreground/5 border-t border-border z-10">
            <div className="flex items-center gap-2 bg-background/50 border border-border rounded-full p-1 pl-4 focus-within:border-foreground/30 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none text-foreground text-sm outline-none placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-foreground text-background rounded-full hover:opacity-80 transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>

        </SpotlightCard>
      )}
    </>
  );
};
