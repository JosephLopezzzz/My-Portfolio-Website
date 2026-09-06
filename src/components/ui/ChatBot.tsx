import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type ChatSession } from '@google/generative-ai';
import SpotlightCard from '@/components/ui/SpotlightCard';

// NOTE: Vite inlines `import.meta.env` at build time. On Vercel the
// VITE_GEMINI_API_KEY must be set in Project > Settings > Environment
// Variables, followed by a redeploy — otherwise this is '' in production.
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim() || '';
const IS_CONFIGURED = API_KEY.length > 0;

// gemini-1.5-flash is retired. Use a supported GA Flash model.
const CHAT_MODEL = 'gemini-2.5-flash';

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

const MISSING_KEY_MESSAGE =
  "Chat isn't configured yet (missing API key). If you're the site owner, set VITE_GEMINI_API_KEY in your hosting provider's environment variables and redeploy.";

const GENERIC_ERROR_MESSAGE =
  "Sorry, I'm having trouble connecting right now. Please check your network or try again.";

function getFriendlyErrorMessage(error: unknown): string {
  if (!IS_CONFIGURED) return MISSING_KEY_MESSAGE;
  const raw = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const msg = raw.toLowerCase();

  if (msg.includes('api_key_invalid') || msg.includes('api key not valid') || msg.includes('api key is invalid')) {
    return 'This chat key looks invalid. If you own this site, check that VITE_GEMINI_API_KEY is correct and redeploy.';
  }
  if (msg.includes('permission_denied') || msg.includes('403') || msg.includes('referer') || msg.includes('billing')) {
    return "The request was blocked (key restrictions, referrer policy, or billing). If you own this site, check the key's HTTP-referrer restrictions and billing status.";
  }
  if (msg.includes('404') || msg.includes('not_found') || msg.includes('not found') || msg.includes('is not found')) {
    return `The configured model (${CHAT_MODEL}) isn't available. If you own this site, update the model ID to a supported Flash model.`;
  }
  if (msg.includes('429') || msg.includes('quota') || msg.includes('rate') || msg.includes('resource_exhausted')) {
    return 'The chat is rate-limited right now. Please wait a moment and retry.';
  }
  return GENERIC_ERROR_MESSAGE;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, isError?: boolean}[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<ChatSession | null>(null);
  const genAIRef = useRef<GoogleGenerativeAI | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initChat = async (): Promise<string | null> => {
    if (chatSessionRef.current) return null;
    if (!IS_CONFIGURED) {
      setInitError(MISSING_KEY_MESSAGE);
      return MISSING_KEY_MESSAGE;
    }
    try {
      if (!genAIRef.current) {
        genAIRef.current = new GoogleGenerativeAI(API_KEY);
      }
      const model = genAIRef.current.getGenerativeModel({
        model: CHAT_MODEL,
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 300,
        },
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        ],
      });
      chatSessionRef.current = model.startChat({
        history: [],
      });
      setInitError(null);
      return null;
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      const friendly = getFriendlyErrorMessage(e);
      setInitError(friendly);
      return friendly;
    }
  };

  useEffect(() => {
    if (isOpen) {
      void initChat();
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
    if (!IS_CONFIGURED) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: MISSING_KEY_MESSAGE,
        isError: true
      }]);
      return;
    }
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        const initFailure = await initChat();
        if (initFailure || !chatSessionRef.current) {
          throw new Error(initFailure || 'Chat session could not be initialized.');
        }
      }

      const result = await chatSessionRef.current.sendMessage(messageText);
      const botResponse = result.response.text();

      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: getFriendlyErrorMessage(error),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading || !IS_CONFIGURED) return;
    
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
                {IS_CONFIGURED ? (
                  <span className="text-green-500 text-xs tracking-wider font-bold">ONLINE</span>
                ) : (
                  <span className="text-amber-500 text-xs tracking-wider font-bold">NOT CONFIGURED</span>
                )}
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
            {!IS_CONFIGURED && (
              <div className="p-3 rounded-2xl text-xs leading-relaxed bg-amber-500/10 border border-amber-500/40 text-amber-200">
                {MISSING_KEY_MESSAGE}
              </div>
            )}
            {IS_CONFIGURED && initError && (
              <div className="p-3 rounded-2xl text-xs leading-relaxed bg-destructive/10 border border-destructive/40 text-destructive-foreground">
                {initError}
              </div>
            )}
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
                placeholder={IS_CONFIGURED ? "Type a message..." : "Chat not configured..."}
                className="flex-1 bg-transparent border-none text-foreground text-sm outline-none placeholder:text-muted-foreground"
                disabled={isLoading || !IS_CONFIGURED}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading || !IS_CONFIGURED}
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
