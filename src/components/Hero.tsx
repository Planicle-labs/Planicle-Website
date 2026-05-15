"use client";

import "@/lib/three-suppressions";
import { motion } from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* ShaderGradient — the dominant visual */}
      <div className="absolute inset-0 z-0">
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0 }}
          pixelDensity={1.5}
          fov={45}
        >
          <ShaderGradient
            control="props"
            type="plane"
            animate="on"
            color1="#5B48F5"
            color2="#00D4B8"
            color3="#080810"
            cDistance={3}
            cPolarAngle={100}
            uSpeed={0.15}
            uStrength={1.8}
            uDensity={1.3}
            uFrequency={5.5}
            brightness={1.1}
            wireframe={false}
            grain="on"
            grainBlending={0.03}
          />
        </ShaderGradientCanvas>

        {/* Minimal overlay: just enough for text legibility, not enough to bury the canvas */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content — anchored to bottom-left for asymmetric composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20 md:pb-28 pt-48">
        <div className="max-w-3xl">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 text-sm font-medium mb-8 border border-foreground/10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_var(--color-accent)] animate-pulse" />
            Now onboarding new clients
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tight leading-[0.95] mb-8"
          >
            Build fast.
            <br />
            <span className="text-text-secondary">Look sharp.</span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="text-lg md:text-xl text-text-secondary max-w-xl mb-10 leading-relaxed"
          >
            Websites, apps, and AI workflows for doctors, architects, and
            professionals who refuse to look generic online.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="#pricing"
              className="inline-flex items-center justify-center px-7 py-3.5 font-medium text-foreground bg-primary rounded-lg transition-all duration-300 ease-out-quint hover:bg-primary-hover hover:-translate-y-0.5 shadow-[0_4px_20px_-4px_var(--color-primary)]"
            >
              See packages
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center px-7 py-3.5 font-medium text-text-secondary border border-border hover:border-foreground/30 hover:text-foreground rounded-lg transition-all duration-300 ease-out-quint"
            >
              What we build
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
