---
name: Joseph's Digital Showcase
description: Minimalist portfolio for a full-stack developer — technical substance, zero fabrication.
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
    fontFamily: "Inter, system-ui, sans-serif"
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
  none: "0px"
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
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  card-minimal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.card-pad}"
  nav-glass-pill:
    backgroundColor: "transparent"
    rounded: "{rounded.glass-pill}"
    height: "64px"
---

# Design System: Joseph's Digital Showcase

## Overview

**Creative North Star: "The Proof-of-Work Canvas"**

This system is built on the belief that the work is the spectacle. Every visual decision serves legibility and speed of conviction — a recruiter should understand who Joseph is and what he builds within 60 seconds of landing on the page. The palette is achromatic: ink-black on pure white in light mode, near-white on near-black in dark mode. No brand color competes with the content. The only curves are reserved for the floating glass navbar pill; everything else is sharp-cornered and direct.

The typography does the heavy lifting. Display text at 6–8rem with -0.04em tracking creates immediate visual hierarchy without decoration. Mono-spaced labels in JetBrains Mono signal technical credibility at a glance. The body copy is airy and readable at 1.65 line-height.

Motion is purposeful and restrained: fade-up entrances (20px, 0.6s, cubic-bezier 0.16/1/0.3/1), theme transitions via the View Transitions API as a circular radial wipe from the click point, and the GlassSurface SVG-filter navbar that creates genuine optical glass distortion. Nothing moves decoratively.

**Key Characteristics:**
- Achromatic two-tone palette — ink and canvas, each flipped per mode.
- Sharp (0px) radius everywhere except the floating glass nav pill (32px).
- Inter for all prose and headings; JetBrains Mono for labels, tags, and code hints.
- Theme switching via View Transitions API radial-wipe from cursor origin.
- GlassSurface navbar: SVG displacement-map glass distortion, floats 24px from top.
- Dual profile photo crossfade (700ms opacity transition) synchronized to the resolved theme.

## Colors

The palette is deliberately achromatic — rarity of color means the content is never in competition with decoration.

### Primary
- **Ink** (`hsl(240, 10%, 4%)` / dark: `hsl(0, 0%, 98%)`): The foreground text and primary button fill. Used for all headings, body text, primary CTA, nav active state, and icon strokes.

### Neutral
- **Canvas** (`hsl(0, 0%, 100%)` / dark: `hsl(240, 10%, 4%)`): The page background. Pure white in light mode; near-black in dark mode.
- **Surface** (`hsl(0, 0%, 98%)` / dark: `hsl(240, 4%, 8%)`): Raised surfaces — card backgrounds, navbar glass substrate.
- **Muted Text** (`hsl(240, 3.8%, 46.1%)` / dark: `hsl(240, 5%, 64.9%)`): Supporting text — descriptions, labels, nav links at rest.
- **Border** (`hsl(240, 5.9%, 90%)` / dark: `hsl(240, 3.7%, 15.9%)`): Dividers, card outlines, input strokes. Intentionally quiet.

### Named Rules
**The Achromatic Discipline Rule.** No hue is introduced as an accent. Primary actions use Ink directly. Decorative color (backgrounds, glows, tints) is not permitted. The only exception is the SVG glass distortion filter on the navbar, which introduces optical chromatic aberration as a mechanical artifact, not a brand color.

**The Rarity Rule.** Colored text (`text-primary`, i.e. Ink on Canvas) appears only when a full visual shift is needed. Muted text (`text-muted-foreground`) carries all secondary information. Swapping these dilutes the hierarchy.

## Typography

**Display / Heading Font:** Inter (with system-ui, sans-serif fallback)
**Label / Code Font:** JetBrains Mono (with monospace fallback)

