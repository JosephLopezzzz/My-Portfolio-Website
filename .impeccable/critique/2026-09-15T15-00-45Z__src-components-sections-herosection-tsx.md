---
target: src/components/sections/HeroSection.tsx
total_score: 18
max_score: 28
na_heuristics: 7,9,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-15T15-00-45Z
slug: src-components-sections-herosection-tsx
---
# Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Typewriter cursor pulses, but rapid font toggling causes layout flicker |
| 2 | Match System / Real World | 3 | Clear tech terminology, but "full-stack web developer and app developer" is slightly redundant |
| 3 | User Control and Freedom | 2 | Typewriter animations cannot be paused; single outbound PDF CTA without in-app exploration |
| 4 | Consistency and Standards | 2 | Cycling through 6 divergent font families (cursive, pixel, serif) violates DESIGN.md typographic system |
| 5 | Error Prevention | 3 | Safe external links with target="_blank" and rel="noreferrer" |
| 6 | Recognition Rather Than Recall | 3 | Tech badges include clear icons; social buttons have screen-reader labels |
| 7 | Flexibility and Efficiency | n/a | Mode applicability: Portfolio landing hero with single-path scanning |
| 8 | Aesthetic and Minimalist Design | 2 | Liquid glass navbar severely refracts & distorts hero heading on scroll; erratic font jumping |
| 9 | Error Recovery | n/a | Mode applicability: Purely presentational surface with no stateful form inputs |
| 10 | Help and Documentation | n/a | Mode applicability: Portfolio showcase surface |
| **Total** | | **18/28** | **Acceptable (64%)** |

## Design Specificity Verdict

**LLM assessment**: The portfolio establishes a confident base: the monochrome palette, ambient particles, dark/light theme toggle, and circular pixel-transition avatar give Joseph a distinctive personality. However, the hero currently suffers from an identity tension between a polished modern developer showcase and a playground of competing micro-gimmicks. The chief issue is the typewriter heading dynamically alternating between wildly divergent font families (`Pixel Operator`, `Caveat` cursive, `Playfair Display` serif, `Space Mono`, `Georgia`). This breaks DESIGN.md's typographic rules ("Inter 700 for hero display, JetBrains Mono only for tags/code, body copy never monospaced"), causes noticeable cumulative layout shift (CLS), and distracts from Joseph's engineering credentials.

**Deterministic scan**: `detect.mjs` on `HeroSection.tsx` returned clean (0 violations). A scan across `src/` flagged 13 broader findings (notably `bounce-easing` in ContactSection and type-ramp deviations in Projects, Gallery, and ChatBot).

**Visual overlays**: Browser visual inspection at `http://localhost:8080` confirmed that when scrolling down 150–200px, the fixed glassmorphic navbar with its SVG displacement filter passes directly over the hero's `<h1>`, producing heavy chromatic warping where distorted hero letters bleed into the nav capsule and obscure the navigation links.

## Overall Impression

A visually engaging, high-potential hero with sleek dark-mode aesthetics, but undermined by two critical polish defects: optical text distortion when the sticky glass navbar collides with the hero heading during scroll, and erratic font-metric jumping in the typewriter animation.

## What's Working

- **PixelTransition Avatar Interaction**: The interactive hover reveal from minimal silhouette to colored portrait adds a memorable, tactile signature without cluttering the screen.
- **Inline Tech Badges**: Tech pills (`React`, `Node.js`, `Python`) with crisp SVG icons seamlessly integrate Joseph's core stack into the narrative intro.
- **Monochrome & Ambient Atmosphere**: The dark/light theme switching paired with subtle floating particles creates a sleek, immersive backdrop.

## Priority Issues

- **[P1] Sticky Navbar Glass Refraction Collision on Scroll**
  - **Why it matters**: When the user scrolls past the top 150px, the floating navbar's SVG displacement filter refracts the large "Joseph T. Lopez" text directly into the navigation capsule, turning menu links ("Projects", "Skills", "Certifications") into an unreadable mess of distorted letterforms.
  - **Fix**: Adjust the navbar backdrop or glass filter parameters so it maintains optical blur without transparent displacement bleed when floating over dense text, or adjust section padding and z-index masking.
  - **Suggested command**: `/impeccable layout`

- **[P1] Typewriter Font Switching Induces Layout Shift & Brand Inconsistency**
  - **Why it matters**: Cycling between cursive (`Caveat`), pixel font (`Pixel Operator`), and serifs (`Playfair Display`) violates DESIGN.md's strict typography rule ("Inter 700 for hero display, JetBrains Mono only for tags/code, body copy never monospaced"). It causes the cursor and line width to jump abruptly every 3 seconds, looking like a rendering bug rather than a deliberate design choice.
  - **Fix**: Standardize the hero heading on the primary brand font (`Inter` 700 tracking-tight). If dynamic typing is desired, keep the font family consistent to eliminate layout jumping.
  - **Suggested command**: `/impeccable typeset`

- **[P2] Single Off-Site CTA ("View Resume") Bypasses Portfolio Content**
  - **Why it matters**: The hero's only call to action opens an external PDF file in a new tab. Visitors are guided away from the interactive digital showcase before seeing Joseph's featured projects, GitHub activity, or live chatbot.
  - **Fix**: Provide a primary action to explore the work (`Explore Projects` pointing to `#projects`) alongside a secondary ghost button for `View Resume`.
  - **Suggested command**: `/impeccable shape`

- **[P2] Keyboard Inaccessibility for Interactive Easter Eggs**
  - **Why it matters**: The `PixelTransition` avatar only triggers on mouse hover/movement. Keyboard-only and assistive technology users have no way to activate or experience the reveal, and the typewriter text lacks aria announcements.
  - **Fix**: Add focus-within support on the avatar container, and provide `aria-live="polite"` or a static screen-reader accessible title.
  - **Suggested command**: `/impeccable adapt`

## Persona Red Flags

- **Jordan (Confused First-Timer)**: Lands on the hero, sees the name suddenly switch into cursive and pixel fonts, and wonders if the font failed to load or the page is glitching. Sees only "View Resume", clicks it, gets directed off the site, and never discovers the projects below.
- **Sam (Accessibility-Dependent User)**: Navigates using keyboard only. The avatar's interactive pixel transition is completely unreachable. The fluctuating typewriter heading lacks `aria-live` or fixed accessibility labels, making screen-reader announcements unpredictable.
- **Alex (Impatient Power User / Recruiter)**: Wants to immediately see what Joseph has built and what technologies he uses. The single CTA pushes a PDF instead of jumping straight into the project showcase, forcing manual scrolling.

## Minor Observations

- **Bio Punctuation**: There is an extra space before the period following the Python badge (`and Python .`).
- **Subheading Contrast**: The `— React & AI` muted grey text has slightly low contrast against the dark card/canvas background in certain viewing conditions.
- **Architectural Placement**: `<ChatBot />` is currently imported and rendered inside `HeroSection.tsx` rather than at the root layout level in `Index.tsx`.

## Questions to Consider

- *What if the primary CTA invited visitors deeper into your projects instead of sending them to a PDF?*
- *Would a confident, steady typography showcase Joseph as a senior developer better than rapid font-swapping?*
- *Could the floating navbar retain its glassmorphic elegance without refracting underlying headings on scroll?*
