# Planicle — Design System & Spec
*Premium Software Agency · Landing Page*

---

## 1. Brand Foundation

**Positioning:** Planicle is the technical partner that makes founders look credible before they've earned it. Every pixel communicates precision, taste, and execution speed.

**Design Concept — "The Mosaic"**
The LEGO brick mosaic is the conceptual spine of the entire site. Just as a LEGO mosaic assembles thousands of precise units into a singular, premium art object, Planicle assembles precise systems—code, design, strategy—into products that founders are proud to show investors. Every section references this metaphor: structure built from modules, creativity within constraint.

---

## 2. Color System

```
Background (primary):   #F5F2ED   — warm off-white, aged canvas
Background (elevated):  #EDEAE4   — section alternation, cards
Ink (primary):          #1A1612   — near-black, editorial warmth
Ink (secondary):        #6B6560   — muted warm gray
Ink (tertiary):         #A09A94   — captions, metadata

LEGO Accent — Cobalt:   #1B4FD8   — hero dominant, primary CTA
LEGO Accent — Gold:     #E8B84B   — stars, highlights, hover states
LEGO Accent — Rust:     #C9441F   — urgency, pricing, second CTA
LEGO Accent — Slate:    #4A6FA5   — secondary brick elements
LEGO Neutral — Sand:    #C4B99A   — brick borders, texture lines
LEGO Neutral — Ash:     #8C9BAB   — supporting mosaic tiles

Brick Stud (CSS var):   rgba(255,255,255,0.18) overlay on colored tiles
```

**Usage Rule:** The off-white canvas is the silence between notes. LEGO accents appear sparingly—only on interactive elements, hero art, and intentional section "punctuation." No gradients except within the mosaic art rendering.

---

## 3. Typography

```
Display / Hero:      "Cormorant Garamond" — weight 300–600
                     Optical size large. Tracking –0.03em at 80px+.
                     Used for: H1, H2, pull quotes, hero tagline.

Heading / Labels:    "DM Sans" — weight 400–500
                     Tracking 0.08em (ALL CAPS for labels/metadata)
                     Used for: nav, section labels, body H3, CTAs.

Body:                "DM Sans" — weight 400, size 16–18px
                     Line-height 1.65. Max-width 62ch.

Mono / Technical:    "JetBrains Mono" — weight 400
                     Used sparingly: code references, metric callouts.
```

**Type Scale:**
```
--t-xs:    11px / 1.4  — metadata, brick coords
--t-sm:    14px / 1.5  — captions, nav
--t-base:  17px / 1.65 — body
--t-lg:    22px / 1.45 — lead copy
--t-xl:    32px / 1.2  — H3
--t-2xl:   48px / 1.1  — H2
--t-3xl:   72px / 1.0  — H1 desktop
--t-hero: 108px / 0.95 — hero display
```

---

## 4. Spacing & Grid

**Base unit:** 8px  
**Grid:** 12-col, max-width 1280px, gutters 24px (mobile: 16px)  
**Section rhythm:** `padding-block: clamp(80px, 12vw, 160px)`

```
--sp-1:   8px
--sp-2:  16px
--sp-3:  24px
--sp-4:  32px
--sp-6:  48px
--sp-8:  64px
--sp-12: 96px
--sp-16: 128px
```

---

## 5. The LEGO Brick Component

The atomic unit of Planicle's visual language. Every "brick" renders a 1×1 LEGO stud tile.

**Brick Anatomy (CSS):**
```css
.brick {
  width: var(--brick-size, 20px);
  height: var(--brick-size, 20px);
  background: var(--brick-color);
  border-radius: 2px;
  position: relative;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.18), 
              inset 0 1px 0 rgba(255,255,255,0.15);
}
.brick::after {   /* stud */
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 55%; height: 55%;
  border-radius: 50%;
  background: inherit;
  box-shadow: 0 1px 2px rgba(0,0,0,0.25),
              inset 0 1px 0 rgba(255,255,255,0.2);
}
```

**Mosaic Grid:** Bricks assemble in a CSS Grid of `N×M` at 20px cells desktop, 12px mobile. The mosaic renders as a `<canvas>` element or CSS-grid of colored divs, pixelating a reference image at 60×60 resolution using the defined palette.

---

## 6. Motion System

**Philosophy:** Exponential ease-out only. No bounce. No spring physics. Movement should feel like a precision instrument settling into place, not a rubber toy.

```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-circ: cubic-bezier(0, 0.55, 0.45, 1);
--duration-fast:   180ms
--duration-base:   320ms
--duration-slow:   600ms
--duration-cinematic: 1200ms
```

**Scroll System:** CSS `scroll-snap-type: y mandatory` on the viewport container. Each `<section>` is `scroll-snap-align: start` with `height: 100svh`. Snap triggers section-level entrance animations via IntersectionObserver.

