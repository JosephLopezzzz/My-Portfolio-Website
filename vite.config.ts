import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { loadEnv } from "vite";
import { createChatHandler } from "./api/chat";

function localChatApi(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  const handleChat = createChatHandler(() =>
    process.env.GEMINI_API_KEY || env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY,
  );

  return {
    name: "local-chat-api",
    configureServer(server: any) {
      server.middlewares.use("/api/chat", (req: any, res: any, next: any) => {
        if (req.method !== "POST") return handleChat(req, res);

        const chunks: Buffer[] = [];
        let size = 0;
        let tooLarge = false;
        req.on("data", (chunk: Buffer) => {
          size += chunk.length;
          if (size > 32_000) {
            tooLarge = true;
          } else if (!tooLarge) {
            chunks.push(chunk);
          }
        });
        req.on("end", () => {
          if (tooLarge) {
            res.statusCode = 413;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "invalid_request" }));
            return;
          }
          if (res.writableEnded) return;
          try {
            req.body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "invalid_request" }));
            return;
          }
          void handleChat(req, res);
        });
        req.on("error", next);
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), mode === "development" && localChatApi(mode)].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