**Character:** Inter brings clinical precision with no personality overhead — the right choice for a developer portfolio where the copy is the credential. JetBrains Mono signals "I actually write code" without explanation.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 6rem)`, leading 0.95, -0.04em): Reserved for the hero name `Joseph T. Lopez`. Maximum typographic impact; appears exactly once.
- **Headline** (700, `clamp(1.875rem, 4vw, 3rem)`, leading 1.1, -0.03em): Section titles — About, Projects, Skills, Gallery, etc. Uses `.section-title` utility.
- **Title** (600, `1.25rem`, leading 1.3): Card titles, project names, certification names.
- **Body** (400, `1rem`, leading 1.65): Section descriptions, project summaries, bio text. Optimal at 65–75ch max-width.
- **Label** (JetBrains Mono, 400, `0.75rem`, 0.1em tracking, uppercase): Role descriptor ("Hello, I am"), tech pills, stat labels. Signals taxonomy without shouting.

### Named Rules
**The One Display Rule.** The display scale (name, hero heading) appears on exactly one element per page. Using display-weight tracking (-0.04em) or display sizing outside the hero is prohibited.

**The Mono Signal Rule.** JetBrains Mono is used only for labels, tags, tech pills, and code. Body copy never adopts a monospaced face.

## Layout

The site is a single-page smooth-scroll app with `scroll-padding-top: 5rem` to account for the fixed navbar. The main content lives in a `.section-container` utility: `max-width: 64rem`, `margin: 0 auto`, `padding: 1.5rem`, `py-20 md:py-32` (5rem / 8rem vertical rhythm).

Sections use a consistent 2-column grid on desktop (`grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24`) for the hero, and single-column or 2–3 card grids for content sections. The container never exceeds 64rem, creating generous whitespace on large viewports that reinforces the editorial density.

The navbar floats `top: 1.5rem` above the content, centered, capped at `max-width: 56rem`, at `95%` viewport width. It sits in a `z-index: 50` stacking context above all content.

**Breakpoints:** sm 640px, md 768px, lg 1024px. Mobile is 1-column throughout.

## Elevation & Depth

This system is **flat by default**. Surfaces do not use drop shadows to communicate hierarchy. Depth is conveyed through background color contrast (`canvas` → `surface`), border strokes, and the achromatic border-hover treatment (`border-foreground/30` on card hover).

The sole exception is the **GlassSurface navbar**: it uses SVG `feDisplacementMap` filters to create real optical glass distortion — chromatic aberration with separate red/green/blue displacement channels at scale -180/-170/-160 — giving the nav genuine physical depth without a box-shadow.

### Shadow Vocabulary
- **No decorative shadows.** The system deliberately avoids box-shadows on cards, buttons, or section containers.
- **Glass optical distortion** (`SVG feDisplacementMap, scale ≈ -180`): Navbar only. Not a shadow — a physical-material simulation.

### Named Rules
**The Flat-By-Default Rule.** Surfaces rest flat. The only depth signal is border contrast (`border-border`) and background distinction (`bg-card` vs. `bg-background`). Hover states shift border opacity, not shadow size.

## Shapes

The form language is **brutally sharp**. `--radius: 0rem` — every card, button, and input is square-cornered. This is a deliberate rejection of rounded "softness" in favor of precision and directness.

The sole exception is the **glass nav pill** (32px border-radius) and **tech pills** (fully rounded, `rounded-full`). These two shapes act as signature accent forms against the otherwise uncompromising right angles.

- **Cards** (`.minimal-card`): 0px radius, border-color `border-border`, hover border-color `border-foreground/30`.
- **Primary button** (`.minimal-btn`): 0px radius, solid ink fill.
- **Ghost button** (`.minimal-btn-secondary`): 0px radius, border stroke, transparent fill.
- **Tech pills** (`.tech-pill`): `rounded-full`, mono font, small horizontal padding (12px/4px). On hover: inverts to ink background, canvas text.
- **Profile photo**: fully circular (`rounded-full`), 256–384px diameter, `overflow-hidden`.
- **Glass nav pill**: 32px radius, GlassSurface SVG displacement filter, 64px height.

**Named Rules**
**The Two Exceptions Rule.** Right angles everywhere — with exactly two permitted round forms: the glass nav pill (32px, by material necessity) and tech pills (fully round, by convention). Any third rounded form must be explicitly approved.

## Components

### Buttons
- **Shape:** 0px radius (square corners)
- **Primary** (`.minimal-btn`): Ink background (`hsl(240, 10%, 4%)` light / near-white dark), canvas text. `padding: 12px 24px`. Flex row with 8px gap for icon.
- **Hover / Focus:** -1px Y-translate (`-translate-y-1`), opacity 0.9. No box-shadow.
- **Ghost** (`.minimal-btn-secondary`): Transparent background, ink text, `border-border` stroke. Hover: `bg-accent`, `border-foreground/30`, -1px Y-translate.

### Cards
- **Corner Style:** 0px radius (sharp)
- **Background:** `hsl(0, 0%, 98%)` light / `hsl(240, 4%, 8%)` dark
- **Shadow Strategy:** None (flat system)
- **Border:** `1px solid hsl(240, 5.9%, 90%)` at rest; hover shifts to `hsl(240, 5.9%, 10% / 0.3)`
- **Internal Padding:** `1.5rem` (mobile) / `2rem` (md+)
- **Hover:** Border brightens toward foreground; no transform.

### Chips / Tech Pills
- **Style** (`.tech-pill`): `rounded-full`, `hsl(240, 4.8%, 95.9% / 0.5)` background, `hsl(240, 3.8%, 46.1%)` text, mono font 0.75rem, `1px solid border-border`.
- **State:** Hover inverts — ink background (`bg-foreground`), canvas text (`text-background`), ink border.

### Navigation
- **Style:** Floating GlassSurface pill, 32px border-radius, 64px height, `width: 95%`, `max-width: 56rem`, `top: 1.5rem`, centered.
- **Links:** `text-sm font-medium text-muted-foreground`. Active / hover: `text-foreground`. No underlines.
- **Logo:** `JTL.` — 20px bold, tight tracking.
- **Theme toggle:** Spin SVG button (toggles.dev), 32px icon, no visible border at rest, `hover:bg-secondary` subtle fill.
- **Mobile:** Links collapse into a secondary GlassSurface dropdown below the pill.

### Profile Photo
- Circular crop (`rounded-full`), `overflow-hidden`, white border ring.
- Two images crossfade on theme change — `white1x1.png` (light) and `black1x1.png` (dark) — via `opacity` transition at 700ms. Only one is visible at a time.

### GlassSurface (Signature)
The navbar uses a React Bits `GlassSurface` component that applies an SVG `feDisplacementMap` filter as a `backdrop-filter`. Three displacement channels (red, green, blue) at slightly offset scales create chromatic aberration. Falls back to `backdrop-filter: blur(12px)` on Safari/Firefox. This is the one decorative flourish in the system — architecturally justified by anchoring the nav visually without a solid background.

## Do's and Don'ts

### Do:
- **Do** use `hsl(240, 10%, 4%)` (Ink) and `hsl(0, 0%, 100%)` (Canvas) as the only two base colors; let mode-switching handle the inversion automatically.
- **Do** keep all cards and buttons at 0px border-radius. Only the nav pill (32px) and tech pills (`rounded-full`) break this rule.
- **Do** use Inter 700 at `clamp(3rem, 8vw, 6rem)` tracking-tighter for the hero display, and nowhere else.
- **Do** use JetBrains Mono for all labels, tags, and inline code — never for body text.
- **Do** apply the View Transitions API radial-wipe for theme changes by reading `--x`, `--y`, and `--r` from cursor position.
- **Do** maintain `max-width: 64rem` on all section containers. Content wider than this breaks the editorial feel.
- **Do** let border-color carry hover state on cards (`border-foreground/30`), not shadows or background shifts.
- **Do** crossfade the profile photo opacity on theme change at 700ms; never show a missing or broken image state.

### Don't:
- **Don't** introduce any hue as a brand accent — no blue CTAs, no green badges, no gradient fills on text.
- **Don't** add box-shadows to cards, buttons, or content containers. The system is flat by design.
- **Don't** use rounded corners on cards or buttons. The 0px radius is a core identity signal.
- **Don't** fabricate project data, credentials, or testimonials. Every item must map to a real file in `public/` or a real GitHub repo.
- **Don't** use display-weight tracking (`tracking-tighter` at large size) on any heading outside the hero name.
- **Don't** use Tailwind utility classes inside the `GlassSurface` component's core CSS — it uses its own shadow DOM rendering and must be self-contained.
- **Don't** apply motion for motion's sake. Animations are `fadeUp` (20px lift, 0.6s) on scroll reveal, and the View Transitions wipe on theme toggle — nothing else autoplays or loops.
