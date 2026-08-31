# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 18, TypeScript, TailwindCSS v3, Shadcn UI, next-themes (dark/light mode), Lucide React icons, React Bits (GlassSurface), toggles.dev (Spin theme toggle)

## Users

**Primary:** Recruiters, hiring managers, and potential clients scanning to evaluate Joseph for full-stack or frontend developer roles (full-time or freelance).

**Secondary:** Fellow developers and peers encountered through GitHub, hackathons, or communities who may collaborate or refer opportunities.

Visitors scan quickly — typically under 60 seconds — before deciding whether to reach out. Mobile visits are common; desktop is the primary review context for technical assessment.

## Product Purpose

A personal portfolio for **Joseph T. Lopez**, a Filipino full-stack developer, that converts visitor attention into a job offer, freelance inquiry, or direct contact. Success means a recruiter or hiring manager reads the site and reaches out.

The site presents Joseph's real projects from GitHub, his one hackathon experience (DICT eGov Hackathon 2026), certifications on file in `/public/certs/`, and his skills — without fabricated or inflated claims.

## Positioning

Joseph's work is technical and earnest: real systems (HR management, fraud detection, macro tracking app, microfinance tools) built in TypeScript and PHP. The site's honest, minimalist aesthetic reflects this — no inflated testimonials, no fake project screenshots, no borrowed credentials.

## Operating Context

- Visited from desktop browsers (primary) and mobile (secondary).
- Recruiters scan: hero → projects → skills → contact. The section order must support this flow.
- The site is a single-page scroll app with smooth anchor navigation.
- Dark/light mode toggle is present; the site must look excellent in both.
- The GlassSurface navbar floats fixed at the top in a pill shape.
- Theme transitions use the View Transitions API with a radial wipe.

## Capabilities and Constraints

**What exists:**
- Hero section with profile photo (light/dark variants in `/public/pfp/`)
- About section with stats: 5+ projects, 1 hackathon, and years of experience
- Projects section: 5 real GitHub repos (Nokma, HR Management System G1, Fraud Detection in Microfinance, Microfinance SMS, hmscore1last1)
- Skills section with categorized tech pills
- Gallery section: eGov Hackathon 2026 photos from `/public/hackaton/`
- Certifications section: 7 real PDFs in `/public/certs/`
- Contact section
- Education section

**Constraints:**
- All project data must come from real GitHub repos under `JosephLopezzzz`
- Certifications must link to the actual PDFs in `/public/certs/`
- 1 hackathon attended — not "5+" as some earlier data stated
- No fabricated testimonials, fake live demo links, or invented credentials
- Resume PDF at `/public/resume.pdf`

## Brand Commitments

- **Name:** Joseph T. Lopez — abbreviated to `JTL.` in the navbar logo
- **GitHub:** https://github.com/JosephLopezzzz
- **Tone:** Direct, technical, confident — not boastful. Filipino developer, likely targeting local and remote opportunities.
- **Visual world:** Minimalist high-contrast design inspired by renlenon.vercel.app (structure/layout) and bryllim.com (light/dark mode motion). The previous glassmorphism "Ambient Space" aesthetic has been replaced with this cleaner system.
- **No mandatory brand colors or fixed logo mark beyond the `JTL.` text treatment.**

## Evidence on Hand

- GitHub profile: https://github.com/JosephLopezzzz (5 public repos)
- Certifications (PDFs): `/public/certs/` — Prompt Like an Engineer, HTML & CSS Mastery, HTML Fundamentals, HTML Styling with CSS, Practical Frontend, C Programming, Python Programming
- Hackathon gallery photos: `/public/hackaton/` — DICT eGov Hackathon 2026
- Profile photos (light + dark): `/public/pfp/`
- Resume: `/public/resume.pdf`
- AI/tool logos in `/public/`: Claude, Gemini, Codex, DeepSeek, Obsidian, Expo

**Absences that must not be fabricated:**
- No live deploy URLs for any project
- No testimonials or employer references on record
- No award placements from the hackathon confirmed

## Product Principles

1. **Honesty over impression** — every claim on the site must be verifiable from actual assets or GitHub history.
2. **Speed of conviction** — a recruiter should know Joseph's stack and reach the contact section in under 60 seconds.
3. **Technical substance over decoration** — the aesthetic serves legibility, not spectacle; the work is the spectacle.
4. **Both modes are first-class** — the site must be equally compelling in light and dark mode, not merely functional in one.
5. **Mobile is a real audience** — every section must be fully usable on a 375px viewport.

## Accessibility & Inclusion

- Minimum WCAG AA contrast in both light and dark modes.
- All interactive elements must have accessible labels (theme toggle, nav links, external links).
- Keyboard navigation must work end-to-end.
