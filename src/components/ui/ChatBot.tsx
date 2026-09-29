import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import SpotlightCard from '@/components/ui/SpotlightCard';

const INITIAL_MESSAGE = "Hey! I'm Joseph - feel free to ask about my projects, the stack I work with, or anything else on the site.";
const MISSING_KEY_MESSAGE = "Chat isn't configured yet. The site owner needs to set GEMINI_API_KEY on the server.";
const SERVICE_UNAVAILABLE_MESSAGE = 'The chat service is unavailable on this host right now.';
const GENERIC_ERROR_MESSAGE = "Sorry, I'm having trouble connecting right now. Please check your network or try again.";

const INSTANT_ANSWERS: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /\b(contact|email|e-mail|reach\b|get in touch|hire|linkedin|github)\b/i,
    reply: "You can reach Joseph at josephlopez102004@gmail.com. He's also on GitHub as JosephLopezzzz and on LinkedIn as Joseph T. Lopez.",
  },
  {
    pattern: /\b(skills?|tech stack|technolog(y|ies)|languages?|stack)\b/i,
    reply: 'Joseph works with React, Next.js, React Native, Node.js, PHP, Python, Java, C++, C, MySQL, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, Bootstrap, Git, GitHub, Figma, Linux, and computer hardware & diagnostics.',
  },
  {
    pattern: /\b(certificat\w*|credly|cisco|freecodecamp|coddy)\b/i,
    reply: 'Joseph holds Cisco Networking Academy certificates (Networking Basics, Computer Hardware Basics, and Prompt Like an Engineer, with verification links on Credly), a freeCodeCamp Python certification, and several Coddy courses covering HTML, CSS, and C.',
  },
  {
    pattern: /\b(education|school|college|degree|studying|university)\b/i,
    reply: 'Joseph is an IT student at Bestlink College of the Philippines, expecting to graduate in 2027. He is based in Quezon City.',
  },
];

function matchInstantAnswer(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length > 48) return null;
  const matches = INSTANT_ANSWERS.filter(({ pattern }) => pattern.test(trimmed));
  return matches.length === 1 ? matches[0].reply : null;
}

type ChatMessage = { role: 'user' | 'model'; text: string; isError?: boolean };
type ApiError = Error & { code?: string; status?: number };

function apiError(code: string, status?: number): ApiError {
  return Object.assign(new Error(code), { code, status });
}

function friendlyError(error: unknown): string {
  const api = error as ApiError;
  if (api?.code === 'not_configured') return MISSING_KEY_MESSAGE;
  if (api?.code === 'rate_limited' || api?.status === 429) return 'The chat is rate-limited right now. Please wait a moment and retry.';
  if (api?.code === 'invalid_configuration') return 'The chat service could not authorize its Gemini request. Please try again later.';
  if (api?.code === 'no_model') return 'The chat service has no compatible model available right now. Please try again later.';
  return GENERIC_ERROR_MESSAGE;
}

async function streamChat(messages: ChatMessage[], onText: (piece: string) => void) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.slice(-20).map(({ role, text }) => ({ role, text })),
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({})) as { error?: string };
    throw apiError(body.error || 'unavailable', response.status);
  }
  if (!response.body) throw apiError('unavailable');

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let receivedText = false;

  const consumeEvent = (event: string) => {
    const data = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trimStart())
      .join('\n');
    if (!data || data === '[DONE]') return;
    let payload: { text?: string; error?: string };
    try {
      payload = JSON.parse(data);
    } catch {
      throw apiError('unavailable');
    }
    if (payload.error) throw apiError(payload.error);
    if (typeof payload.text === 'string' && payload.text) {
      receivedText = true;
      onText(payload.text);
    }
  };

  while (true) {
    const { value, done } = await reader.read();
    buffer += decoder.decode(value, { stream: !done });
    let separator = buffer.match(/\r?\n\r?\n/);
    while (separator?.index !== undefined) {
      consumeEvent(buffer.slice(0, separator.index));
      buffer = buffer.slice(separator.index + separator[0].length);
      separator = buffer.match(/\r?\n\r?\n/);
    }
    if (done) break;
  }
  if (buffer.trim()) consumeEvent(buffer);
  if (!receivedText) throw apiError('empty_response');
}

