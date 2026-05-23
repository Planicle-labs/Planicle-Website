"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionLabel } from "./SectionLabel";

/* ============================================================
   Tier Data
   ============================================================ */

const tiers = [
  {
    name: "Starter",
    price: "$2,500",
    period: "one-time",
    description: "A premium landing page that makes your startup look established.",
    features: [
      "Custom design & development",
      "Responsive across all devices",
      "SEO-optimized structure",
      "Analytics integration",
      "2 rounds of revision",
      "Delivered in 2 weeks",
    ],
    cta: "Get Started",
    ctaStyle: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$8,000",
    period: "starting at",
    description: "Full-stack application with the polish investors notice.",
    features: [
      "Everything in Starter",
      "Full-stack app development",
      "Authentication & database",
      "Payment integration",
      "Admin dashboard",
      "Delivered in 4 weeks",
      "30 days post-launch support",
    ],
    cta: "Book a Call",
    ctaStyle: "primary" as const,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "scoped to you",
    description: "Complex systems, AI workflows, and ongoing technical partnership.",
    features: [
      "Everything in Growth",
      "AI/ML integrations",
      "Custom API architecture",
      "Third-party integrations",
      "Dedicated support channel",
      "Ongoing retainer available",
    ],
    cta: "Let\u2019s Talk",
    ctaStyle: "secondary" as const,
    highlighted: false,
  },
];

/* ============================================================
   LEGO Debris — scattered brick pieces around section
   ============================================================ */

interface DebrisPiece {
  id: number;
  x: string;
  y: string;
  size: number;
  color: string;
  rotation: number;
  delay: number;
  type: "stud" | "1x1" | "circle" | "2x1";
}

const DEBRIS_COLORS = [
  "#1B4FD8", "#2563EB", "#4A6FA5", "#36AEBF",
  "#E8B84B", "#05131D", "#9DC3E6", "#1a8a3f",
  "#C9441F", "#FFFFFF",
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateDebris(): DebrisPiece[] {
  const rand = mulberry32(42);
  const pieces: DebrisPiece[] = [];
  // Bottom-left cluster
  const bottomLeft: [string, string][] = [
    ["2%", "82%"], ["5%", "88%"], ["8%", "85%"], ["1%", "90%"],
    ["3%", "95%"], ["7%", "92%"], ["10%", "88%"], ["4%", "78%"],
    ["6%", "75%"], ["0%", "85%"],
  ];
  // Bottom-right cluster
  const bottomRight: [string, string][] = [
    ["88%", "80%"], ["92%", "85%"], ["95%", "88%"], ["90%", "92%"],
    ["85%", "90%"], ["93%", "78%"], ["97%", "82%"], ["86%", "95%"],
    ["91%", "75%"], ["94%", "92%"],
  ];
  // Top scattered
  const topScatter: [string, string][] = [
    ["15%", "8%"], ["25%", "12%"], ["10%", "15%"],
    ["30%", "5%"], ["20%", "18%"],
  ];

  const allPositions = [...bottomLeft, ...bottomRight, ...topScatter];
  const types: DebrisPiece["type"][] = ["stud", "stud", "1x1", "1x1", "circle", "2x1"];

  allPositions.forEach(([x, y], i) => {
    pieces.push({
      id: i,
      x, y,
      size: 8 + rand() * 14,
      color: DEBRIS_COLORS[i % DEBRIS_COLORS.length],
      rotation: rand() * 360,
      delay: rand() * 2,
      type: types[i % types.length],
    });
  });
  return pieces;
}

function DebrisShape({ piece }: { piece: DebrisPiece }) {
  const { type, size, color } = piece;

  if (type === "stud") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="16" rx="2" fill={color} />
        <rect x="2" y="18" width="20" height="4" rx="1" fill="rgba(0,0,0,0.2)" />
        <rect x="2" y="6" width="20" height="2" rx="1" fill="rgba(255,255,255,0.15)" />
        <circle cx="12" cy="5" r="5" fill={color} />
        <circle cx="12" cy="5" r="5" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" fill="none" />
        <circle cx="10.5" cy="3.5" r="2" fill="rgba(255,255,255,0.2)" />
      </svg>
    );
  }
  if (type === "2x1") {
    return (
      <svg width={size * 1.8} height={size} viewBox="0 0 40 24" fill="none">
        <rect x="1" y="4" width="38" height="18" rx="2" fill={color} />
        <rect x="1" y="18" width="38" height="4" rx="1" fill="rgba(0,0,0,0.2)" />
        <rect x="1" y="4" width="38" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
        <circle cx="12" cy="4" r="4" fill={color} />
        <circle cx="12" cy="4" r="4" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" fill="none" />
        <circle cx="28" cy="4" r="4" fill={color} />
        <circle cx="28" cy="4" r="4" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" fill="none" />
      </svg>
    );
  }
  if (type === "1x1") {
    return (
      <div
        style={{
          width: size, height: size, background: color,
          borderRadius: "2px", position: "relative",
          boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "55%", height: "55%", borderRadius: "50%",
            background: "inherit",
            boxShadow: "0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: size, height: size, borderRadius: "50%", background: color,
        boxShadow: "0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    />
  );
}

function ScatteredDebris() {
  const [pieces] = useState(() => generateDebris());
  const prefersReduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute", inset: 0,
        pointerEvents: "none", zIndex: 2,
        overflow: "hidden",
      }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0.4, rotate: p.rotation }}
          animate={{
            opacity: [0, 0.7, 0.5, 0],
            scale: [0.4, 1, 0.7],
            rotate: [p.rotation, p.rotation + 40, p.rotation - 20],
            y: [0, -8, 4],
          }}
          transition={{
            duration: prefersReduced ? 0 : 5 + p.delay * 2,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
          }}
        >
          <DebrisShape piece={p} />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   LEGO Mosaic Border — hand-placed bricks with variable sizes
   Each brick is individually positioned with realistic 3D render
   ============================================================ */

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

