"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ============================================================
   Animation Variants
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const textReveal = {
  hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
  visible: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
};

/* ============================================================
   LEGO Stud SVG — realistic stud shape for debris
   ============================================================ */

function LegoStudSVG({
  size,
  color,
  style,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      {/* Brick base */}
      <rect x="2" y="6" width="20" height="16" rx="2" fill={color} />
      {/* Bottom shadow */}
      <rect
        x="2"
        y="18"
        width="20"
        height="4"
        rx="1"
        fill="rgba(0,0,0,0.2)"
      />
      {/* Top highlight */}
      <rect
        x="2"
        y="6"
        width="20"
        height="2"
        rx="1"
        fill="rgba(255,255,255,0.15)"
      />
      {/* Stud circle */}
      <circle cx="12" cy="5" r="5" fill={color} />
      <circle
        cx="12"
        cy="5"
        r="5"
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Stud highlight */}
      <circle cx="10.5" cy="3.5" r="2" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

/* ============================================================
   Floating LEGO Debris Particles
   ============================================================ */

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
  opacity: number;
  driftX: number;
  driftY: number;
  type: "stud" | "1x1" | "circle" | "2x1";
}

const DEBRIS_COLORS = [
  "#1B4FD8", // cobalt blue
  "#2563EB", // bright blue
  "#4A6FA5", // slate
  "#36AEBF", // azure
  "#E8B84B", // gold/yellow
  "#05131D", // near-black
  "#9DC3E6", // light blue
  "#06193F", // earth blue
  "#1a8a3f", // green (village hills)
  "#FFFFFF", // white swirls
];

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const types: Particle["type"][] = ["stud", "stud", "1x1", "1x1", "circle", "2x1"];
    particles.push({
      id: i,
      x: Math.random() * 240 - 160,
      y: Math.random() * 100,
      size: 6 + Math.random() * 16,
      color: DEBRIS_COLORS[Math.floor(Math.random() * DEBRIS_COLORS.length)],
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 6,
      rotation: Math.random() * 360,
      opacity: 0.25 + Math.random() * 0.6,
      driftX: -15 + Math.random() * 30,
      driftY: -12 + Math.random() * 24,
      type: types[Math.floor(Math.random() * types.length)],
    });
  }
  return particles;
}

function ParticleShape({ particle }: { particle: Particle }) {
  const { type, size, color } = particle;

  if (type === "stud") {
    return <LegoStudSVG size={size} color={color} />;
  }

  if (type === "2x1") {
    // 2x1 brick shape
    return (
      <svg width={size * 1.8} height={size} viewBox="0 0 40 24" fill="none">
        <rect x="1" y="4" width="38" height="18" rx="2" fill={color} />
        <rect x="1" y="18" width="38" height="4" rx="1" fill="rgba(0,0,0,0.2)" />
        <rect x="1" y="4" width="38" height="2" rx="1" fill="rgba(255,255,255,0.12)" />
        <circle cx="12" cy="4" r="4" fill={color} />
        <circle cx="12" cy="4" r="4" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" fill="none" />
        <circle cx="10.8" cy="2.8" r="1.5" fill="rgba(255,255,255,0.2)" />
        <circle cx="28" cy="4" r="4" fill={color} />
        <circle cx="28" cy="4" r="4" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" fill="none" />
        <circle cx="26.8" cy="2.8" r="1.5" fill="rgba(255,255,255,0.2)" />
      </svg>
    );
  }

  if (type === "1x1") {
    // Simple 1x1 brick (square with stud)
    return (
      <div
        style={{
          width: size,
          height: size,
          background: color,
          borderRadius: "2px",
          position: "relative",
          boxShadow:
            "inset 0 -2px 0 rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "55%",
            height: "55%",
            borderRadius: "50%",
            background: "inherit",
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        />
      </div>
    );
  }

  // circle — loose stud
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow:
          "0 1px 2px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    />
  );
}

function FloatingDebris() {
  const [particles] = useState(() => generateParticles(42));

  return (
    <div
      className="hero-debris"
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: "-180px",
        width: "360px",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.x,
            y: `${p.y}%`,
            rotate: p.rotation,
            opacity: 0,
            scale: 0.3,
          }}
          animate={{
            x: [p.x, p.x + p.driftX, p.x - p.driftX * 0.3],
            y: [`${p.y}%`, `${p.y + p.driftY * 0.5}%`, `${p.y + p.driftY}%`],
            rotate: [p.rotation, p.rotation + 60, p.rotation - 30],
            opacity: [0, p.opacity, p.opacity * 0.7, 0],
            scale: [0.3, 1, 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
          }}
        >
          <ParticleShape particle={p} />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   Parallax Hook — subtle mouse-follow effect
   ============================================================ */

function useParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    function handleMouse(e: MouseEvent) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
        setOffset({ x, y });
      });
    }

    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return offset;
}

