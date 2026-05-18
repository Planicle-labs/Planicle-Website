"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

export function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [shaderMounted, setShaderMounted] = useState(false);

  // Lazy-mount the ShaderGradient when CTA is near viewport
  useEffect(() => {
    if (prefersReduced) return;
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShaderMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Dramatic text entrance
  const headingOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.55],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0.1, 0.55],
    prefersReduced ? [0, 0] : [60, 0]
  );
  const subOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.65],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const subY = useTransform(
    scrollYProgress,
    [0.2, 0.65],
    prefersReduced ? [0, 0] : [40, 0]
  );
  const btnOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.75],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const btnY = useTransform(
    scrollYProgress,
    [0.3, 0.75],
    prefersReduced ? [0, 0] : [30, 0]
  );

  // Shader canvas fades in
  const shaderOpacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReduced ? [0, 0] : [0, 0.7]
  );

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden px-5 py-24 sm:px-6 md:px-12 md:py-48"
    >
      {/* ShaderGradient reprise — more intense, urgent colors */}
      {shaderMounted && (
        <motion.div
          style={{ opacity: shaderOpacity }}
          className="absolute inset-0 z-0"
        >
          <ShaderGradientCanvas
            style={{ position: "absolute", inset: 0 }}
            pixelDensity={1}
            fov={45}
          >
            <ShaderGradient
              control="props"
              type="plane"
              animate="on"
              color1="#6B58FF"
              color2="#00E8C8"
              color3="#0A0A14"
              cDistance={3}
              cPolarAngle={100}
              uSpeed={0.25}
              uStrength={2.4}
              uDensity={1.6}
              uFrequency={5.5}
              brightness={1.2}
              wireframe={false}
              grain="on"
              grainBlending={0.04}
            />
          </ShaderGradientCanvas>

          {/* Overlay to maintain text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background/90" />
        </motion.div>
      )}

      {/* Fallback ambient glow for reduced motion or before shader loads */}
      {!shaderMounted && (
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="h-[55vw] w-[88vw] rounded-full bg-primary/8 blur-[160px] md:h-[30vw] md:w-[80vw]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <motion.h2
            style={{ opacity: headingOpacity, y: headingY }}
            className="mb-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:mb-8 md:text-7xl"
          >
            Ready to stand out?
          </motion.h2>
          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mb-8 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg md:mb-10 md:text-xl"
          >
            Let&apos;s discuss how a bespoke digital solution can bring you
            higher-value clients.
          </motion.p>
          <motion.a
            style={{ opacity: btnOpacity, y: btnY }}
            href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-center text-sm font-bold uppercase tracking-[0.05em] text-accent-foreground shadow-[0_0_32px_-8px_var(--color-accent)] transition-all duration-300 ease-out-quint hover:scale-105 sm:w-auto sm:px-10"
          >
            Book a Consultation
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
