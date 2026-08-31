---
name: Joseph's Digital Showcase
description: A clean, minimal showcase with tactile and glowing glassmorphism effects.
colors:
  primary: "hsl(209, 38%, 48%)"
  secondary: "hsl(210, 28%, 32%)"
  accent: "hsl(209, 35%, 59%)"
  muted: "hsl(211, 31%, 86%)"
  neutral-bg: "hsl(214, 30%, 97%)"
  neutral-fg: "hsl(213, 31%, 16%)"
typography:
  display:
    fontFamily: "'Cinzel', serif"
  body:
    fontFamily: "'Raleway', sans-serif"
  sans:
    fontFamily: "'Inter', sans-serif"
rounded:
  sm: "calc(0.75rem - 4px)"
  md: "calc(0.75rem - 2px)"
  lg: "0.75rem"
spacing:
  section-y: "6rem"
  container-px: "2rem"
components:
  glass-btn:
    backgroundColor: "linear-gradient(135deg, hsl(209, 38%, 48%), hsl(210, 35%, 40%))"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1.5rem"
  glass-card:
    backgroundColor: "rgba(255, 255, 255, 0.15)"
    rounded: "{rounded.lg}"
---

# Design System: Joseph's Digital Showcase

## Overview

**Creative North Star: "The Ambient Space"**

The aesthetic philosophy of this site is clean and minimal, letting the work speak for itself without distractions. It uses glowing, atmospheric, and soft visual cues like liquid glass effects to bring life to an otherwise restrained canvas. It avoids aggressive visual noise and focuses on creating a tactile, immersive environment.

**Key Characteristics:**
- Glowing, atmospheric glassmorphism over clean backgrounds.
- Minimal structural clutter, allowing content to breathe.
- Tactile interactions with soft hover lift and ambient shadows.

## Colors

The palette is restrained, using a deep, moody blue family layered with glowing accents.

### Primary
- **Deep Ocean Slate** (hsl 209 38% 48%): The core brand color, used for primary actions, subtle glows, and gradients.

### Secondary
- **Muted Steel** (hsl 210 28% 32%): Secondary contrast, used for deeper background layers and muted states.

### Accent
- **Glowing Sapphire** (hsl 209 35% 59%): Used for highlights, hover states, and ambient glows.

### Neutral
- **Frost Background** (hsl 214 30% 97%): Light mode background.
- **Midnight Foreground** (hsl 213 31% 16%): Primary text and strong contrast elements.
- **Glass Shimmer** (rgba 255, 255, 255, 0.15): The foundation of all tactile card surfaces.

### Named Rules
**The Glass Blur Rule.** Liquid glass elements rely on a 16px blur and 180% saturation filter to pull the background through organically. Solid backgrounds should be avoided where glass can create ambient depth.

## Typography

**Display Font:** 'Cinzel', serif
**Body Font:** 'Raleway', sans-serif
**Sans Interface Font:** 'Inter', sans-serif

**Character:** An elegant juxtaposition. The classic, majestic feel of Cinzel anchors the display type, while Raleway and Inter provide clean, highly readable modern interfaces.

### Hierarchy
- **Display** (bold, fluid sizing): Used exclusively for hero sections and major section headers to command attention.
- **Headline / Title**: Inter or Raleway, providing clear structural hierarchy for project names and section divisions.
- **Body** (regular, 1.5+ line-height): Highly readable blocks for descriptions and prose.

## Layout

The layout is centered and breathable, anchored by a max-width 6xl container (`max-w-6xl`). Sections have generous vertical rhythm (`py-16` or `py-24`), creating a distinct pause between content blocks.

## Elevation & Depth

Layered and lifted, using soft, ambient glowing shadows to convey depth.

### Shadow Vocabulary
- **Ambient Soft Shadow** (`0 4px 20px -4px hsl(209 38% 48% / 0.15)`): The resting state for elevated elements.
- **Elevated Hover Shadow** (`0 20px 40px -15px hsl(209 38% 48% / 0.2)`): The lifted state for primary buttons and interactive cards.
- **Glass Shadow** (`0 4px 30px rgba(0, 0, 0, 0.05)`): The subtle drop shadow combined with inset lighting (`inset 0 1px 0 rgba(255, 255, 255, 0.4)`) to make glass elements pop.

### Named Rules
**The Glowing Lift Rule.** Depth is not just structural; it is energetic. When elements lift on hover, their shadow spreads and their opacity or blur shifts to feel like they are catching light.

## Shapes

Soft, tactile curves. Corners use a uniform `0.75rem` radius for large elements, stepping down to `0.5rem` and `0.25rem` for nested elements to maintain concentric curves.

## Components

Tactile and glowing, featuring glassmorphism, gradient borders, and soft glows on hover.

### Primary Glass Button
- **Shape:** Soft pill or rounded rectangle (0.75rem).
- **Primary:** Deep Ocean Slate gradient with inner glass shimmer.
- **Hover / Focus:** Lifts vertically (`-2px`), shadow intensifies to Elevated Hover, and an inner light streak sweeps across.

### Glass Cards
- **Corner Style:** 0.75rem radius.
- **Background:** Semi-transparent white (`rgba(255,255,255,0.15)`) with heavy background blur (16px).
- **Shadow Strategy:** Ambient glass shadow with inset highlight on the top edge.
- **Hover:** The card lifts (`-5px`) and the border highlight intensifies to simulate catching light.

### Skill Badges
- **Style:** Small glass pills with tight padding.
- **State:** Resting in glass; on hover, they fill with the solid primary color and scale up slightly.

## Do's and Don'ts

### Do:
- **Do** rely on the 16px backdrop blur to create visual separation instead of relying solely on solid borders.
- **Do** ensure interactive elements lift and glow softly on hover.
- **Do** maintain the generous 6rem vertical padding between major sections.

### Don't:
- **Don't** use flat, solid backgrounds for cards unless absolutely necessary; use the established liquid glass classes.
- **Don't** mix aggressive, sharp corners into the soft `0.75rem` radius layout.
- **Don't** clutter the page with noise; let the ambient space breathe.
