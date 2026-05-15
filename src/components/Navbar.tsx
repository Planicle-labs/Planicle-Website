"use client";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <header className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 md:px-6">
      <motion.nav
        initial={prefersReduced ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative flex items-center justify-between w-full max-w-5xl rounded-full transition-all duration-500 ease-out-quint px-5 py-3 backdrop-blur-xl backdrop-saturate-150 border ${
          scrolled
            ? "bg-surface/60 border-foreground/[0.1] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : "bg-surface/30 border-foreground/[0.06] shadow-[0_2px_20px_rgba(0,0,0,0.2)]"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight flex items-center gap-2.5 group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/Logo_white.svg"
            alt="Planicle"
            className="h-7 w-auto"
          />
          Planicle
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.05em] font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 ease-out-quint"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#cta"
          className="hidden md:inline-flex items-center justify-center px-5 py-2 text-[11px] uppercase tracking-[0.05em] font-bold text-accent-foreground bg-accent rounded-full transition-all duration-300 ease-out-quint hover:scale-105 shadow-[0_0_16px_-4px_var(--color-accent)]"
        >
          Book Deal
        </a>

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
