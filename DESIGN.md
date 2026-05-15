---
name: Planicle Labs
description: Brand identity system — v1.0
colors:
  primary: "#5B48F5"
  accent: "#00D4B8"
  tint: "#A99DF8"
  background: "#050505"
  surface: "#18181B"
  text-light: "#FDFDFA"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 700
  heading:
    fontFamily: "Space Grotesk, sans-serif"
    fontWeight: 600
  body:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
  small:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Inter, sans-serif"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  md: "8px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text-light}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
---

# Design System: Planicle Labs

## 1. Overview

**Creative North Star: "Electric Precision"**

Planicle Labs is built on confidence, speed, and precision. It is a premium, no-fluff agency aesthetic that communicates technical excellence and momentum. The visual identity relies heavily on high-contrast dark modes (Space Black) punctuated by vibrant, energetic accents (Indigo Prime, Velocity Teal). It explicitly rejects generic SaaS templates, cheap "Fiverr-style" clutter, and cartoonish aesthetics in favor of a sleek, expensive feel. The "velocity stroke" in the logo represents forward motion, which is the core of the Planicle identity.

**Key Characteristics:**
- High contrast, dark-first default.
- Typography-led hierarchy using geometric display and utilitarian body fonts.
- Punchy, neon-electric accents used sparingly for maximum impact.
- Concise, direct, and confident copy.

## 2. Colors

The palette is anchored in deep space, slashed by electric, high-velocity neon.

### Primary
- **Indigo Prime** (`#5B48F5`): The core brand action color. Used for primary CTAs, the logo bowl, and high-emphasis moments.

### Secondary
- **Velocity** (`#00D4B8`): The "forward motion" stroke. An electric teal used for micro-accents like the live status dot and the logo's velocity line.

### Tertiary
- **Indigo Soft** (`#A99DF8`): A supporting highlight color, used for subtle emphasis or secondary interactive states.

### Neutral
- **Space Black** (`#050505`): The void. The primary background for the dark theme.
- **Deep Surface** (`#18181B`): Used for elevated cards, subtle depth, and structural separation on dark backgrounds.
- **Ghost White** (`#FDFDFA`): The primary text color on dark backgrounds, and the primary background for the light theme.

### Named Rules
**The Velocity Rule.** The Velocity teal (`#00D4B8`) is a micro-accent. It is never used as a large background fill. It is the spark, not the fire.

## 3. Typography

**Display Font:** Space Grotesk (with sans-serif fallback)
**Body Font:** Inter (with sans-serif fallback)
**Label/Mono Font:** Inter

**Character:** A confident, geometric display font paired with a highly legible, utilitarian body font. It feels engineered and precise.

### Hierarchy
- **Display** (700, fluid sizing, tight line-height): Hero headlines. E.g., "Build fast. Look sharp."
- **Heading** (600, large, tight line-height): Section titles. E.g., "We build websites that work."
- **Body** (400, base size, relaxed line-height): Explanatory text. E.g., "Local businesses deserve a serious online presence." Max 65-75ch line length.
- **Small** (400, small size): Disclaimers and supporting details. E.g., "Starting at ₹8,000 · Delivered in 7 days".
- **Label** (500, uppercase, 0.05em tracking): Navigation and micro-copy. E.g., "SERVICES · PACKAGES".

### Named Rules
**The Typography-First Rule.** Hierarchy is established through scale and weight contrast (≥1.25 ratio between steps), not just color. Let the typography do the heavy lifting.

## 4. Elevation

Planicle uses flat, tonal layering rather than heavy drop shadows. Depth is conveyed by contrasting Space Black against Deep Surface. 

### Shadow Vocabulary
- **None**: Surfaces are flat at rest.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat and border-driven. Shadows, if ever used, appear only as a diffuse, ambient response to state (hover, focus), not as structural depth.

## 5. Components

Components are tactile, precise, and confident.

### Buttons
- **Shape:** Gently curved edges (8px radius).
- **Primary:** Indigo Prime background, Ghost White text. Solid, unmissable.
- **Hover / Focus:** Slight upward translation and subtle background brightening.
- **Secondary / Ghost:** Transparent background with a faint border, text color adapts to theme (Ghost White on dark, Space Black on light).

### Pill / Status Indicator
- **Style:** Fully rounded (9999px radius), dark indigo or faint teal background depending on theme.
- **Content:** Features a glowing Velocity teal dot alongside small Inter text (e.g., "Now onboarding new clients").

### Navigation
- **Style:** Clean, text-based labels using the Inter 500 caps style. 
- **States:** Hover states should feel crisp, likely using a subtle color shift or an underline reveal.

## 6. Do's and Don'ts

Maintain the premium, confident aesthetic by strictly enforcing these boundaries.

### Do:
- **Do** use Space Black (`#050505`) as the default background to convey a premium, expensive feel.
- **Do** maintain the "velocity stroke" in the logo mark; it represents forward motion and must never be removed.
- **Do** keep copy direct and confident ("Two developers. Zero fluff. One goal — your growth.").
- **Do** ensure clear space around the logo equal to the height of the "P" bowl on all sides.

### Don't:
- **Don't** use generic SaaS templates or cheap "Fiverr-style" cluttered layouts.
- **Don't** use overly playful or cartoonish aesthetics.
- **Don't** use side-stripe borders (`border-left` or `border-right` greater than 1px) as a colored accent.
- **Don't** use gradient text (`background-clip: text`) combined with a gradient background.
- **Don't** use glassmorphism as a default treatment; rely on solid, opaque surfaces (`#18181B`).
- **Don't** use identical card grids repeated endlessly.
- **Don't** shrink the logo below the minimum display size of 20px.