**Core Animations:**
- **Brick Build-in:** On section entry, mosaic tiles reveal in a wave pattern (top-left to bottom-right), each brick fading + scaling from 0.6→1 with 8ms staggered delay per tile. Total build time ≤ 800ms.
- **Text Reveal:** Lines clip-path from `inset(0 100% 0 0)` → `inset(0 0% 0 0)`. Stagger 60ms per line.
- **Hover — CTA brick:** Individual brick studs lift +2px (translateY) on hover of the button container, radiating outward from cursor.
- **Cursor:** Custom cursor: 12px filled circle in `--cobalt`, trailing a 32px ring that follows with 80ms lag.

---

## 7. Page Structure

```
01 / NAV         — Sticky. Logo left (wordmark in Cormorant). Links center.
                   CTA right: "Book a Call" (brick-filled button).
                   Blurs background at scroll >40px.

02 / HERO        — Full viewport snap section. 
                   LEFT: H1 headline (2–3 words, display serif, 108px).
                   Subline in DM Sans 22px muted.
                   Primary CTA below.
                   RIGHT: 60×60 LEGO mosaic art piece (canvas render).
                   Mosaic animates in brick-by-brick on load.

03 / CREDIBILITY — "Trusted by" logos in a horizontal marquee.
                   Section label: "CLIENTS" in caps/mono.
                   Half-height snap section.

04 / SERVICES    — 3-column grid. Each card has a small LEGO mosaic icon
                   (8×8 grid) in accent color. Heading + 2-line description.
                   Cards appear staggered on snap entry.

05 / WORK        — Full-bleed project showcase. Left: project details.
                   Right: browser mockup with LEGO frame border 
                   (4-brick-wide colored border around the screenshot).
                   Alternates layout per project.

06 / PROCESS     — Horizontal timeline of 4 steps. Each step has a 
                   numbered brick (large 3D-rendered single LEGO stud).
                   Timeline line is a dotted path in --sand.

07 / SOCIAL PROOF — 2-column masonry of founder testimonials.
                    Pull quote in Cormorant 32px. Attribution in mono.

08 / PRICING     — Clean 3-column. One card has LEGO brick accent border
                   in --cobalt (the recommended tier). Pricing in display type.

09 / CTA CLOSE   — Full-width dark inversion section (#1A1612 bg).
                   Hero-scale headline in off-white serif.
                   Single CTA. Background: sparse animated brick grid.

10 / FOOTER      — Minimal. Logo + nav links + legal. No noise.
```

---

## 8. Component Specs

**Primary Button:**
```
Background: #1B4FD8  |  Text: #F5F2ED  |  Font: DM Sans 500 14px CAPS  
Padding: 14px 28px  |  Border-radius: 4px (brick-corner, not pill)
Hover: background lightens 8%, brick stud animation on top surface
```

**Secondary Button:**
```
Background: transparent  |  Border: 1.5px solid #1A1612  
Hover: fills with --sand, no radius change
```

**Card:**
```
Background: #EDEAE4  |  Border: 1px solid rgba(26,22,18,0.08)
Border-radius: 6px  |  Padding: 32px  
Hover: translateY(-4px) + shadow deepens — duration 320ms ease-out-expo
```

**Section Label:**
```
Font: DM Sans 500 11px  |  Color: --ink-tertiary  
Letter-spacing: 0.12em  |  ALL CAPS  |  Margin-bottom: 16px
Preceded by a 20px × 2px #E8B84B line
```

---

## 9. Do / Don't

| ✓ DO | ✗ DON'T |
|------|---------|
| Let white space breathe | Fill every section with content |
| Restrict LEGO accents to deliberate moments | Scatter bricks randomly as decoration |
| Use serif display type at large scale | Use serif for body copy |
| Animate brick builds once on entry | Loop or auto-play mosaic animations |
| Square / rectangular crop ratios | Rounded pill shapes on major containers |
| 2–4 word headline punches | Long explanatory hero copy |
| Cobalt + Gold as the accent pair | More than 3 accent colors visible at once |

---

## 10. Asset Directions

**Hero Mosaic:** Render a ~60×60 pixel mosaic of a laptop/code editor scene OR an abstract "growth chart" in LEGO palette. Cobalt dominates (sky/background), Gold for highlights (cursor, key pixels). Minimum 3,600 individual brick cells visible.

**Service Icons:** 8×8 brick icons. Each service gets a unique single-accent-color icon on a sand background tile. Pixel-art style: a checkmark, a rocket, a node graph — keep to 1 color + transparent.

**Process Numbers:** Large single LEGO studs (3D-illustrated or CSS), numbered 01–04 in --gold on --cobalt tiles.
