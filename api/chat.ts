import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from '@google/genai';

type ChatInputMessage = { role: 'user' | 'model'; text: string };
type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  body?: unknown;
};
type ApiResponse = {
  statusCode?: number;
  status?: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json?: (data: unknown) => void;
  write: (chunk: string) => void;
  end: (chunk?: string) => void;
  writableEnded?: boolean;
  destroyed?: boolean;
  headersSent?: boolean;
};

const SYSTEM_INSTRUCTION = `You are the portfolio assistant for Joseph T Lopez, an IT student at Bestlink College of the Philippines (expected 2027) based in Quezon City. Answer questions about Joseph, his projects, skills, education, and contact information briefly, in a friendly, professional tone (1-3 sentences). Do not impersonate Joseph or say you are an AI language model. Skills: React, Next.js, React Native, Node.js, PHP, Python, Java, C++, C, MySQL, PostgreSQL, MongoDB, TypeScript, Tailwind CSS, Bootstrap, Git, GitHub, Figma, Linux, computer hardware and diagnostics. Certifications: Cisco Networking Academy certificates in Networking Basics (issued September 29, 2026), Computer Hardware Basics, and Prompt Like an Engineer, with verification links on Credly; freeCodeCamp Python Programming; and Coddy courses covering HTML, CSS, JavaScript, and C. Networking Basics credential: https://www.credly.com/badges/8765bdb9-dd4e-4970-8144-10a204d2f075. Projects: Nokma is a React Native nutrition and macro tracking app using SQLite (SQL); its brand and overview site is https://nokma-branding.vercel.app/. HR Management System is a React-based HR system using PostgreSQL (SQL) through Supabase. Fraud Detection in Microfinance is a Node.js project using PostgreSQL (SQL) through Supabase. Bangwit is a Next.js and TypeScript Philippine fishing companion prototype with a Cavite waterbody explorer, a private catch journal with photos, and a personal species collection. Bangwit stores catches locally in IndexedDB; verified regional species records, fishing rules, and live safety advisories are not available yet. Its repository is https://github.com/JosephLopezzzz/Bangwit; no public app URL has been provided. Contact: josephlopez102004@gmail.com, GitHub JosephLopezzzz, LinkedIn Joseph T. Lopez. For unrelated questions, politely steer visitors back to Joseph's professional profile.`;

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
const EXCLUDED_MODEL_PATTERN = /image|tts|transcribe|embed|live|video|veo|imagen|lyria/i;
const MAX_BODY_CHARS = 16_000;
const MAX_MESSAGE_CHARS = 2_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;

let cachedClient: GoogleGenAI | null = null;
let cachedModelPromise: Promise<string> | null = null;
const requestCounts = new Map<string, { count: number; expiresAt: number }>();

