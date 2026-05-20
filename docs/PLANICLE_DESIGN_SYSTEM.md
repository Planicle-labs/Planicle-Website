# PLANICLE — Design System & Build Specification
> Version 1.0 | Premium Software Agency | Seed–Series B Founders

---

## 0. WHAT YOU'RE BUILDING

A single-page marketing website for **Planicle**, a premium software agency that builds websites, apps, and AI workflows for startups.

**The One Goal:** A founder should land on this page, feel that Planicle is clearly better than every other agency they've seen, and book a call — within 90 seconds.

**Reference Site (for mood/ambition level):** https://concierge.ai  
Study it for: typographic mixing (serif + sans), generous whitespace, section-to-section rhythm, and how their decorative element (the colorful mosaic blocks) anchors every screen.

---

## 1. BRAND IDENTITY

### 1.1 Name & Tagline
- **Name:** Planicle
- **Taglines:**
  - Hero: *"We build the software that wins."*
  - Sub: *"Websites. Apps. AI workflows. Engineered for startups that move fast."*

### 1.2 Voice
- Confident, not arrogant
- Precise, not cold
- Expert, not academic
- Copy is SHORT. No fluff. Every word earns its space.

---

## 2. COLOR SYSTEM

```css
:root {
  /* Backgrounds */
  --bg-primary:    #F5F4F0;   /* Warm off-white — main canvas */
  --bg-surface:    #EDECE7;   /* Slightly darker — card/section backgrounds */
  --bg-inverse:    #111111;   /* Near-black — dark sections */

  /* Typography */
  --ink-primary:   #111111;   /* Main text */
  --ink-muted:     #6B6A66;   /* Secondary, captions */
  --ink-faint:     #B0AFA8;   /* Disabled, placeholder */
  --ink-inverse:   #F5F4F0;   /* Text on dark backgrounds */

  /* Accent — use sparingly, maximum impact */
  --accent:        #1B4FFF;   /* Electric Blue — the ONE color that pops */
  --accent-dim:    rgba(27, 79, 255, 0.10);
  --accent-hover:  #0E3DCC;

  /* Precision Stack palette (see Section 5) */
  --stack-900:     #111111;
  --stack-700:     #333333;
  --stack-500:     #666666;
  --stack-300:     #AAAAAA;
  --stack-100:     #D8D6CF;
  --stack-accent:  #1B4FFF;   /* Accent block — used max 2–3 per composition */

  /* Borders & Dividers */
  --border:        rgba(17, 17, 17, 0.10);
  --border-strong: rgba(17, 17, 17, 0.22);
}
```