const MessageAvatar = React.memo(function MessageAvatar({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-8 h-8 rounded-full border border-border bg-card overflow-hidden mr-2 self-end mb-1 flex-shrink-0">
      <img src="/pfp/white1x1.png" alt="Joseph" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: isDark ? 0 : 1 }} draggable={false} />
      <img src="/pfp/black1x1.png" alt="Joseph" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: isDark ? 1 : 0 }} draggable={false} />
    </div>
  );
});

const MessageList = React.memo(function MessageList({
  messages,
  isDark,
  isLoading,
  showTyping,
  onRetry,
}: {
  messages: ChatMessage[];
  isDark: boolean;
  isLoading: boolean;
  showTyping: boolean;
  onRetry: () => void;
}) {
  return (
    <>
      {messages.map((msg, idx) => (
        <div key={idx} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'model' && <MessageAvatar isDark={isDark} />}
          <div className="flex flex-col gap-1 max-w-[75%]">
            <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : msg.isError ? 'bg-destructive/20 border border-destructive/50 text-destructive-foreground rounded-bl-sm' : 'bg-secondary/50 border border-border text-foreground rounded-bl-sm'}`}>
              {msg.text}
            </div>
            {msg.isError && (
              <button onClick={onRetry} disabled={isLoading} className="self-start text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 mt-1">
                Retry sending message
              </button>
            )}
          </div>
        </div>
      ))}
      {showTyping && (
        <div className="flex w-full justify-start items-end">
          <MessageAvatar isDark={isDark} />
          <div className="max-w-[75%] p-3 rounded-2xl text-sm bg-secondary/50 border border-border text-foreground rounded-bl-sm flex gap-1.5 px-4 items-center h-10">
            {[0, 200, 400].map((delay) => <span key={delay} className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: `${delay}ms` }} />)}
          </div>
        </div>
      )}
    </>
  );
});

const ChatInput = React.memo(function ChatInput({
  disabled,
  canSend,
  placeholder,
  onSend,
}: {
  disabled: boolean;
  canSend: boolean;
  placeholder: string;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState('');
  const submit = () => {
    const text = value.trim();
    if (!text || !canSend) return;
    setValue('');
    onSend(text);
  };

  return (
    <div className="flex items-center gap-2 bg-background/50 border border-border rounded-full p-1 pl-4 focus-within:border-foreground/30 transition-colors">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        autoFocus
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none text-foreground text-sm outline-none placeholder:text-muted-foreground"
        disabled={disabled}
      />
      <button onClick={submit} disabled={!value.trim() || !canSend} className="p-2.5 bg-foreground text-background rounded-full hover:opacity-80 transition-colors disabled:opacity-50" aria-label="Send message">
        <Send size={16} />
      </button>
    </div>
  );
});

export const ChatBot = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [apiUnavailable, setApiUnavailable] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'model', text: INITIAL_MESSAGE }]);
  const [isLoading, setIsLoading] = useState(false);
  const [awaitingFirstToken, setAwaitingFirstToken] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef(messages);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/chat')
      .then(async (response) => {
        if (!response.ok) {
          setApiUnavailable(true);
          return;
        }
        const data = await response.json() as { configured?: boolean };
        if (typeof data.configured === 'boolean') setConfigured(data.configured);
        else setApiUnavailable(true);
      })
      .catch(() => setApiUnavailable(true));
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el || !isAtBottom) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isLoading, isAtBottom]);

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || (document.activeElement as HTMLElement)?.isContentEditable) return;
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen]);

  const sendMessageToBot = useCallback(async (messageText: string, history: ChatMessage[]) => {
    if (!messageText.trim() || isLoadingRef.current) return;
    const instant = matchInstantAnswer(messageText);
    if (instant) {
      const next = [...messagesRef.current, { role: 'model' as const, text: instant }];
      messagesRef.current = next;
      setMessages(next);
      return;
    }
    if (configured === false || apiUnavailable) {
      const next = [...messagesRef.current, { role: 'model' as const, text: apiUnavailable ? SERVICE_UNAVAILABLE_MESSAGE : MISSING_KEY_MESSAGE, isError: true }];
      messagesRef.current = next;
      setMessages(next);
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    setAwaitingFirstToken(true);
    let reply = '';
    let hasReplyBubble = false;
    try {
      await streamChat(history.filter((message) => !message.isError), (piece) => {
        reply += piece;
        const current = messagesRef.current;
        let next: ChatMessage[];
        if (!hasReplyBubble) {
          hasReplyBubble = true;
          setAwaitingFirstToken(false);
          next = [...current, { role: 'model', text: reply }];
        } else {
          next = [...current.slice(0, -1), { role: 'model', text: reply }];
        }
        messagesRef.current = next;
        setMessages(next);
      });
    } catch (error) {
      const next = [...messagesRef.current, { role: 'model' as const, text: friendlyError(error), isError: true }];
      messagesRef.current = next;
      setMessages(next);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
      setAwaitingFirstToken(false);
    }
  }, [apiUnavailable, configured]);

  const handleSend = useCallback((text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoadingRef.current) return;
    const history = [...messagesRef.current, { role: 'user' as const, text: userMessage }];
    messagesRef.current = history;
    setMessages(history);
    void sendMessageToBot(userMessage, history);
  }, [sendMessageToBot]);

  const handleRetry = useCallback(() => {
    const current = messagesRef.current;
    const lastUserMessage = [...current].reverse().find((message) => message.role === 'user');
    if (!lastUserMessage) return;
    let kept = current.filter((message) => !message.isError);
    if (kept[kept.length - 1]?.role === 'model') kept = kept.slice(0, -1);
    messagesRef.current = kept;
    setMessages(kept);
    void sendMessageToBot(lastUserMessage.text, kept);
  }, [sendMessageToBot]);

  const configuredLabel = configured === false ? 'NOT CONFIGURED' : apiUnavailable ? 'OFFLINE' : configured === true ? 'ONLINE' : 'CONNECTING';

  return (
    <>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 px-6 py-3 bg-secondary/80 backdrop-blur-md border border-border rounded-xl text-foreground font-medium hover:bg-secondary transition-all shadow-sm group" aria-label="Chat with me">
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Chat with Joseph</span>
          <kbd className="hidden md:inline-flex items-center gap-1 ml-2 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-background rounded border border-border/50"><span className="text-[10px]">⌘</span>K</kbd>
        </button>
      )}

      {isOpen && (
        <SpotlightCard className="!p-0 fixed bottom-6 right-6 z-[60] w-[350px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-100px)] flex flex-col bg-card/90 backdrop-blur-xl border border-border shadow-2xl overflow-hidden transition-all duration-300 animate-fade-in font-sans">
          <div className="flex items-center justify-between p-4 border-b border-border bg-foreground/5 z-10">
            <div className="flex items-center gap-3">
              <div className="relative group/avatar cursor-pointer">
                <div className="relative w-10 h-10 rounded-full border border-border bg-card overflow-hidden transition-transform duration-300 group-hover/avatar:scale-105 shadow-sm">
                  <img src="/pfp/white1x1.png" alt="Joseph Lopez" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" style={{ opacity: isDark ? 0 : 1 }} draggable={false} />
                  <img src="/pfp/black1x1.png" alt="Joseph Lopez" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" style={{ opacity: isDark ? 1 : 0 }} draggable={false} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full z-10" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-foreground font-semibold text-sm">Chat with Joseph</h3>
                <span className={`text-xs tracking-wider font-bold ${configured === true ? 'text-green-500' : 'text-amber-500'}`}>{configuredLabel}</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground p-2 rounded-full hover:bg-foreground/10 transition-colors" aria-label="Close chat"><X size={20} /></button>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={(event) => {
              const el = event.currentTarget;
              setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 120);
            }}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent z-10"
          >
            {configured === false && <div className="p-3 rounded-2xl text-xs leading-relaxed bg-amber-500/10 border border-amber-500/40 text-amber-200">{MISSING_KEY_MESSAGE}</div>}
            {apiUnavailable && <div className="p-3 rounded-2xl text-xs leading-relaxed bg-amber-500/10 border border-amber-500/40 text-amber-200">{SERVICE_UNAVAILABLE_MESSAGE}</div>}
            <MessageList messages={messages} isDark={isDark} isLoading={isLoading} showTyping={awaitingFirstToken} onRetry={handleRetry} />
          </div>

          <div className="p-4 bg-foreground/5 border-t border-border z-10">
            <ChatInput disabled={configured === false || apiUnavailable} canSend={!isLoading} placeholder={configured === false ? 'Chat not configured...' : apiUnavailable ? 'Chat unavailable...' : 'Type a message...'} onSend={handleSend} />
          </div>
        </SpotlightCard>
      )}
    </>
  );
};

export default ChatBot;
