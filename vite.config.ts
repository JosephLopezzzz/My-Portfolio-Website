import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { loadEnv } from "vite";
import { createChatHandler } from "./api/chat";

function localChatApi(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), "GEMINI_API_KEY");
  const handleChat = createChatHandler(() =>
    process.env.GEMINI_API_KEY || env.GEMINI_API_KEY,
  );

  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", (req, res, next) => {
        const request: Parameters<typeof handleChat>[0] = {
          method: req.method,
          headers: req.headers,
          body: undefined,
        };
        if (req.method !== "POST") {
          void handleChat(request, res);
          return;
        }

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
            request.body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
          } catch {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json; charset=utf-8");
            res.end(JSON.stringify({ error: "invalid_request" }));
            return;
          }
          void handleChat(request, res);
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
