import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import type { Chat, GoogleGenAI } from '@google/genai';
import { useTheme } from 'next-themes';
import SpotlightCard from '@/components/ui/SpotlightCard';

// NOTE: Vite inlines `import.meta.env` at build time. On Vercel the
// VITE_GEMINI_API_KEY must be set in Project > Settings > Environment
// Variables, followed by a redeploy — otherwise this is '' in production.
const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim() || '';
const IS_CONFIGURED = API_KEY.length > 0;

// Model preference order. Only a model the key's own ListModels response
// contains is ever selected, so this list can safely include newer IDs.
// gemini-3.6-flash is first: Google's API explicitly points new keys at it.
const PREFERRED_MODELS = [
  'models/gemini-3.6-flash',
  'models/gemini-2.5-flash',
  'models/gemini-2.5-flash-lite',
  'models/gemini-3.5-flash',
  'models/gemini-3.5-flash-lite',
  'models/gemini-3.8-flash',
  'models/gemini-3.1-flash-lite',
  'models/gemini-flash-latest',
];

// Never auto-select these kinds of models for a text chat bot.
const EXCLUDED_MODEL_PATTERN = /image|tts|transcribe|embed|live|video|veo|imagen|lyria/i;

// Resolved once per page load; the key can't change without a rebuild.
let resolvedModel: string | null = null;
// Models that returned NOT_FOUND at send time despite being listed.
// Skipped by re-discovery so we never retry a dead model in a loop.
const failedModels = new Set<string>();

const MODEL_CACHE_KEY = 'chatbot:model';

// sessionStorage can throw (private mode, blocked site data), and a miss just
// costs one ListModels round trip — never let it break chat.
function readCachedModel(): string | null {
  try {
    return sessionStorage.getItem(MODEL_CACHE_KEY);
  } catch {
    return null;
  }
}

function writeCachedModel(model: string) {
  try {
    sessionStorage.setItem(MODEL_CACHE_KEY, model);
  } catch {
    /* non-fatal */
  }
}

// How to keep the model from spending seconds thinking before it answers.
// This is versioned and unforgiving: 3.5+ rejects `thinkingBudget` outright,
// 2.5 needs `thinkingBudget: 0` to switch off, and models without thinking
// support at all error if the field is present. So the plan is a best guess
// from the model name, and `isThinkingConfigError` lets us fall back to 'off'
// and retry if the guess is wrong.
type ThinkingPlan =
  | { kind: 'level' }   // Gemini 3.5+ / 4+: thinkingLevel MINIMAL
  | { kind: 'budget' }  // Gemini 2.5: thinkingBudget 0
  | { kind: 'off' };    // no thinkingConfig at all