/* ============================================================
   Hero Section Component
   ============================================================ */

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const parallax = useParallax();

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Layer 1: Subtle background warmth ── */}
      <div
        className="hero-bg-glow"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 50% at 75% 45%, rgba(220, 239, 255, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Layer 2: LEGO Mosaic Art (bleeding right, full height) ── */}
      <motion.div
        className="hero-art-layer"
        aria-hidden="true"
        initial={prefersReduced ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{
          position: "absolute",
          top: "-5%",
          bottom: "-5%",
          right: "-2%",
          left: "32%",
          zIndex: 1,
          transform: prefersReduced
            ? undefined
            : `translate3d(${parallax.x * 0.5}px, ${parallax.y * 0.5}px, 0)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Main mosaic image — uses user's actual LEGO Starry Night */}
        <div
          className="hero-art"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/starry_night.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,1) 25%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0) 95%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,1) 25%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.12) 80%, rgba(0,0,0,0) 95%)",
          }}
        />

        {/* Floating LEGO stud debris on dissolving edge */}
        <FloatingDebris />

        {/* Soft top/bottom edge fade to blend with page canvas */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, var(--color-canvas) 0%, transparent 3%, transparent 82%, var(--color-canvas) 100%)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      </motion.div>

      {/* ── Layer 3: Content ── */}
      <div
        className="container-narrow"
        style={{ width: "100%", position: "relative", zIndex: 10 }}
      >
        <motion.div
          initial={prefersReduced ? false : "hidden"}
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
          className="hero-content"
          style={{ maxWidth: "600px" }}
        >
          {/* Section label */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="section-label"
            style={{ marginBottom: "24px" }}
          >
            Premium Software Agency
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={textReveal}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
              fontSize: "clamp(56px, 8vw, 108px)",
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            Build
            <br />
            <span style={{ fontWeight: 500 }}>
              Precise
              <span style={{ color: "var(--color-gold)" }}>.</span>
            </span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              fontSize: "clamp(17px, 1.8vw, 21px)",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
              marginTop: "28px",
              maxWidth: "420px",
            }}
          >
            Websites, apps, and AI workflows for startups that move fast and
            demand quality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            <motion.a
              href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Book a Call
            </motion.a>
            <motion.a
              href="#services"
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Our Work
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Responsive Overrides ── */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-art-layer {
            left: 0 !important;
            top: 48% !important;
            bottom: -5% !important;
            right: -2% !important;
          }
          .hero-art-layer .hero-art {
            mask-image: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.4) 50%,
              rgba(0, 0, 0, 0) 100%
            ) !important;
            -webkit-mask-image: linear-gradient(
              to top,
              rgba(0, 0, 0, 0.85) 0%,
              rgba(0, 0, 0, 0.4) 50%,
              rgba(0, 0, 0, 0) 100%
            ) !important;
            background-position: center center !important;
          }
          .hero-debris {
            display: none !important;
          }
          .hero-content {
            max-width: 100% !important;
            text-align: center;
          }
          .hero-content .section-label {
            justify-content: center;
          }
          .hero-content > div:last-child {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .hero-art-layer {
            top: 55% !important;
          }
        }
      `}</style>
    </section>
  );
}