function header(req: ApiRequest, name: string): string | undefined {
  const value = req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function setStatus(res: ApiResponse, status: number) {
  if (res.status) res.status(status);
  else res.statusCode = status;
}

function sendJson(res: ApiResponse, status: number, body: unknown) {
  setStatus(res, status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (res.json) res.json(body);
  else res.end(JSON.stringify(body));
}

function normalizeMessages(body: unknown): ChatInputMessage[] | null {
  if (!body || typeof body !== 'object') return null;
  const input = (body as { messages?: unknown }).messages;
  if (!Array.isArray(input) || input.length === 0 || input.length > 20) return null;

  const messages: ChatInputMessage[] = [];
  let totalChars = 0;
  for (const item of input) {
    if (!item || typeof item !== 'object') return null;
    const { role, text } = item as { role?: unknown; text?: unknown };
    if ((role !== 'user' && role !== 'model') || typeof text !== 'string') return null;
    const cleanText = text.trim();
    if (!cleanText || cleanText.length > MAX_MESSAGE_CHARS) return null;
    totalChars += cleanText.length;
    if (totalChars > MAX_BODY_CHARS) return null;
    messages.push({ role, text: cleanText });
  }
  if (messages[messages.length - 1]?.role !== 'user') return null;
  return messages;
}

async function resolveModel(client: GoogleGenAI): Promise<string> {
  if (!cachedModelPromise) {
    cachedModelPromise = (async () => {
      const chatModels = new Set<string>();
      const pager = await client.models.list({ config: { pageSize: 100 } });
      for await (const model of pager) {
        if (!model.name) continue;
        const supportsChat = !model.supportedActions || model.supportedActions.includes('generateContent');
        if (supportsChat && !EXCLUDED_MODEL_PATTERN.test(model.name)) chatModels.add(model.name);
      }
      const preferred = PREFERRED_MODELS.find((name) => chatModels.has(name));
      if (preferred) return preferred.replace(/^models\//, '');
      const flash = [...chatModels].find((name) => /flash/i.test(name));
      if (flash) return flash.replace(/^models\//, '');
      throw Object.assign(new Error('No compatible model is available.'), { code: 'no_model' });
    })().catch((error) => {
      cachedModelPromise = null;
      throw error;
    });
  }
  return cachedModelPromise;
}

function errorCode(error: unknown): string {
  const value = error as { status?: number; code?: string };
  if (value?.code === 'no_model') return 'no_model';
  if (value?.status === 400 || value?.status === 403) return 'invalid_configuration';
  if (value?.status === 429) return 'rate_limited';
  return 'unavailable';
}

function isSameOrigin(req: ApiRequest): boolean {
  const origin = header(req, 'origin');
  const host = header(req, 'x-forwarded-host') || header(req, 'host');
  if (!origin || !host) return true;
  try {
    return new URL(origin).host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

function isRateLimited(req: ApiRequest): boolean {
  const forwardedFor = header(req, 'x-forwarded-for');
  const ip = header(req, 'x-real-ip') || forwardedFor?.split(',').at(-1)?.trim() || 'unknown';
  const now = Date.now();
  const entry = requestCounts.get(ip);
  if (!entry || entry.expiresAt <= now) {
    requestCounts.set(ip, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    if (requestCounts.size > 1_000) {
      const oldestIp = requestCounts.keys().next().value;
      if (oldestIp) requestCounts.delete(oldestIp);
    }
    for (const [key, value] of requestCounts) {
      if (value.expiresAt <= now) requestCounts.delete(key);
    }
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

export function createChatHandler(getApiKey: () => string | undefined) {
  return async (req: ApiRequest, res: ApiResponse) => {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method === 'GET') {
      return sendJson(res, 200, { configured: Boolean(getApiKey()?.trim()) });
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return sendJson(res, 405, { error: 'method_not_allowed' });
    }
    if (!isSameOrigin(req)) return sendJson(res, 403, { error: 'forbidden' });
    if (isRateLimited(req)) return sendJson(res, 429, { error: 'rate_limited' });

    const messages = normalizeMessages(req.body);
    if (!messages) return sendJson(res, 400, { error: 'invalid_request' });
    const apiKey = getApiKey()?.trim();
    if (!apiKey) return sendJson(res, 503, { error: 'not_configured' });

    try {
      cachedClient ??= new GoogleGenAI({ apiKey });
      const model = await resolveModel(cachedClient);
      const stream = await cachedClient.models.generateContentStream({
        model,
        contents: messages.map(({ role, text }) => ({ role, parts: [{ text }] })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          topP: 0.9,
          maxOutputTokens: 300,
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          ],
        },
      });
      setStatus(res, 200);
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('X-Accel-Buffering', 'no');
      let sentText = false;
      for await (const chunk of stream) {
        if (res.destroyed || res.writableEnded) return;
        const text = chunk.text;
        if (!text) continue;
        sentText = true;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
      res.write(`data: ${sentText ? '[DONE]' : JSON.stringify({ error: 'empty_response' })}\n\n`);
      res.end();
    } catch (error) {
      const code = errorCode(error);
      if (res.headersSent) {
        res.write(`data: ${JSON.stringify({ error: code })}\n\n`);
        res.end();
      } else {
        sendJson(res, code === 'rate_limited' ? 429 : code === 'no_model' ? 503 : 502, { error: code });
      }
    }
  };
}

export default function handler(req: ApiRequest, res: ApiResponse) {
  return createChatHandler(() => process.env.GEMINI_API_KEY)(req, res);
}
