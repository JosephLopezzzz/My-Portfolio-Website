import type { IncomingMessage, ServerResponse } from "node:http";

const activeWindowMs = 75_000;
const sessionPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function presence(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.writeHead(405).end();
    return;
  }

  const session = req.headers["x-portfolio-session"];
  if (typeof session !== "string" || !sessionPattern.test(session)) {
    res.writeHead(400).end();
    return;
  }
  if (req.headers["sec-fetch-site"] && req.headers["sec-fetch-site"] !== "same-origin") {
    res.writeHead(403).end();
    return;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    res.writeHead(204).end();
    return;
  }

  const key = `portfolio:presence:${process.env.VERCEL_ENV ?? "development"}`;
  const now = Date.now();

  try {
    const result = await fetch(new URL("/multi-exec", url), {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(4_000),
      body: JSON.stringify([
        ["ZREMRANGEBYSCORE", key, "-inf", now],
        ["ZADD", key, now + activeWindowMs, session],
        ["PEXPIRE", key, activeWindowMs],
        ["ZCARD", key],
      ]),
    });
    if (!result.ok) throw new Error("Presence storage unavailable");

    const entries: unknown = await result.json();
    if (!Array.isArray(entries) || entries.length !== 4 || entries.some((entry) => !entry || entry.error)) {
      throw new Error("Invalid presence response");
    }
    const count: unknown = entries[3].result;
    if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 1) {
      throw new Error("Invalid presence response");
    }

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ count }));
  } catch {
    res.writeHead(503).end();
  }
}
