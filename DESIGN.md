---
name: Joseph's Digital Showcase
description: Modern glassmorphic portfolio for a full-stack developer — technical substance meets highly polished interaction.
colors:
  ink: "hsl(240, 10%, 4%)"
  canvas: "hsl(0, 0%, 100%)"
  ink-dark: "hsl(0, 0%, 98%)"
  canvas-dark: "hsl(240, 10%, 4%)"
  surface: "hsl(0, 0%, 98%)"
  surface-dark: "hsl(240, 4%, 8%)"
  muted-text: "hsl(240, 3.8%, 46.1%)"
  muted-text-dark: "hsl(240, 5%, 64.9%)"
  border: "hsl(240, 5.9%, 90%)"
  border-dark: "hsl(240, 3.7%, 15.9%)"
typography:
  display:
    fontFamily: "Syne, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.1em"
rounded:
  md: "0.5rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
  glass-pill: "32px"
spacing:
  section-y: "5rem"
  section-y-md: "8rem"
  container-max: "64rem"
  card-pad: "1.5rem"
  card-pad-md: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  card-glass:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card-pad}"
  nav-glass-pill:
    backgroundColor: "transparent"
    rounded: "{rounded.glass-pill}"
    height: "64px"
---

# Design System: Joseph's Digital Showcase

## Overview

**Creative North Star: "The Polished Workshop"**

This system embraces modern glassmorphism, interactive depth, and highly polished tactile surfaces. Rather than brutalist rigidity, it uses generous border radiuses and translucent layers to create an environment that feels alive and premium. A recruiter should understand who Joseph is within 60 seconds, captivated by smooth micro-interactions, floating components, and an immersive background. The palette remains largely achromatic to let the content and lighting effects shine.

The typography does the heavy lifting. Display text at 6–8rem with -0.04em tracking creates immediate visual hierarchy. Mono-spaced labels in JetBrains Mono signal technical credibility. 

Motion and depth are central to the experience: interactive particle backgrounds, glowing spotlight cards, fade-up entrances, and the View Transitions API radial wipe.

**Key Characteristics:**
- Achromatic two-tone palette — ink and canvas, each flipped per mode.
- Generous, soft radiuses (`1rem` to `1.5rem`) on cards, buttons, and floating panels.
- Inter for all prose and headings; JetBrains Mono for labels, tags, and code hints.
- Extensive use of glassmorphism (translucency + backdrop-blur) to create depth.
- Theme switching via View Transitions API radial-wipe from cursor origin.
- GlassSurface navbar: SVG displacement-map glass distortion, floats 24px from top.
- Interactive components like SpotlightCards, ClickSpark, and ambient Particles.

## Colors

The palette is deliberately achromatic — rarity of color means the content and the interactive lighting effects (like the spotlight glow) take center stage.

### Primary
- **Ink** (`hsl(240, 10%, 4%)` / dark: `hsl(0, 0%, 98%)`): The foreground text and primary button fill. Used for all headings, body text, primary CTA, nav active state, and icon strokes.

### Neutral
- **Canvas** (`hsl(0, 0%, 100%)` / dark: `hsl(240, 10%, 4%)`): The page background. Pure white in light mode; near-black in dark mode.
- **Surface** (`hsl(0, 0%, 98%)` / dark: `hsl(240, 4%, 8%)`): Raised surfaces — card backgrounds, navbar glass substrate. Often used with transparency (e.g., `bg-card/90`) to allow background elements to shine through.
- **Muted Text** (`hsl(240, 3.8%, 46.1%)` / dark: `hsl(240, 5%, 64.9%)`): Supporting text — descriptions, labels, nav links at rest.
- **Border** (`hsl(240, 5.9%, 90%)` / dark: `hsl(240, 3.7%, 15.9%)`): Dividers, card outlines, input strokes. Intentionally quiet.

### Named Rules
**The Achromatic Discipline Rule.** No hue is introduced as an accent. Primary actions use Ink directly. Decorative color (backgrounds, glows, tints) is not permitted. The only exception is the SVG glass distortion filter on the navbar, which introduces optical chromatic aberration as a mechanical artifact, not a brand color.

## Typography

**Display Font:** Syne Bold (700/800) — geometric, wide, architectural. Used *exclusively* for the hero name `<h1>`. 
**Body / Headline Font:** Inter (300–800) — clinical precision, correct for developer prose. Used for all headings, body text, nav, and buttons.
**Label / Code Font:** JetBrains Mono (400–600) — signals "I actually write code" without explanation.

**Character:** Inter brings clinical precision with no personality overhead — the right choice for a developer portfolio where the copy is the credential. JetBrains Mono signals "I actually write code" without explanation.

### Hierarchy
- **Display** (Syne 700, `clamp(3rem, 8vw, 6rem)` via `text-5xl → text-7xl → text-8xl`, leading 0.95, -0.04em): Reserved for the hero name `Joseph T. Lopez`. Maximum typographic impact.
- **Headline** (Inter 700, `text-3xl md:text-5xl`, leading 1.1, -0.03em): Section titles. Uses `.section-title` utility.
- **Title** (Inter 700, `text-xl`, leading 1.3, `tracking-tight`): Card titles, project names, certification names.
- **Body** (Inter 400, `text-base` (1rem), leading 1.65): Section descriptions, project summaries, bio text. Minimum 1rem.
- **Label** (JetBrains Mono 400, `text-xs` (0.75rem), 0.1em tracking, uppercase): Role descriptor, tech pills, stat labels.

### Named Rules
**The One Display Rule.** The display scale (name, hero heading) appears on exactly one element per page. Using display-weight tracking (-0.04em) or display sizing outside the hero is prohibited.