function planThinking(model: string): ThinkingPlan {
  const match = /^gemini-(\d+)(?:\.(\d+))?/.exec(model.replace(/^models\//, ''));
  // Aliases like `gemini-flash-latest` carry no version. Assume the 2.5-era
  // field; the retry path corrects us if that's wrong.
  if (!match) return { kind: 'budget' };
  const major = Number(match[1]);
  const minor = Number(match[2] ?? 0);
  if (major > 3 || (major === 3 && minor >= 5)) return { kind: 'level' };
  if (major >= 2) return { kind: 'budget' };
  return { kind: 'off' };
}

// A model that rejected our thinking plan is the only reason to look for the
// word "thinking" in an error, so this stays narrow on purpose.
function isThinkingConfigError(error: unknown): boolean {
  const raw = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const msg = raw.toLowerCase();
  if (!msg.includes('thinking')) return false;
  return (
    getErrorStatus(error) === 400 ||
    msg.includes('invalid_argument') ||
    msg.includes('invalid argument') ||
    msg.includes('not supported') ||
    msg.includes('unsupported')
  );
}

class NoCompatibleModelError extends Error {
  available: string[];
  constructor(available: string[]) {
    super(`No compatible chat model. Key can access: ${available.join(', ') || '(none)'}`);
    this.name = 'NoCompatibleModelError';
    this.available = available;
  }
}

/** Ask the API which models this key can actually use, then pick the best chat model. */
async function resolveChatModel(client: GoogleGenAI): Promise<string> {
  if (resolvedModel) return resolvedModel;

  // The set of models a key can reach doesn't change between page loads, so a
  // cold ListModels call is pure first-message latency. Reuse the answer for
  // the rest of the tab's lifetime.
  const cached = readCachedModel();
  if (cached && !failedModels.has(`models/${cached}`)) {
    resolvedModel = cached;
    return cached;
  }

  const available: string[] = [];
  const chatCapable = new Set<string>();
  const pager = await client.models.list({ config: { pageSize: 100 } });
  for await (const m of pager) {
    if (!m.name) continue;
    available.push(m.name);
    const supportsChat =
      !m.supportedActions || m.supportedActions.includes('generateContent');
    if (supportsChat && !EXCLUDED_MODEL_PATTERN.test(m.name)) {
      chatCapable.add(m.name);
    }
  }

  const preferred = PREFERRED_MODELS.find((id) => chatCapable.has(id) && !failedModels.has(id));
  if (preferred) {
    resolvedModel = preferred.replace(/^models\//, '');
    writeCachedModel(resolvedModel);
    return resolvedModel;
  }
  const anyFlash = [...chatCapable].find((name) => /flash/i.test(name) && !failedModels.has(name));
  if (anyFlash) {
    resolvedModel = anyFlash.replace(/^models\//, '');
    writeCachedModel(resolvedModel);
    return resolvedModel;
  }
  throw new NoCompatibleModelError(available);
}

const SYSTEM_INSTRUCTION = `You are Joseph T Lopez, an IT student at Bestlink College of the Philippines (Expected 2027) based in Quezon City. 
You are acting as an interactive assistant on Joseph's portfolio website. 
Your goal is to answer questions about Joseph, his projects, skills, education, and contact information. 
Keep your answers brief, friendly, and professional (1-3 sentences max).
Do not break character. Do not say you are an AI language model.
Skills: React, Next.js, React Native, Node.js, PHP, Python, Java, C++, C, MySQL, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, Bootstrap, Git, GitHub, Linux, Computer Hardware & Diagnostics.
Projects: 
1. Nokma: Macro tracking app with React Native. 
2. HR Management System G1: React-based HR system. 
3. Fraud Detection in Microfinance: Node.js fraud detection. 
4. Microfinance SMS: Automated SMS system. 
5. Fleet & Transport Management: Capstone project, full system.
Certifications: Cisco Networking Academy (Computer Hardware Basics - verified on Credly, Prompt Like an Engineer - verified on Credly), freeCodeCamp (Python Programming), Coddy (HTML & CSS Mastery, HTML Fundamentals, HTML Styling with CSS, Practical Frontend, HTML JavaScript in Action, C Programming).
Contact: Email: josephlopez102004@gmail.com, GitHub: JosephLopezzzz, LinkedIn: Joseph T. Lopez.
If asked something completely unrelated to Joseph, politely decline and steer the conversation back to his professional profile.`;

const INITIAL_MESSAGE = "Hey! I'm Joseph - feel free to ask about my projects, the stack I work with, or anything else on the site.";

// Questions with a fixed, known answer don't need a round trip at all, and
// these cover most of what a portfolio visitor actually asks. Deliberately
// narrow: only short messages, and only when *exactly one* intent matches, so
// a compound question ("which projects used Node?") still reaches the model.
// Tradeoff: a short but nuanced phrasing of one of these gets the canned
// answer. Add patterns only for facts that never change.
const INSTANT_ANSWERS: { pattern: RegExp; reply: string }[] = [
  {
    pattern: /\b(contact|email|e-mail|reach\b|get in touch|hire|linkedin|github)\b/i,
    reply: "You can reach Joseph at josephlopez102004@gmail.com. He's also on GitHub as JosephLopezzzz and on LinkedIn as Joseph T. Lopez.",
  },
  {
    pattern: /\b(skills?|tech stack|technolog(y|ies)|languages?|stack)\b/i,
    reply: 'Joseph works with React, Next.js, React Native, Node.js, PHP, Python, Java, C++, C, MySQL, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, Bootstrap, Git, GitHub, Linux, and computer hardware & diagnostics.',
  },
  {
    pattern: /\b(certificat\w*|credly|cisco|freecodecamp|coddy)\b/i,
    reply: 'Joseph holds Cisco Networking Academy certificates (Computer Hardware Basics and Prompt Like an Engineer, both verified on Credly), a freeCodeCamp Python certification, and several Coddy courses covering HTML, CSS, and C.',
  },
  {
    pattern: /\b(education|school|college|degree|studying|university)\b/i,
    reply: 'Joseph is an IT student at Bestlink College of the Philippines, expecting to graduate in 2027. He is based in Quezon City.',
  },
];

const INSTANT_ANSWER_MAX_LENGTH = 48;

function matchInstantAnswer(text: string): string | null {
  const trimmed = text.trim();
  if (trimmed.length > INSTANT_ANSWER_MAX_LENGTH) return null;
  const matches = INSTANT_ANSWERS.filter(({ pattern }) => pattern.test(trimmed));
  return matches.length === 1 ? matches[0].reply : null;
}

const MISSING_KEY_MESSAGE =
  "Chat isn't configured yet (missing API key). If you're the site owner, set VITE_GEMINI_API_KEY in your hosting provider's environment variables and redeploy.";

const GENERIC_ERROR_MESSAGE =
  "Sorry, I'm having trouble connecting right now. Please check your network or try again.";

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const status = (error as { status?: unknown }).status;
    if (typeof status === 'number') return status;
  }
  return undefined;
}

function isModelNotFoundError(error: unknown): boolean {
  if (getErrorStatus(error) === 404) return true;
  const raw = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const msg = raw.toLowerCase();
  return msg.includes('not_found') || msg.includes('not found') || msg.includes('is not found') || msg.includes('no longer available');
}

function getFriendlyErrorMessage(error: unknown, modelTried?: string): string {
  if (!IS_CONFIGURED) return MISSING_KEY_MESSAGE;
  if (error instanceof NoCompatibleModelError) {
    return `Your key connected, but it can't access any supported chat model (${error.available.length} models visible). If you own this site, create a new key in Google AI Studio and redeploy.`;
  }
  const status = getErrorStatus(error);
  const raw = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  const msg = raw.toLowerCase();

  if (status === 400 || msg.includes('api_key_invalid') || msg.includes('api key not valid') || msg.includes('api key is invalid')) {
    return 'This chat key looks invalid. If you own this site, generate a key in Google AI Studio, set it as VITE_GEMINI_API_KEY, and redeploy.';
  }
  if (status === 403 || msg.includes('permission_denied') || msg.includes('referer') || msg.includes('billing')) {
    return "The request was blocked (key restrictions, referrer policy, or billing). If you own this site, check the key's API restrictions and billing status.";
  }
  if (status === 404 || isModelNotFoundError(error)) {
    const model = modelTried ? ` (${modelTried})` : '';
    return `The chat model${model} isn't available to this key/project right now. If you own this site, confirm the key was created in Google AI Studio and has model access, then redeploy.`;
  }
  if (status === 429 || msg.includes('quota') || msg.includes('rate') || msg.includes('resource_exhausted')) {
    return 'The chat is rate-limited right now. Please wait a moment and retry.';
  }
  return GENERIC_ERROR_MESSAGE;
}

type ChatMessage = { role: 'user' | 'model'; text: string; isError?: boolean };

/** The small in-transcript avatar. Memoized so streamed tokens don't rebuild it. */
const MessageAvatar = React.memo(function MessageAvatar({ isDark }: { isDark: boolean }) {
  return (
    <div className="relative w-8 h-8 rounded-full border border-border bg-card overflow-hidden mr-2 self-end mb-1 flex-shrink-0">
      <img
        src="/pfp/white1x1.png"
        alt="Joseph"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isDark ? 0 : 1 }}
        draggable={false}
      />
      <img
        src="/pfp/black1x1.png"
        alt="Joseph"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isDark ? 1 : 0 }}
        draggable={false}
      />
    </div>
  );
});

