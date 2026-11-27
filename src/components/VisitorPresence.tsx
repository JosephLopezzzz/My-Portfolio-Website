import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";

let tabId: string | undefined;
const refreshIntervalMs = 30_000;

export default function VisitorPresence() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (typeof globalThis.crypto?.randomUUID !== "function") return;

    const session = tabId ??= globalThis.crypto.randomUUID();
    let controller: AbortController | undefined;
    let unavailable = false;

    const refresh = async () => {
      if (unavailable || controller || document.visibilityState !== "visible") return;

      const request = new AbortController();
      controller = request;
      const timeout = window.setTimeout(() => request.abort(), 6_000);
      try {
        const response = await fetch("/api/presence", {
          method: "POST",
          headers: { "X-Portfolio-Session": session },
          signal: request.signal,
        });
        // Static hosting and unconfigured deployments have no presence service.
        unavailable = [204, 404, 405].includes(response.status)
          || (response.ok && !response.headers.get("content-type")?.includes("application/json"));
        if (!response.ok || unavailable) {
          setCount(null);
          return;
        }

        const data = await response.json();
        if (!request.signal.aborted) {
          setCount(Number.isSafeInteger(data.count) && data.count > 0 ? data.count : null);
        }
      } catch {
        if (!unavailable) setCount(null);
      } finally {
        window.clearTimeout(timeout);
        controller = undefined;
      }
    };

    void refresh();
    const interval = window.setInterval(refresh, refreshIntervalMs);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      unavailable = true;
      controller?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
      <div aria-hidden="true" className="flex -space-x-2">
        {Array.from({ length: Math.min(count, 3) }, (_, index) => (
          <span key={index} className="grid size-7 place-items-center rounded-full border-2 border-background bg-secondary text-foreground">
            <UserRound size={13} />
          </span>
        ))}
      </div>
      <span title="Approximate count of active tabs, including yours">
        <span className="font-semibold text-foreground">{count.toLocaleString()}</span> {count === 1 ? "visitor" : "visitors"} viewing now
      </span>
    </div>
  );
}