/**
 * Individual brick definition.
 * x,y are in cell units from the anchor corner.
 * w,h are in cell units (1×1, 2×1, 1×2).
 */
interface Brick {
  x: number;
  y: number;
  w: number; // width in cells (1 or 2)
  h: number; // height in cells (1 or 2)
  c: string; // color hex
}

interface CardBorderDef {
  anchor: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  bricks: Brick[];
}

// ── Great Wave palette — colors match the background painting ──
// Starter: The Boats
const DT = "#917D61";  // dark tan
const DT2 = "#7A6B53"; // darker tan
// Growth: The Ocean & Waves
const DB = "#0A3463";  // dark blue
const MB = "#4882C2";  // medium blue
const SB = "#5E748C";  // sand blue
// Enterprise: The Foam, Sky & Mountain
const WH = "#FFFFFF";  // white
const TN = "#E4CD9E";  // tan
const LG = "#9ACAEB";  // light gray / light bluish gray

// ── STARTER: Tan boats — asymmetric bottom-left + top-right accent ──
const STARTER_BORDERS: CardBorderDef[] = [
  {
    anchor: "bottom-left",
    bricks: [
      // Bottom row — wide but uneven
      { x: 0, y: 0, w: 2, h: 1, c: DT },
      { x: 2, y: 0, w: 1, h: 1, c: DT2 },
      { x: 3, y: 0, w: 1, h: 1, c: DT },
      // Row 1 — offset, shorter
      { x: 0, y: 1, w: 1, h: 1, c: DT2 },
      { x: 1, y: 1, w: 2, h: 1, c: DT },
      // Row 2 — gap then brick
      { x: 0, y: 2, w: 1, h: 2, c: DT },
      { x: 2, y: 2, w: 1, h: 1, c: DT2 },
      // Row 3 — single trailing
      { x: 1, y: 3, w: 1, h: 1, c: DT2 },
      // Detached floater
      { x: 4, y: 1, w: 1, h: 1, c: DT2 },
    ],
  },
  {
    anchor: "top-right",
    bricks: [
      { x: 0, y: 0, w: 1, h: 1, c: DT2 },
      { x: 1, y: 0, w: 1, h: 1, c: DT },
      { x: 0, y: 1, w: 1, h: 1, c: DT },
    ],
  },
];