/**
 * The transcript. Memoized because the input lives in its own component: without
 * this, every keystroke would re-render every bubble in the conversation.
 */
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
        <div
          key={idx}
          className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {msg.role === 'model' && <MessageAvatar isDark={isDark} />}
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
                onClick={onRetry}
                disabled={isLoading}
                className="self-start text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2 mt-1"
              >
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
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '200ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-typing-dot" style={{ animationDelay: '400ms' }}></span>
          </div>
        </div>
      )}
    </>
  );
});

/**
 * Owns the draft text so typing re-renders only this input, not the transcript.
 * Stays enabled while a reply streams — only sending is blocked — so latency
 * doesn't stop people composing their next message.
 */
const ChatInput = React.memo(function ChatInput({
  disabled,
  canSend,
  onSend,
}: {
  disabled: boolean;
  canSend: boolean;
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
        placeholder={disabled ? 'Chat not configured...' : 'Type a message...'}
        className="flex-1 bg-transparent border-none text-foreground text-sm outline-none placeholder:text-muted-foreground"
        disabled={disabled}
      />
      <button
        onClick={submit}
        disabled={!value.trim() || !canSend}
        className="p-2.5 bg-foreground text-background rounded-full hover:opacity-80 transition-colors disabled:opacity-50"
      >
        <Send size={16} />
      </button>
    </div>
  );
});

