"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

const COMPACT_RANGE = 250; // px of real scroll to fully compact/expand
const EXPAND_ZONE = 600;  // only expand on scroll-up within first section

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const displayScrollY = useMotionValue(0);
  const lastScrollYRef = useRef(0);

  // Init from actual scroll position on mount — fixes "reload while scrolled" flash
  useEffect(() => {
    const y = window.scrollY;
    lastScrollYRef.current = y;
    displayScrollY.set(Math.min((y / COMPACT_RANGE) * 100, 100));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastScrollYRef.current;
    lastScrollYRef.current = latest;

    if (latest <= 10) {
      displayScrollY.set(0);
    } else if (delta > 0) {
      displayScrollY.set(Math.min(displayScrollY.get() + (delta / COMPACT_RANGE) * 100, 100));
    } else if (latest <= EXPAND_ZONE) {
      displayScrollY.set(Math.max(displayScrollY.get() + (delta / COMPACT_RANGE) * 100, 0));
    }
  });

  // --- All transforms off displayScrollY directly — no spring, no lag, no SSR mismatch ---

  // Layout
  const navMaxWidth  = useTransform(displayScrollY, [0, 100], [1024, 520]);
  const navPaddingX  = useTransform(displayScrollY, [0, 100], [20, 16]);
  const navPaddingY  = useTransform(displayScrollY, [0, 100], [12, 8]);
  const navGap       = useTransform(displayScrollY, [0, 100], [32, 16]);

  // Logo text
  const textOpacity  = useTransform(displayScrollY, [0, 60], [1, 0]);
  const textWidth    = useTransform(displayScrollY, [0, 60], [70, 0]);
  const textMargin   = useTransform(displayScrollY, [0, 60], [10, 0]);

  // CTA button
  const ctaPaddingX  = useTransform(displayScrollY, [0, 100], [20, 16]);
  const ctaPaddingY  = useTransform(displayScrollY, [0, 100], [8, 6]);
  const ctaFontSize  = useTransform(displayScrollY, [0, 100], [11, 10]);

  // Background / border / shadow — kept at top level to avoid SSR mismatch from inline useTransform
  const bgOpacity     = useTransform(displayScrollY, [0, 100], [0.3, 0.6]);
  const borderOpacity = useTransform(displayScrollY, [0, 100], [0.06, 0.1]);
  const shadowOpacity = useTransform(displayScrollY, [0, 100], [0.15, 0.3]);
  const bgColor       = useTransform(bgOpacity,     (o) => `oklch(0.15 0.008 270 / ${o})`);
  const borderColor   = useTransform(borderOpacity, (o) => `oklch(0.97 0.005 90 / ${o})`);
  const boxShadow     = useTransform(shadowOpacity, (o) => `0 8px 32px rgba(0,0,0,${o})`);

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
      <motion.nav
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          maxWidth: navMaxWidth,
          paddingLeft: navPaddingX,
          paddingRight: navPaddingX,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
          gap: navGap,
          backgroundColor: bgColor,
          borderColor: borderColor,
          boxShadow: boxShadow,
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

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
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