// ── GROWTH: Ocean blues — top-left cluster + 2-wide right edge groups ──
const GROWTH_BORDERS: CardBorderDef[] = [
  {
    anchor: "top-left",
    bricks: [
      // 2-row compact cluster — stays above GROWTH label
      { x: 0, y: 0, w: 1, h: 1, c: DB },
      { x: 1, y: 0, w: 2, h: 1, c: MB },
      { x: 3, y: 0, w: 1, h: 1, c: SB },
      // Row 1 — shorter, offset
      { x: 0, y: 1, w: 1, h: 1, c: SB },
      { x: 1, y: 1, w: 1, h: 1, c: DB },
      { x: 2, y: 1, w: 1, h: 1, c: MB },
    ],
  },
  {
    anchor: "top-right",
    bricks: [
      // Group 1
      { x: 0, y: 5, w: 1, h: 1, c: DB },
      { x: 1, y: 5, w: 1, h: 1, c: MB },
      { x: 0, y: 6, w: 1, h: 1, c: SB },
      // Group 2
      { x: 0, y: 11, w: 1, h: 1, c: MB },
      { x: 1, y: 11, w: 1, h: 1, c: DB },
      { x: 1, y: 12, w: 1, h: 1, c: SB },
    ],
  },
  {
    anchor: "bottom-left",
    bricks: [
      { x: 0, y: 0, w: 1, h: 1, c: MB },
      { x: 1, y: 0, w: 1, h: 1, c: DB },
      { x: 0, y: 1, w: 1, h: 1, c: SB },
    ],
  },
];

// ── ENTERPRISE: Foam & sky — organic clusters spreading inward ──
const ENTERPRISE_BORDERS: CardBorderDef[] = [
  {
    anchor: "top-right",
    bricks: [
      // Wide front row anchored to top edge
      { x: 0, y: 0, w: 2, h: 1, c: TN },
      { x: 2, y: 0, w: 1, h: 1, c: LG },
      { x: 3, y: 0, w: 1, h: 1, c: TN },
      // Row 1 — staggers LEFT from edge
      { x: 0, y: 1, w: 1, h: 1, c: LG },
      { x: 1, y: 1, w: 1, h: 1, c: TN },
      { x: 3, y: 1, w: 1, h: 1, c: LG },
      // Row 2 — gap in middle, asymmetric
      { x: 0, y: 2, w: 1, h: 1, c: TN },
      { x: 2, y: 2, w: 1, h: 1, c: LG },
      // Row 3 — detached singles
      { x: 1, y: 3, w: 1, h: 1, c: TN },
    ],
  },
  {
    anchor: "bottom-right",
    bricks: [
      // Compact base
      { x: 1, y: 0, w: 2, h: 1, c: LG },
      { x: 3, y: 0, w: 1, h: 1, c: TN },
      // Row 1 — wider, offset left
      { x: 0, y: 1, w: 1, h: 1, c: TN },
      { x: 1, y: 1, w: 1, h: 1, c: LG },
      { x: 3, y: 1, w: 1, h: 1, c: LG },
      // Row 2 — irregular
      { x: 0, y: 2, w: 1, h: 1, c: LG },
      { x: 2, y: 2, w: 2, h: 1, c: TN },
      // Detached floater
      { x: 1, y: 3, w: 1, h: 1, c: TN },
    ],
  },
  {
    anchor: "top-left",
    bricks: [
      // Small left accent
      { x: 0, y: 2, w: 1, h: 1, c: TN },
      { x: 0, y: 3, w: 1, h: 1, c: LG },
    ],
  },
];

const ALL_BORDERS: Record<string, CardBorderDef[]> = {
  Starter: STARTER_BORDERS,
  Growth: GROWTH_BORDERS,
  Enterprise: ENTERPRISE_BORDERS,
};