export const ChatBot = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  // True only between sending and the first streamed token — decides whether to
  // show the typing dots or the reply being written.
  const [awaitingFirstToken, setAwaitingFirstToken] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);
  const genAIRef = useRef<GoogleGenAI | null>(null);
  const activeModelRef = useRef<string>('');
  const thinkingPlanRef = useRef<ThinkingPlan>({ kind: 'off' });
  // Read by callbacks that must stay referentially stable, so the memoized
  // transcript isn't invalidated on every state change.
  const messagesRef = useRef(messages);
  messagesRef.current = messages;
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const initChat = useCallback(async (forcePlan?: ThinkingPlan): Promise<string | null> => {
    if (chatSessionRef.current) return null;
    if (!IS_CONFIGURED) {
      setInitError(MISSING_KEY_MESSAGE);
      return MISSING_KEY_MESSAGE;
    }
    try {
      // Lazy-load the SDK so it lands in its own chunk instead of the main bundle.
      const { GoogleGenAI, HarmCategory, HarmBlockThreshold, ThinkingLevel } = await import('@google/genai');
      if (!genAIRef.current) {
        genAIRef.current = new GoogleGenAI({ apiKey: API_KEY });
      }
      const model = await resolveChatModel(genAIRef.current);
      activeModelRef.current = model;

      const plan = forcePlan ?? planThinking(model);
      thinkingPlanRef.current = plan;

      chatSessionRef.current = genAIRef.current.chats.create({
        model,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.9,
          // With thinking off the whole budget is visible text, and the system
          // prompt caps replies at 1-3 sentences, so a tight cap also bounds
          // worst-case latency. With thinking on, thoughts share this budget,
          // so it has to stay generous or replies get chopped mid-sentence.
          maxOutputTokens: plan.kind === 'off' ? 1024 : 300,
          ...(plan.kind === 'level' ? { thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL } } : {}),
          ...(plan.kind === 'budget' ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          ],
        },
      });
      setInitError(null);
      return null;
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      // Force re-discovery next time (availability may change).
      chatSessionRef.current = null;
      resolvedModel = null;
      const friendly = getFriendlyErrorMessage(e, activeModelRef.current || undefined);
      setInitError(friendly);
      return friendly;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Usually already warmed by the idle effect below; this is the fallback
      // for a panel opened before that fires, or via keyboard shortcut.
      void initChat();
    }
  }, [isOpen, initChat]);

  // Warm the SDK import, model discovery, and chat session before the user
  // opens the panel, so the first message doesn't pay for any of it. Idle time
  // is free — nobody is waiting on this.
  useEffect(() => {
    const warm = () => { void initChat(); };
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(id);
  }, [initChat]);

  // Follow the newest message, but only when the reader is already at the
  // bottom. Smooth-scrolling on every streamed token fights itself and yanks
  // the view down while someone is reading earlier messages.
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 120) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle ChatBot with Cmd+K or /
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        // Prevent default if not typing in an input
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA' ||
          (document.activeElement as HTMLElement)?.isContentEditable
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

  const sendMessageToBot = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoadingRef.current) return;

    // Fixed-fact questions skip the network entirely — and still answer when no
    // API key is configured.
    const instant = matchInstantAnswer(messageText);
    if (instant) {
      setMessages(prev => [...prev, { role: 'model', text: instant }]);
      return;
    }

    if (!IS_CONFIGURED) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: MISSING_KEY_MESSAGE,
        isError: true
      }]);
      return;
    }

    setIsLoading(true);
    isLoadingRef.current = true;
    setAwaitingFirstToken(true);

    // One streaming attempt. Mutates `progress` so the caller knows whether a
    // bubble was already created and needs removing before a retry.
    const streamReply = async (text: string, progress: { appended: boolean }) => {
      const session = chatSessionRef.current;
      if (!session) throw new Error('Chat session could not be initialized.');

      const stream = await session.sendMessageStream({ message: text });
      let full = '';
      for await (const chunk of stream) {
        const piece = chunk.text;
        if (!piece) continue;
        full += piece;
        if (progress.appended) {
          setMessages(prev => {
            const next = prev.slice();
            next[next.length - 1] = { ...next[next.length - 1], text: full };
            return next;
          });
        } else {
          progress.appended = true;
          setAwaitingFirstToken(false);
          setMessages(prev => [...prev, { role: 'model', text: full }]);
        }
      }
      if (!full.trim()) throw new Error('Empty response from the chat model.');
    };

    const progress = { appended: false };

    try {
      if (!chatSessionRef.current) {
        const initFailure = await initChat();
        if (initFailure || !chatSessionRef.current) {
          throw new Error(initFailure || 'Chat session could not be initialized.');
        }
      }

      try {
        await streamReply(messageText, progress);
      } catch (sendError) {
        // Our thinking-config guess may be wrong for this model. Drop it,
        // rebuild the session with no thinking field at all, and retry once.
        if (isThinkingConfigError(sendError) && thinkingPlanRef.current.kind !== 'off') {
          console.warn('Model rejected the thinking config; disabling thinking and retrying.', sendError);
          if (progress.appended) {
            progress.appended = false;
            setMessages(prev => (prev.length ? prev.slice(0, -1) : prev));
          }
          thinkingPlanRef.current = { kind: 'off' };
          chatSessionRef.current = null;
          const initFailure = await initChat({ kind: 'off' });
          if (initFailure || !chatSessionRef.current) throw sendError;
          // If we removed a partial bubble, show the dots again while the
          // replacement reply starts.
          setAwaitingFirstToken(!progress.appended);
          await streamReply(messageText, progress);
          return;
        }
        // Model availability may have changed mid-session: remember the dead
        // model so re-discovery skips it, drop the session, then report.
        if (isModelNotFoundError(sendError)) {
          if (activeModelRef.current) {
            console.warn(`Chat model ${activeModelRef.current} became unavailable, will skip it:`, sendError);
            failedModels.add(`models/${activeModelRef.current}`);
          }
          chatSessionRef.current = null;
          resolvedModel = null;
        }
        throw sendError;
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: getFriendlyErrorMessage(error, activeModelRef.current),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
      setAwaitingFirstToken(false);
    }
  }, [initChat]);

  const handleSend = useCallback((text: string) => {
    const userMessage = text.trim();
    if (!userMessage || isLoadingRef.current) return;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    void sendMessageToBot(userMessage);
  }, [sendMessageToBot]);

  const handleRetry = useCallback(() => {
    const current = messagesRef.current;
    const lastUserMessage = [...current].reverse().find(m => m.role === 'user');
    if (!lastUserMessage) return;

    let kept = current.filter(m => !m.isError);
    // A stream that died partway leaves a half-written bubble; drop that too.
    const last = kept[kept.length - 1];
    if (last && last.role === 'model') kept = kept.slice(0, -1);

    setMessages(kept);
    void sendMessageToBot(lastUserMessage.text);
  }, [sendMessageToBot]);

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => void initChat()}
          onFocus={() => void initChat()}
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
              <div className="relative group/avatar cursor-pointer">
                <div className="relative w-10 h-10 rounded-full border border-border bg-card overflow-hidden transition-transform duration-300 group-hover/avatar:scale-105 shadow-sm">
                  <img 
                    src="/pfp/white1x1.png" 
                    alt="Joseph Lopez" 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: isDark ? 0 : 1 }}
                    draggable={false}
                  />
                  <img 
                    src="/pfp/black1x1.png" 
                    alt="Joseph Lopez" 
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: isDark ? 1 : 0 }}
                    draggable={false}
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full z-10"></span>
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
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent z-10">
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
            <MessageList
              messages={messages}
              isDark={isDark}
              isLoading={isLoading}
              showTyping={awaitingFirstToken}
              onRetry={handleRetry}
            />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-foreground/5 border-t border-border z-10">
            <ChatInput
              disabled={!IS_CONFIGURED}
              canSend={!isLoading}
              onSend={handleSend}
            />
          </div>

        </SpotlightCard>
      )}
    </>
  );
};
