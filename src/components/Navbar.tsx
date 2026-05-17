"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useState, useRef } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

// The key insight: we drive transforms off a motionValue that tracks scroll DOWN
// normally, but on scroll UP we aggressively pull it back toward 0 so the nav
// expands immediately — no waiting to reach the physical top.
export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  // A synthetic scroll value we control (0 = fully expanded, 100 = fully compact).
  // COMPACT_RANGE: real scroll-px needed to traverse the full 0→100 transition.
  // EXPAND_ZONE:  scrollY must be within this distance from top for scroll-UP to expand the nav.
  //               Beyond this point the nav stays compact regardless of scroll direction.
  const COMPACT_RANGE = 250;
  const EXPAND_ZONE = 600; // roughly the height of the first section
  const displayScrollY = useMotionValue(0);
  const lastScrollYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = lastScrollYRef.current;
    const delta = latest - prev;
    lastScrollYRef.current = latest;

    if (latest <= 10) {
      // At the very top — always fully expand
      displayScrollY.set(0);
    } else if (delta > 0) {
      // Scrolling DOWN anywhere → compact
      displayScrollY.set(Math.min(displayScrollY.get() + (delta / COMPACT_RANGE) * 100, 100));
    } else if (latest <= EXPAND_ZONE) {
      // Scrolling UP, but only within the first section — expand gradually
      displayScrollY.set(Math.max(displayScrollY.get() + (delta / COMPACT_RANGE) * 100, 0));
    }
    // Scrolling UP outside EXPAND_ZONE → do nothing; nav stays compact
  });

  // Gentle spring to smooth out per-frame jitter without adding lag
  const smoothScrollY = useSpring(displayScrollY, {
    stiffness: 200,
    damping: 28,
    restDelta: 0.001,
  });

  // Interpolate values based on scroll position (0 to 100px)
  const navMaxWidth = useTransform(smoothScrollY, [0, 100], [1024, 520]);
  const navPaddingX = useTransform(smoothScrollY, [0, 100], [20, 16]);
  const navPaddingY = useTransform(smoothScrollY, [0, 100], [12, 8]);
  const navGap = useTransform(smoothScrollY, [0, 100], [32, 16]);

  // Background and border interpolations
  const bgOpacity = useTransform(smoothScrollY, [0, 100], [0.3, 0.6]);
  const borderOpacity = useTransform(smoothScrollY, [0, 100], [0.06, 0.1]);
  const shadowOpacity = useTransform(smoothScrollY, [0, 100], [0.15, 0.3]);

  // Logo text interpolation - avoid "auto" which breaks interpolation
  const textOpacity = useTransform(smoothScrollY, [0, 60], [1, 0]);
  const textWidth = useTransform(smoothScrollY, [0, 60], [70, 0]);
  const textMargin = useTransform(smoothScrollY, [0, 60], [10, 0]);

  // CTA interpolation
  const ctaPaddingX = useTransform(smoothScrollY, [0, 100], [20, 16]);
  const ctaPaddingY = useTransform(smoothScrollY, [0, 100], [8, 6]);
  const ctaFontSize = useTransform(smoothScrollY, [0, 100], [11, 10]);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
      <motion.nav
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: navMaxWidth,
          paddingLeft: navPaddingX,
          paddingRight: navPaddingX,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          gap: navGap,
          backgroundColor: useTransform(bgOpacity, (o) => `oklch(0.15 0.008 270 / ${o})`),
          borderColor: useTransform(borderOpacity, (o) => `oklch(0.97 0.005 90 / ${o})`),
          boxShadow: useTransform(shadowOpacity, (o) => `0 8px 32px rgba(0, 0, 0, ${o})`),
        }}
        className="relative w-full flex items-center justify-between rounded-full backdrop-blur-xl backdrop-saturate-150 border pointer-events-auto overflow-hidden"
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="font-display text-lg font-bold tracking-tight flex items-center group shrink-0"
        >
          <motion.img
            src="/logo/Logo_white.svg"
            alt="Planicle"
            className="h-7 w-auto"
          />
          <motion.span
            style={{ 
              opacity: textOpacity,
              marginLeft: textMargin,
              width: textWidth,
            }}
            className="overflow-hidden whitespace-nowrap hidden md:block"
          >
            Planicle
          </motion.span>
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.05em] font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="#cta"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            paddingLeft: ctaPaddingX,
            paddingRight: ctaPaddingX,
            paddingTop: ctaPaddingY,
            paddingBottom: ctaPaddingY,
            fontSize: ctaFontSize,
          }}
          className="hidden md:inline-flex items-center justify-center font-bold text-accent-foreground bg-accent rounded-full shadow-[0_0_16px_-4px_var(--color-accent)] shrink-0 uppercase tracking-[0.05em]"
        >
          Book Deal
        </motion.a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <div className="relative w-5 h-3.5 flex flex-col justify-between">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block w-full h-[1.5px] bg-foreground origin-center"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block w-full h-[1.5px] bg-foreground origin-center"
            />
          </div>
        </button>

        {/* Scroll progress bar — thin line at bottom of navbar pill */}
        <motion.div
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "0% 50%",
          }}
          className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary/60 rounded-full"
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full mt-2 left-4 right-4 md:hidden bg-surface/95 backdrop-blur-2xl border border-border rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center px-5 py-3 text-sm font-bold text-accent-foreground bg-accent rounded-xl transition-all"
              >
                Book Deal
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