function LegoCardBorder({ tierName }: { tierName: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const w = Math.round(rect.width);
    const h = Math.round(rect.height);
    if (w === 0 || h === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const cell = 24;
    const pad = 2;
    const borders = ALL_BORDERS[tierName] || [];

    function drawBrick(
      cx: CanvasRenderingContext2D,
      px: number,
      py: number,
      bw: number,
      bh: number,
      colorHex: string,
    ) {
      const [r, g, b] = hexToRgb(colorHex);
      const dr = Math.floor(r * 0.68);
      const dg = Math.floor(g * 0.68);
      const db = Math.floor(b * 0.68);
      const lr = Math.min(255, r + 35);
      const lg = Math.min(255, g + 35);
      const lb = Math.min(255, b + 35);
      const rad = 3;

      // ── Blurred drop shadow ──
      cx.save();
      cx.shadowColor = "rgba(0,0,0,0.35)";
      cx.shadowBlur = 6;
      cx.shadowOffsetX = 2;
      cx.shadowOffsetY = 3;
      cx.fillStyle = `rgb(${r},${g},${b})`;
      cx.beginPath();
      cx.roundRect(px, py, bw, bh, rad);
      cx.fill();
      cx.restore();

      // ── Brick body ──
      cx.fillStyle = `rgb(${r},${g},${b})`;
      cx.beginPath();
      cx.roundRect(px, py, bw, bh, rad);
      cx.fill();

      // ── Brick outline (makes light colors visible) ──
      cx.beginPath();
      cx.roundRect(px, py, bw, bh, rad);
      cx.strokeStyle = `rgba(0,0,0,0.15)`;
      cx.lineWidth = 0.8;
      cx.stroke();

      // ── Bottom lip ──
      const lipH = 4;
      cx.fillStyle = `rgb(${dr},${dg},${db})`;
      cx.beginPath();
      cx.roundRect(px, py + bh - lipH, bw, lipH, [0, 0, rad, rad]);
      cx.fill();

      // ── Right edge darkening ──
      cx.fillStyle = `rgba(0,0,0,0.08)`;
      cx.fillRect(px + bw - 1.5, py + rad, 1.5, bh - lipH - rad);

      // ── Top edge shine ──
      cx.fillStyle = `rgba(255,255,255,0.25)`;
      cx.beginPath();
      cx.roundRect(px + 1, py + 0.5, bw - 2, 2, [rad, rad, 0, 0]);
      cx.fill();

      // ── Left edge shine ──
      cx.fillStyle = `rgba(255,255,255,0.1)`;
      cx.fillRect(px + 0.5, py + rad, 1.5, bh - lipH - rad);

      // ── Studs ──
      const studR = cell * 0.23;
      const cellsX = Math.round(bw / cell);
      const cellsY = Math.round(bh / cell);

      for (let sy = 0; sy < cellsY; sy++) {
        for (let sx = 0; sx < cellsX; sx++) {
          const scx = px + sx * cell + cell / 2;
          const scy = py + sy * cell + cell / 2 - 1;

          // Stud shadow
          cx.beginPath();
          cx.arc(scx + 0.8, scy + 1.2, studR + 1, 0, Math.PI * 2);
          cx.fillStyle = `rgba(0,0,0,0.3)`;
          cx.fill();

          // Stud body
          cx.beginPath();
          cx.arc(scx, scy, studR, 0, Math.PI * 2);
          cx.fillStyle = `rgb(${lr},${lg},${lb})`;
          cx.fill();

          // Stud ring
          cx.beginPath();
          cx.arc(scx, scy, studR, 0, Math.PI * 2);
          cx.strokeStyle = `rgba(0,0,0,0.4)`;
          cx.lineWidth = 1.2;
          cx.stroke();

          // Stud specular
          cx.beginPath();
          cx.arc(scx - studR * 0.3, scy - studR * 0.3, studR * 0.4, 0, Math.PI * 2);
          cx.fillStyle = `rgba(255,255,255,0.55)`;
          cx.fill();
        }
      }
    }

    borders.forEach((def) => {
      const { anchor, bricks } = def;

      bricks.forEach((brick) => {
        const bw = brick.w * cell - pad;
        const bh = brick.h * cell - pad;

        let px: number, py: number;
        switch (anchor) {
          case "top-left":
            px = brick.x * cell;
            py = brick.y * cell;
            break;
          case "top-right":
            px = w - (brick.x + brick.w) * cell;
            py = brick.y * cell;
            break;
          case "bottom-left":
            px = brick.x * cell;
            py = h - (brick.y + brick.h) * cell;
            break;
          case "bottom-right":
            px = w - (brick.x + brick.w) * cell;
            py = h - (brick.y + brick.h) * cell;
            break;
        }

        if (px > -cell * 2 && px < w + cell && py > -cell * 2 && py < h + cell) {
          drawBrick(ctx, px, py, bw, bh, brick.c);
        }
      });
    });
  }, [tierName]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        borderRadius: "6px",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}

/* ============================================================
   Animation Variants
   ============================================================ */

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

/* ============================================================
   Pricing Section
   ============================================================ */

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="pricing"
      className="pricing-section section-padding"
      style={{
        background: "var(--color-canvas-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Great Wave Mosaic — top-right bleed ── */}
      <motion.div
        className="pricing-art-layer"
        aria-hidden="true"
        initial={prefersReduced ? false : { opacity: 0, scale: 1.04 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          position: "absolute",
          top: "-5%",
          right: "-3%",
          width: "55%",
          height: "75%",
          zIndex: 1,
        }}
      >
        <div
          className="pricing-art"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/great_wave.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "0 0 0 12px",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,1) 15%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,1) 15%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in" as string,
          } as React.CSSProperties}
        />
      </motion.div>

      {/* ── Floating LEGO debris ── */}
      <ScatteredDebris />

      {/* ── Content ── */}
      <div className="container-narrow" ref={ref} style={{ position: "relative", zIndex: 10 }}>
        {/* Header — left-aligned, sits above the cards */}
        <div style={{ maxWidth: "480px", marginBottom: "56px" }}>
          <SectionLabel>Pricing</SectionLabel>

          <h2
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              margin: "0 0 8px 0",
            }}
          >
            Transparent pricing
            <span style={{ color: "var(--color-gold)" }}>.</span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
              maxWidth: "42ch",
              margin: 0,
            }}
          >
            No hourly billing surprises. Fixed scope,
            <br />
            fixed price, exceptional results.
          </p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: prefersReduced ? 0 : 0.12 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
          className="pricing-cards-grid"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pricing-card"
              style={{
                position: "relative",
                overflow: "visible",
              }}
            >
              {/* LEGO mosaic partial border */}
              <LegoCardBorder tierName={tier.name} />

              {/* Card inner */}
              <div
                style={{
                  background: "var(--color-canvas)",
                  borderRadius: "6px",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  border: tier.highlighted
                    ? "2px solid var(--color-cobalt)"
                    : "1px solid rgba(26, 22, 18, 0.08)",
                  position: "relative",
                  zIndex: 1,
                  overflow: "hidden",
                  boxShadow: "0 2px 16px rgba(26, 22, 18, 0.06)",
                  height: "100%",
                }}
              >
                {/* Highlighted badge */}
                {tier.highlighted && (
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-canvas)",
                      background: "var(--color-cobalt)",
                      padding: "4px 10px",
                      borderRadius: "3px",
                    }}
                  >
                    Popular
                  </div>
                )}

                {/* Tier name */}
                <p
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: tier.highlighted ? "var(--color-cobalt)" : "var(--color-ink-tertiary)",
                    margin: "0 0 16px 0",
                  }}
                >
                  {tier.name}
                </p>

                {/* Price */}
                <div style={{ marginBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                      fontSize: "clamp(40px, 5vw, 52px)",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: "var(--color-ink)",
                    }}
                  >
                    {tier.price}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "var(--color-ink-tertiary)",
                    margin: "0 0 20px 0",
                  }}
                >
                  {tier.period}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                    margin: "0 0 28px 0",
                  }}
                >
                  {tier.description}
                </p>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(26, 22, 18, 0.08)",
                    margin: "0 0 24px 0",
                  }}
                />

                {/* Features */}
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 32px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flex: 1,
                  }}
                >
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      style={{
                        fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                        fontSize: "14px",
                        lineHeight: 1.5,
                        color: "var(--color-ink-secondary)",
                        display: "flex",
                        alignItems: "baseline",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--color-cobalt)",
                          fontSize: "14px",
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={tier.ctaStyle === "primary" ? "btn-primary" : "btn-secondary"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    justifyContent: "center",
                  }}
                >
                  {tier.cta}
                </motion.a>
              </div>{/* end card inner */}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Responsive Overrides ── */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .pricing-art-layer {
            width: 70% !important;
            height: 50% !important;
            top: -2% !important;
          }
        }

        @media (max-width: 768px) {
          .pricing-art-layer {
            width: 100% !important;
            height: 35% !important;
            top: 0 !important;
            right: -5% !important;
            opacity: 0.4 !important;
          }

          :global(.pricing-cards-grid) {
            grid-template-columns: 1fr !important;
            max-width: 420px;
            margin-inline: auto;
          }
        }
      `}</style>
    </section>
  );
}
