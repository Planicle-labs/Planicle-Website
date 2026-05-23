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
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

const COMPACT_RANGE = 250;
const EXPAND_ZONE = 600;

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  const smoothScrollTo = (targetY: number, duration: number = 800) => {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    const easeOutExpo = (t: number) => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      window.scrollTo(0, startY + difference * easeOutExpo(progress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
    if (e) e.preventDefault();
    setMobileOpen(false);

    if (href === "#" || href === "") {
      if (prefersReduced) {
        window.scrollTo(0, 0);
      } else {
        smoothScrollTo(0, 800);
      }
      return;
    }

    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const targetY = elem.getBoundingClientRect().top + window.scrollY;
      if (prefersReduced) {
        window.scrollTo(0, targetY);
      } else {
        smoothScrollTo(targetY, 800);
      }
    }
  };

  useEffect(() => {
    if (prefersReduced) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        handleScroll(null, href);
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, [prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayScrollY = useMotionValue(0);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const y = window.scrollY;
    lastScrollYRef.current = y;
    displayScrollY.set(Math.min((y / COMPACT_RANGE) * 100, 100));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => {
      if (media.matches) setMobileOpen(false);
    };

    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

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

  // Layout
  const navMaxWidth = useTransform(displayScrollY, [0, 100], [1024, 740]);
  const navPaddingX = useTransform(displayScrollY, [0, 100], [20, 16]);
  const navPaddingY = useTransform(displayScrollY, [0, 100], [12, 8]);
  const navGap = useTransform(displayScrollY, [0, 100], [32, 16]);

  // Logo text
  const textOpacity = useTransform(displayScrollY, [0, 60], [1, 0]);
  const textWidth = useTransform(displayScrollY, [0, 60], [70, 0]);
  const textMargin = useTransform(displayScrollY, [0, 60], [10, 0]);

  // CTA button
  const ctaPaddingX = useTransform(displayScrollY, [0, 100], [20, 16]);
  const ctaPaddingY = useTransform(displayScrollY, [0, 100], [8, 6]);
  const ctaFontSize = useTransform(displayScrollY, [0, 100], [11, 10]);

  // Warm palette glassmorphism
  const bgOpacity = useTransform(displayScrollY, [0, 100], [0.65, 0.85]);
  const borderOpacity = useTransform(displayScrollY, [0, 100], [0.06, 0.1]);
  const shadowOpacity = useTransform(displayScrollY, [0, 100], [0.06, 0.12]);
  const bgColor = useTransform(bgOpacity, (o) => `rgba(245, 242, 237, ${o})`);
  const borderColor = useTransform(borderOpacity, (o) => `rgba(26, 22, 18, ${o})`);
  const boxShadow = useTransform(shadowOpacity, (o) => `0 8px 32px rgba(26, 22, 18, ${o})`);

  return (
    <header
      className="fixed top-3 left-0 z-50 flex w-[100dvw] max-w-[100dvw] justify-center px-3 pointer-events-none md:top-5 md:inset-x-0 md:w-auto md:max-w-none md:px-6"
    >
      {/* Mobile nav */}
      <nav
        className="relative md:hidden w-[calc(100dvw-24px)] max-w-[calc(100dvw-24px)] min-w-0 flex items-center justify-between rounded-full px-3 py-2 backdrop-blur-xl backdrop-saturate-150 pointer-events-auto overflow-hidden"
        style={{
          background: "rgba(245, 242, 237, 0.8)",
          border: "1px solid rgba(26, 22, 18, 0.08)",
          boxShadow: "0 8px 32px rgba(26, 22, 18, 0.1)",
        }}
      >
        <a
          href="#"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          aria-label="Planicle home"
        >
          <Image
            src="/logo/Logo_black.svg"
            alt=""
            width={36}
            height={28}
            className="h-7 w-9 object-contain"
          />
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full active:bg-black/5"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          style={{ color: "var(--color-ink)" }}
        >
          <div className="relative flex h-3.5 w-5 flex-col justify-between">
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[1.5px] w-full origin-center"
              style={{ background: "var(--color-ink)" }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[1.5px] w-full origin-center"
              style={{ background: "var(--color-ink)" }}
            />
          </div>
        </button>

        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
          className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full"
          aria-hidden="true"
        >
          <div style={{ width: "100%", height: "100%", background: "var(--color-cobalt)", opacity: 0.5, borderRadius: "9999px" }} />
        </motion.div>
      </nav>

      {/* Desktop nav */}
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
        className="relative hidden w-full items-center justify-between rounded-full border backdrop-blur-xl backdrop-saturate-150 pointer-events-auto overflow-hidden md:flex"
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center group shrink-0"
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            color: "var(--color-ink)",
          }}
        >
          <motion.img
            src="/logo/Logo_black.svg"
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

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.05em] font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                color: "var(--color-ink-secondary)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-ink)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-ink-secondary)")
              }
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Desktop CTA */}
        <motion.a
          href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            paddingLeft: ctaPaddingX,
            paddingRight: ctaPaddingX,
            paddingTop: ctaPaddingY,
            paddingBottom: ctaPaddingY,
            fontSize: ctaFontSize,
            background: "var(--color-cobalt)",
            color: "var(--color-canvas)",
            textDecoration: "none",
            borderRadius: "4px",
          }}
          className="hidden md:inline-flex items-center justify-center font-bold shrink-0 uppercase tracking-[0.05em]"
        >
          Book a Call
        </motion.a>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: "0% 50%" }}
          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
          aria-hidden="true"
        >
          <div style={{ width: "100%", height: "100%", background: "var(--color-cobalt)", opacity: 0.4, borderRadius: "9999px" }} />
        </motion.div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-[68px] left-3 right-3 max-h-[calc(100dvh-84px)] overflow-y-auto md:hidden rounded-2xl p-4 pointer-events-auto"
            style={{
              background: "rgba(245, 242, 237, 0.95)",
              backdropFilter: "blur(24px) saturate(1.5)",
              WebkitBackdropFilter: "blur(24px) saturate(1.5)",
              border: "1px solid rgba(26, 22, 18, 0.08)",
              boxShadow: "0 12px 40px rgba(26, 22, 18, 0.12)",
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="px-4 py-3 text-sm font-medium transition-colors"
                  style={{
                    color: "var(--color-ink-secondary)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center px-5 py-3 text-sm font-bold rounded-lg transition-all"
                style={{
                  background: "var(--color-cobalt)",
                  color: "var(--color-canvas)",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