**Rules:**
- The warm off-white background is sacrosanct — never replace with pure white (#FFF) or grey.
- `--accent` (#1B4FFF) appears in max 3 places per section: one CTA, one accent block, one inline highlight.
- Dark sections (`--bg-inverse`) are used once — for the final CTA.
- No gradients on backgrounds. No glow. No glass/frosted effects. Precision only.

---

## 3. TYPOGRAPHY

### 3.1 Font Stack

```css
/* Load via Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Geist:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Cormorant Garant', Georgia, serif;  /* Headlines */
  --font-body:    'Geist', 'IBM Plex Sans', sans-serif; /* Everything else */
}
```

> **Why these two:** Cormorant Garant has a blade-thin elegance and stunning italic that conveys refined authority. Geist (Vercel's font) reads as engineered precision — appropriate for a technical agency. Together they mirror the site's duality: craft + code.

### 3.2 Type Scale

```css
/* Display — hero headlines, section titles */
.type-display-xl {
  font-family: var(--font-display);
  font-size: clamp(52px, 6vw, 84px);
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: -0.02em;
}

.type-display-lg {
  font-family: var(--font-display);
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Body sizes */
.type-body-lg  { font-size: 18px; line-height: 1.7; }
.type-body     { font-size: 16px; line-height: 1.65; }
.type-body-sm  { font-size: 14px; line-height: 1.6; }

/* Label — uppercase, spaced */
.type-label {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
```

### 3.3 Italic Emphasis (Signature Move — mirroring Concierge.ai)
Every major headline mixes upright weight with a **serif italic** word or phrase. This is the typographic signature.

```html
<!-- Pattern -->
<h1>We build the software that <em>wins.</em></h1>

<!-- em styling -->
em {
  font-style: italic;
  font-weight: 400;   /* lighter than surrounding weight for contrast */
  color: inherit;
}
```

Examples:
- "We build the software that *wins.*"
- "Every line of code is *intentional.*"
- "Shipped fast. Built to *last.*"
- "The agency that *actually* ships."

---

## 4. SPACING & LAYOUT

```css
:root {
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;
  --space-4xl: 128px;
  --space-5xl: 192px;

  --container-max: 1280px;
  --container-pad: clamp(24px, 5vw, 80px);
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding-inline: var(--container-pad);
}
```

**Grid:**
- 12-column grid with 24px gaps.
- Hero: 5 col content | 7 col visual.
- Features: 3 equal columns.
- Process: 3 equal columns.
- CTA: Full-width single column.

**Section padding:** `padding-block: var(--space-5xl)` — sections breathe.

---

## 5. PRECISION STACKS — THE BRAND SIGNATURE COMPONENT ★

This is Planicle's visual DNA. The equivalent of Concierge.ai's colorful mosaic — but architecturally distinct.

### 5.1 What It Is

A composition of **precisely-sized rectangular tiles** arranged in deliberate structural patterns. They are:

- **Monochrome** — shades of the ink palette only, with **1–2 accent blue** tiles per composition
- **Zero border-radius** — sharp corners, always. This is the hardest rule.
- **Varying proportions** — tiles can be 1×1, 1×2, 2×1, 1×3 in a base unit grid. Never random.
- **Flat, solid fills** — no gradients inside tiles. No blur.
- **Subtle separation** — tiles are separated by a 3px gap (the background color shows through = the "mortar")
- **Faint depth** — lighter tiles get a `box-shadow: 0 1px 2px rgba(0,0,0,0.06)` to lift slightly

The pattern looks like: **an architectural section drawing viewed from above**, or **a precision-cut stone floor** — systematic yet warm. It communicates: *we are builders who think in structured systems.*

### 5.2 CSS Foundation

```css
.precision-stack {
  display: grid;
  gap: 3px;
  /* Grid template defined per composition below */
}

.ps-tile {
  border-radius: 0;          /* NEVER round these */
  border: none;
  display: block;
  min-height: var(--ps-base, 52px);
}

/* Tile color tokens */
.ps-900 { background: var(--stack-900); }
.ps-700 { background: var(--stack-700); }
.ps-500 { background: var(--stack-500); }
.ps-300 { background: var(--stack-300); }
.ps-100 { background: var(--stack-100); }
.ps-acc { background: var(--stack-accent); }  /* Use max 2–3 per composition */
```

### 5.3 Composition A — Hero Stack (right column)

A tall, architectural vertical cluster. Suggests a skyline or a build manifest.

```
Grid: 5 columns × N rows, 3px gap, base tile = 56px
Layout (col-span shown):

Row 1: [900 ×2] [   gap   ] [100 ×2] [ 100×1 ]
Row 2: [900 ×1] [700 ×1]   [300 ×2] [ 300×1 ]
Row 3: [700 ×3]             [ACC ×1] [ 100×1 ]
Row 4: [500 ×1] [300 ×1]   [300 ×1] [ 100×2 ]
Row 5: [700 ×2]             [500 ×1] [ 300×2 ]
Row 6: [900 ×1] [500 ×2]   [100 ×1] [  —    ]
Row 7: [300 ×3]             [ACC ×2]
```

Key: `900` = darkest, `ACC` = electric blue. The composition reads dark-heavy at left, lightening to the right — like a gradient through structure. One blue tile appears midway — draws the eye.

**Animation:** On page load, tiles stagger-fade-in from bottom to top, each with `animation-delay: index * 30ms`. Translate-Y from `+12px` to `0`. `ease-out` curve, `duration: 500ms`.

### 5.4 Composition B — Feature Section Corners (decorative)

Smaller, sparser. Appears in top-right and bottom-left corners of feature sections.

```
Grid: 3×3, base tile = 40px

[100] [ — ] [300]
[ — ] [700] [ — ]
[300] [ — ] [ACC]
```

Gaps are left empty (background shows through). Very sparse — creates a "scattered" corner accent without heaviness.

### 5.5 Composition C — CTA Section (dark bg variant)

On the dark (`--bg-inverse`) final CTA section, tiles invert:

- `900` tiles are now invisible (same as bg)
- `500`→ medium grey becomes visible
- `100`→ becomes bright (near-white)
- `ACC`→ electric blue now luminous

The same structural grid, but a photographic negative. Creates visual continuity while signaling a different tone.

### 5.6 Behavior Rules

- **Never animate tiles on hover** — they are structural, not interactive
- **Subtle parallax on scroll:** The stack block translates at `0.15×` the scroll speed (CSS-only: use `transform: translateY(calc(var(--scroll-y) * 0.15px))` via JS scroll listener)
- **On mobile:** Precision stacks scale down and clip — show only the top 60% of the composition, overflow hidden. Never stack below text.
- **Composition is fixed per section** — do not randomize. Randomness kills the "precision" feeling.

---

## 6. COMPONENT LIBRARY

### 6.1 Navigation

```
Layout: Full-width sticky bar, 64px height
Left:   Wordmark "Planicle" — Cormorant Garant, 20px, weight 500
Right:  3 text links (Work / Services / About) + Primary CTA button
```

```css
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(245, 244, 240, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 var(--container-pad);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

/* Nav links */
.nav-link {
  font-size: 14px;
  color: var(--ink-muted);
  transition: color 200ms ease;
}
.nav-link:hover { color: var(--ink-primary); }
```

**CTA Button (Primary — small variant):**
```css
.btn-primary-sm {
  background: var(--ink-primary);
  color: var(--ink-inverse);
  padding: 9px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 200ms ease, transform 150ms ease;
}
.btn-primary-sm:hover {
  background: #333;
  transform: translateY(-1px);
}
```

**Scroll behavior:** Nav has no shadow by default. On scroll > 80px, `border-bottom` transitions to `var(--border-strong)`.

---

### 6.2 Hero Section

```
Layout: 2-column — 5/12 content | 7/12 Precision Stack
Min-height: 100vh
Vertical alignment: center
```

**Content column:**
```html
<span class="type-label">Websites · Apps · AI Workflows</span>
<h1 class="type-display-xl">
  We build the software<br>
  that <em>wins.</em>
</h1>
<p class="type-body-lg" style="max-width: 440px; color: var(--ink-muted); margin-top: 24px;">
  Premium digital products for startups from Seed to Series B.
  No bloat. No generic templates. Just work that performs.
</p>
<div style="display: flex; gap: 12px; margin-top: 40px;">
  <button class="btn-primary">Book a Call</button>
  <button class="btn-ghost">See Our Work →</button>
</div>
```

**Button — Large Primary:**
```css
.btn-primary {
  background: var(--ink-primary);
  color: var(--ink-inverse);
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background 200ms ease, transform 150ms ease, box-shadow 200ms ease;
}
.btn-primary:hover {
  background: #222;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
}

.btn-ghost {
  background: transparent;
  color: var(--ink-primary);
  padding: 14px 20px;
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: border-color 200ms ease, background 200ms ease;
}
.btn-ghost:hover {
  border-color: var(--ink-primary);
  background: rgba(17,17,17,0.04);
}
```

**Hero entrance animation (JS-driven, on DOMContentLoaded):**
```js
// Sequence: label → h1 → p → buttons → stack tiles
// Each element: opacity 0 → 1, translateY 16px → 0
// Duration: 600ms ease-out
// Stagger: 120ms between each element
```

---

### 6.3 Logo / Social Proof Bar

```
Full-width. Background: var(--bg-surface).
8 company logos — grayscale at 40% opacity.
Marquee scroll (CSS animation, pause on hover).
```

```css
.logo-bar {
  padding: 28px 0;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}

.logo-track {
  display: flex;
  gap: 64px;
  align-items: center;
  animation: marquee 30s linear infinite;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.logo-track img {
  filter: grayscale(1);
  opacity: 0.4;
  height: 22px;
  width: auto;
  transition: opacity 250ms ease;
}
.logo-track img:hover { opacity: 0.7; }
```

**Label above logos:**
```html
<p class="type-label" style="text-align:center; margin-bottom: 20px;">
  Trusted by founders at
</p>
```

---

### 6.4 Services Section

```
Headline: "What we <em>build</em>"
Sub: "Three disciplines. One team. Uncompromising standard."
Layout: 3 equal-width cards
```

**Service Card:**
```css
.service-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 40px 32px;
  position: relative;
  overflow: hidden;
  transition: border-color 300ms ease, transform 300ms ease;
}
.service-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
}

/* Accent top line — revealed on hover */
.service-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.service-card:hover::before { transform: scaleX(1); }
```

**Service Card Content:**
```
Icon:     Monochrome line icon, 28px
Number:   "01", "02", "03" — type-label style, top-right, absolute
Title:    type-display-lg (36px)
Body:     type-body, color: ink-muted, max-width 280px
Tag list: Small pill tags for tech stack
```

**Three services:**
1. **Websites** — *"Your first impression. Engineered."* — Figma→prod, animations, conversion-optimized
2. **Apps** — *"Products people actually use."* — Full-stack web + mobile, scalable architecture
3. **AI Workflows** — *"Automation that compounds."* — Custom LLM integrations, internal tools, data pipelines

---

### 6.5 How We Work (Process Section)

```
Label:    "The Process"
Headline: "Precision at every <em>step.</em>"
Layout:   3 steps, horizontal on desktop, vertical on mobile
```

**Step component:**
```css
.process-step {
  position: relative;
  padding-left: 48px;
}

/* Step number */
.process-step::before {
  content: attr(data-step);
  position: absolute;
  left: 0;
  top: 2px;
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 400;
  color: var(--border);    /* Very faint — textural, not dominant */
  line-height: 1;
  font-style: italic;
}

/* Horizontal connector line (desktop only) */
.process-connector {
  width: 100%;
  height: 1px;
  background: var(--border);
  margin-top: 28px;
}
```

**Steps:**
1. **Scope** — "We define what success looks like before writing a line of code."
2. **Build** — "Rapid, iterative delivery. You see real work within days, not weeks."
3. **Ship** — "Deployed, tested, and handed over with documentation that doesn't suck."

---

### 6.6 Work / Portfolio Preview

```
Label:    "Selected Work"
Headline: "Built to <em>perform.</em>"
Layout:   Asymmetric 2-column grid (1 large card + 2 stacked small cards)
```

**Portfolio card:**
```css
.work-card {
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  position: relative;
  cursor: pointer;
}

/* Image fills top 65% of card */
.work-card__image {
  width: 100%;
  aspect-ratio: 16/10;
  object-fit: cover;
  display: block;
  transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
.work-card:hover .work-card__image {
  transform: scale(1.03);
}

.work-card__meta {
  padding: 20px 24px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.work-card__title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 500;
}

.work-card__arrow {
  opacity: 0;
  transform: translate(-4px, 4px);
  transition: opacity 250ms ease, transform 250ms ease;
}
.work-card:hover .work-card__arrow {
  opacity: 1;
  transform: translate(0, 0);
}
```

---

### 6.7 Testimonials

```
Layout: 2-column grid (or carousel on mobile)
Style:  Quote-led, not avatar-led
```

```css
.testimonial {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 36px 32px;
}

.testimonial__quote {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.5;
  color: var(--ink-primary);
  margin-bottom: 24px;
}

.testimonial__author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  filter: grayscale(0.3);
}
```

---

### 6.8 Final CTA Section

```
Background: var(--bg-inverse)  — the ONE dark section on the page
Precision Stack: Composition C (inverted palette)
```

```html
<section class="cta-section">
  <div class="container" style="text-align: center; position: relative; z-index: 1;">
    <span class="type-label" style="color: var(--ink-faint);">Ready to ship?</span>
    <h2 class="type-display-xl" style="color: var(--ink-inverse); margin-top: 16px;">
      Let's build something<br><em>exceptional.</em>
    </h2>
    <p style="color: var(--ink-faint); font-size: 18px; margin-top: 20px; max-width: 480px; margin-inline: auto;">
      Spots are limited. Founders who move fast get results that compound.
    </p>
    <button class="btn-cta-inverse" style="margin-top: 40px;">
      Book a Free Discovery Call
    </button>
  </div>
  <!-- Precision Stack Composition C positioned absolute, right side -->
</section>
```

```css
.btn-cta-inverse {
  background: var(--ink-inverse);  /* white on dark */
  color: var(--ink-primary);
  padding: 16px 36px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 200ms ease, box-shadow 200ms ease;
}
.btn-cta-inverse:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(245,244,240,0.15);
}
```

---

### 6.9 Footer

```
Background:  var(--bg-inverse) — continues from CTA section
Layout:      Logo + tagline left | 2 link columns right
Bottom bar:  Copyright | "Built by Planicle" (self-reference, intentional)
```

---

## 7. ANIMATION SYSTEM

### Philosophy
*Exponential ease-out, always. Never bouncy. Never hyperactive. Motion confirms, it never performs.*

### Animation Curves

```css
:root {
  --ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-standard:  cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Scroll Reveal (applies to all major sections)

```js
// Use IntersectionObserver — no external libraries needed
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 700ms var(--ease-out-expo),
              transform 700ms var(--ease-out-expo);
}
[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger children */
[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms var(--ease-out-expo),
              transform 600ms var(--ease-out-expo);
}
[data-reveal-stagger].visible > *:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
[data-reveal-stagger].visible > *:nth-child(2) { transition-delay: 80ms;  opacity: 1; transform: none; }
[data-reveal-stagger].visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: none; }
```

### Precision Stack Parallax

```js
// Subtle. 0.12x scroll speed. Only on desktop.
if (window.matchMedia('(min-width: 1024px)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    document.querySelectorAll('.precision-stack').forEach(el => {
      const speed = parseFloat(el.dataset.parallax || 0.12);
      el.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
}
```

### Microinteraction Rules

| Element | Trigger | Effect | Duration |
|---------|---------|--------|----------|
| Primary CTA | hover | `translateY(-2px)` + shadow deepen | 200ms |
| Nav links | hover | color: ink-primary | 200ms |
| Service cards | hover | `translateY(-4px)` + top line reveals | 300ms |
| Portfolio cards | hover | image `scale(1.03)` | 600ms |
| Logo bar | — | continuous marquee | 30s |
| Stack tiles | page load | stagger fade-in from bottom | 30ms/tile |

**What NOT to animate:**
- Page transitions (not needed for single-page)
- Cursor (no custom cursor — too trendy)
- Scrollbar (leave native)
- Counting numbers (skip the "1 → 248" animated stat counters — they scream template)

---

## 8. PAGE STRUCTURE & FLOW

```
Section 1:  [NAV]
Section 2:  [HERO]          — 100vh | content left + Stack-A right
Section 3:  [LOGO BAR]      — 80px | scrolling marquee
Section 4:  [SERVICES]      — 3-column cards | decorative Stack-B corners
Section 5:  [PROCESS]       — 3-step horizontal
Section 6:  [WORK]          — portfolio asymmetric grid
Section 7:  [TESTIMONIALS]  — 2 quote cards
Section 8:  [CTA]           — dark bg | Stack-C | full-width
Section 9:  [FOOTER]        — dark bg continues
```

---

## 9. COPY GUIDE (AI-READY)

### Hero
```
Label:  WEBSITES · APPS · AI WORKFLOWS
H1:     We build the software that wins.
Sub:    Premium digital products for startups from Seed to Series B.
        No bloat. No generic templates. Just work that performs.
CTA1:   Book a Call
CTA2:   See Our Work →
```

### Services
```
Label:   What we build
H2:      Three disciplines. One team.

Card 1 — Websites
Title:   Websites
Italic:  "Your first impression, engineered."
Body:    Figma-to-production sites that convert. Pixel-perfect animations,
         fast load times, and copy that works.

Card 2 — Apps
Title:   Apps
Italic:  "Products people actually use."
Body:    Full-stack web and mobile apps built on modern architecture.
         Scalable from day one.

Card 3 — AI Workflows
Title:   AI Workflows
Italic:  "Automation that compounds."
Body:    Custom LLM integrations, internal tools, and data pipelines
         that give your team an unfair advantage.
```

### Process
```
Label:   The Process
H2:      Precision at every step.

Step 1 — Scope
"We define what success looks like before writing a line of code."

Step 2 — Build
"Rapid, iterative delivery. You see real work in days, not months."

Step 3 — Ship
"Deployed, tested, and handed over with documentation that doesn't suck."
```

### CTA
```
Label:   Ready to ship?
H2:      Let's build something exceptional.
Sub:     Spots are limited. Founders who move fast get results that compound.
CTA:     Book a Free Discovery Call
```

---

## 10. RESPONSIVE BEHAVIOR

| Breakpoint | Behavior |
|-----------|----------|
| `< 768px` (mobile) | Single column. Precision stacks clip to 50% height, overflow hidden. Hero stack hidden (background texture only). |
| `768–1024px` (tablet) | 2-column where possible. Stacks scale to 70%. |
| `> 1024px` (desktop) | Full design as specified. Parallax active. |

**Mobile navigation:** Hamburger menu (3 lines → X, animated). Links in a slide-down panel with `--bg-surface` background.

---

## 11. TECHNICAL STACK RECOMMENDATION

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | SEO, performance, easy deployment |
| Styling | Tailwind CSS + custom CSS vars | Utility speed + design token control |
| Animations | CSS + vanilla JS IntersectionObserver | Zero dependency, fast |
| Fonts | Google Fonts (self-host for perf) | Cormorant Garant + Geist |
| Icons | Lucide React | Clean, consistent monochrome |
| Deployment | Vercel | Obvious choice for Next.js |
| Analytics | Plausible (privacy-first) | Appropriate for startup positioning |

**If building as a single HTML file (for prototyping):** Pure HTML + CSS + vanilla JS works perfectly. Use CDN for fonts only.

---

## 12. ACCESSIBILITY REQUIREMENTS (WCAG 2.1 AA)

- All text meets 4.5:1 contrast ratio minimum (ink-primary on bg-primary = 11:1 ✓)
- Interactive elements have visible focus rings: `outline: 2px solid var(--accent); outline-offset: 3px;`
- All images have `alt` attributes
- Motion respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .precision-stack { transform: none !important; }
}
```

- Semantic HTML: `<nav>`, `<main>`, `<section aria-label="...">`, `<footer>`
- Skip-to-content link at page top (visually hidden, visible on focus)

---

## 13. WHAT MAKES THIS DISTINCT FROM GENERIC AGENCIES

| Generic Agency Site | Planicle |
|--------------------|----------|
| Purple gradient hero | Warm off-white + structured geometry |
| "We are passionate about..." | "We build the software that wins." |
| Random stock photos | Precision Stacks as visual identity |
| Carousel testimonials | Static quote-led cards |
| Bouncy scroll animations | Exponential ease-out, restrained |
| Colorful icon packs | Monochrome Lucide icons |
| 3 hero buzzwords | Zero buzzwords |
| Chatbot widget | No widget — the work speaks |

---

*End of Design System v1.0*
*Feed this entire document to the AI building the site. Reference concierge.ai for rhythm/ambition benchmarking.*
