"use client";

import { motion } from "framer-motion";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#why-us", label: "Why Us" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  return (
    <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-4 sm:top-4 md:px-6 pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundColor: "oklch(0.15 0.008 270 / 0.55)",
          borderColor: "oklch(0.97 0.005 90 / 0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        className="relative w-full max-w-5xl flex items-center justify-between rounded-full backdrop-blur-xl backdrop-saturate-150 border pointer-events-auto min-h-14 sm:min-h-16"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <img
            src="/logo/Logo_white.svg"
            alt="Planicle"
            className="h-6 w-auto sm:h-7"
          />
          <span className="hidden lg:block font-display text-base font-bold tracking-tight text-foreground">
            Planicle
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[11px] uppercase tracking-[0.05em] font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center font-bold text-accent-foreground bg-accent rounded-full shrink-0 uppercase tracking-[0.05em] whitespace-nowrap shadow-[0_4px_16px_-4px_oklch(0.75_0.16_175_/_0.5)] px-5 py-2 text-[11px]"
        >
          Book Deal
        </a>
      </motion.nav>
    </header>
  );
}