**The Mono Signal Rule.** JetBrains Mono is used only for labels, tags, tech pills, and code. Body copy never adopts a monospaced face.

## Layout

The site is a single-page smooth-scroll app with `scroll-padding-top: 5rem` to account for the fixed navbar. The main content lives in a `.section-container` utility: `max-width: 64rem`, `margin: 0 auto`, `padding: 1.5rem`, `py-20 md:py-32`.

Sections use a consistent 2-column grid on desktop (`grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24`) for the hero, and single-column or 2–3 card grids for content sections. The container never exceeds 64rem.

The navbar floats `top: 1.5rem` above the content, centered, capped at `max-width: 56rem`, at `95%` viewport width. It sits in a `z-index: 50` stacking context above all content. Global interactive backgrounds (like Particles) sit at `z-index: 0`.

**Breakpoints:** sm 640px, md 768px, lg 1024px. Mobile is 1-column throughout.

## Elevation & Depth

This system uses **translucency, blur, and interactive lighting** to communicate hierarchy and depth, rather than traditional drop shadows.

- **Spotlight Glow:** Cards use an interactive radial gradient (`SpotlightCard`) that follows the mouse, creating a sense of physical material reacting to light.
- **Glassmorphism:** Overlays, floating panels (like the ChatBot), and the navbar use `backdrop-blur` and translucent backgrounds to float above the content and ambient particles.

### Named Rules
**The Glass Substrate Rule.** Floating UI elements (navbars, chat windows, sticky headers) must use translucency (`bg-background/90`, `bg-card/90`) and backdrop-blur to create optical depth. Completely opaque floating panels break the immersion of the ambient background layers.

## Shapes

The form language is **soft and tactile**. Corners are generously rounded to invite interaction and complement the fluid motion of the background.

- **Cards and Panels:** `1rem` to `1.5rem` (`rounded-2xl` to `rounded-3xl`) for large container elements like Project cards, Spotlight cards, and the Chatbot window.
- **Buttons:** `0.5rem` to `1rem` (`rounded-lg` to `rounded-xl`) to match the softer aesthetic.
- **Tech pills:** `rounded-full`, mono font, small horizontal padding.
- **Glass nav pill**: 32px radius.
- **Profile photo**: fully circular (`rounded-full`).

### Named Rules
**The Soft Interface Rule.** Sharp 0px right angles are deprecated. Standardize on `rounded-2xl` (`1rem`) for primary interactive cards, `1.5rem` for large feature panels, and `rounded-lg` for buttons. 

## Components

### Buttons
- **Shape:** `rounded-lg` (0.5rem radius)
- **Primary:** Ink background (`hsl(240, 10%, 4%)` light / near-white dark), canvas text. `padding: 12px 24px`.
- **Hover / Focus:** -1px Y-translate (`-translate-y-1`), opacity 0.9.
- **Ghost:** Transparent background, ink text, `border-border` stroke. Hover: `bg-accent`, `border-foreground/30`, -1px Y-translate.

### Cards / SpotlightCards
- **Corner Style:** `rounded-3xl` (1.5rem radius) or `rounded-2xl` (1rem radius)
- **Background:** `hsl(0, 0%, 98%)` light / `hsl(240, 4%, 8%)` dark. Often slightly translucent when floating.
- **Shadow Strategy:** Interactive radial spotlight glow on hover/focus-within.
- **Border:** `1px solid hsl(240, 5.9%, 90%)` at rest.
- **Internal Padding:** `1.5rem` (mobile) / `2rem` (md+)

### Chips / Tech Pills
- **Style:** `rounded-full`, `hsl(240, 4.8%, 95.9% / 0.5)` background, `hsl(240, 3.8%, 46.1%)` text, mono font 0.75rem, `1px solid border-border`.
- **State:** Hover inverts — ink background (`bg-foreground`), canvas text (`text-background`), ink border.

### Navigation
- **Style:** Floating GlassSurface pill, 32px border-radius, 64px height, `width: 95%`, `max-width: 56rem`, `top: 1.5rem`, centered.
- **Links:** `text-sm font-medium text-muted-foreground`. Active / hover: `text-foreground`. No underlines.
- **Theme toggle:** Spin SVG button (toggles.dev), 32px icon, `hover:bg-secondary` subtle fill.

### ChatBot Window
- **Style:** Floating panel at bottom right. Uses `rounded-2xl` or `rounded-3xl` and `SpotlightCard` container for interactive glow.
- **Background:** `bg-card/90` with `backdrop-blur-xl` to float gracefully above the background particles.

## Do's and Don'ts

### Do:
- **Do** use `hsl(240, 10%, 4%)` (Ink) and `hsl(0, 0%, 100%)` (Canvas) as the only two base colors.
- **Do** standardize border radiuses around `1rem` and `1.5rem` for cards to maintain the soft glassmorphic feel.
- **Do** use `backdrop-blur` and slight transparency for floating elements to maintain depth.
- **Do** use Inter 700 at `clamp(3rem, 8vw, 6rem)` tracking-tighter for the hero display, and nowhere else.
- **Do** use JetBrains Mono for all labels, tags, and inline code.
- **Do** maintain `max-width: 64rem` on all section containers.

### Don't:
- **Don't** introduce any hue as a brand accent.
- **Don't** mix brutalist 0px sharp corners with the new soft rounded design system.
- **Don't** fabricate project data, credentials, or testimonials.
- **Don't** use display-weight tracking (`tracking-tighter` at large size) on any heading outside the hero name.
- **Don't** use arbitrary padding or font sizes that fall outside the Tailwind spacing/typography ramps.
