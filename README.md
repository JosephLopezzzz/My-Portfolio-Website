# Joseph T. Lopez — Developer Portfolio

A personal portfolio for Joseph T. Lopez, an IT student and web developer. It presents selected web and mobile projects, technical skills, education, certifications, and ways to get in touch.

**Live portfolio:** [josephlopez.vercel.app](https://josephlopez.vercel.app)  
**Source code:** [github.com/JosephLopezzzz/My-Portfolio-Website](https://github.com/JosephLopezzzz/My-Portfolio-Website)

## Features

- Responsive, single-page portfolio with About, Projects, GitHub Activity, Skills, Education, Certifications, and Contact sections.
- Light and dark themes, with reduced-motion preferences respected.
- Featured project cards linking to source repositories and available project pages.
- Resume and certificate PDFs served from the site.
- Optional “Chat with Joseph” assistant that streams Gemini responses through a server-side API route.

## Featured projects

- **Nokma** — nutrition and macro tracking mobile app.
- **HR Management System**
- **Fraud Detection in Microfinance**
- **Bangwit** — Philippine fishing companion prototype.

Project links and technology labels in the portfolio provide more detail. A linked project page or repository does not necessarily mean that project has a public live demo.

## Technology

- **Frontend:** React 18, TypeScript, Vite 5, Tailwind CSS 3, Radix UI components.
- **Interface utilities:** React Router, next-themes, Lucide React, and React Icons.
- **Chat API:** Vercel-compatible serverless function at `/api/chat`, using the Google GenAI SDK and a server-side `GEMINI_API_KEY`.

## Run locally

You’ll need Node.js and npm installed.

1. Clone the repository and open its folder:

   ```sh
   git clone https://github.com/JosephLopezzzz/My-Portfolio-Website.git
   cd My-Portfolio-Website
   ```

2. Install dependencies:

   ```sh
   npm ci
   ```

3. To enable the chatbot locally, copy `.env.example` to `.env.local` and add your own Gemini API key:

   **Windows PowerShell**

   ```powershell
   Copy-Item .env.example .env.local
   ```

   **macOS or Linux**

   ```sh
   cp .env.example .env.local
   ```

   Set the value in `.env.local`:

   ```dotenv
   GEMINI_API_KEY=your_gemini_api_key
   ```

   The chatbot is optional. The portfolio can run without this key, but it will not return Gemini replies.

4. Start the development server:

   ```sh
   npm run dev
   ```

   Vite serves the site at [http://localhost:8080](http://localhost:8080). The development server also provides the local `/api/chat` middleware.

## API key security

Keep Gemini credentials on the server. Use `GEMINI_API_KEY` for the server route; do not put the key in frontend code or use the `VITE_GEMINI_API_KEY` name. Vite exposes `VITE_` variables to client code when they are referenced through `import.meta.env`.

A previous build exposed a `VITE_GEMINI_API_KEY`. Treat that old key as compromised: revoke or rotate it with Google, then use the replacement only as `GEMINI_API_KEY`. Never commit `.env.local` or paste a real key into documentation. This repository's `.gitignore` excludes `.env.local`.

## Deploy

This project is configured for Vercel:

1. Import the GitHub repository into Vercel.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. In the Vercel project settings, add `GEMINI_API_KEY` as an environment variable for the environments where chat should work, then deploy or redeploy.

Vercel serves `api/chat.ts` at `/api/chat`. A static-only host can serve the portfolio files, but Gemini chat requires a server-side `/api/chat` implementation and must not receive the API key in the browser.

To build locally:

```sh
npm run build
```

The generated static site is written to `dist/`.

## Project structure

```text
api/
  chat.ts                    Server-side Gemini chat handler
public/
  certs/                     Certificate PDFs and badge images
  profile/                   Profile photos
  resume.pdf                 Downloadable resume
src/
  components/
    sections/                Portfolio page sections
    ui/                      Shared interface components and chatbot
  hooks/                     Reusable React hooks
  lib/                       Shared utilities
  pages/                     Portfolio, certificate viewer, and not-found pages
  App.tsx                    App routes and providers
  main.tsx                   Browser entry point
vite.config.ts               Vite configuration and local chat middleware
package.json                 Scripts and dependencies
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Build the production frontend into `dist/`. |
| `npm run preview` | Preview the built frontend locally. |
| `npm run lint` | Run ESLint. |
| `npm test` | Run the Vitest test suite. |
