"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

const services = [
  {
    number: "01",
    title: "Websites",
    description:
      "High-conversion, lightning-fast storefronts for clinics, agencies, and premium local services.",
    tag: null,
  },
  {
    number: "02",
    title: "Applications",
    description:
      "Custom iOS, Android, and web apps that streamline operations and keep your clients engaged.",
    tag: null,
  },
  {
    number: "03",
    title: "AI Workflows",
    description:
      "Automated scheduling, onboarding, and support through custom AI agents wired into your stack.",
    tag: "Coming soon",
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "center 0.55"],
  });

  // Row entrance — slide from left
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    prefersReduced ? [0, 0] : [-50, 0]
  );

  // Number — starts large and ghostly, shrinks into position
  const numberScale = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReduced ? [1, 1] : [2.8, 1]
  );
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReduced ? [1, 1] : [0.06, 1]
  );

  // Title — clip-path sweep from left to right
  const clipValue = useTransform(
    scrollYProgress,
    [0.08, 0.65],
    prefersReduced ? [0, 0] : [100, 0]
  );
  const clipPath = useMotionTemplate`inset(0 ${clipValue}% 0 0)`;

  // Description — delayed, fades up
  const descOpacity = useTransform(
    scrollYProgress,
    [0.25, 0.75],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const descY = useTransform(
    scrollYProgress,
    [0.25, 0.75],
    prefersReduced ? [0, 0] : [14, 0]
  );

  // Top border line — draws from left
  const borderScaleX = useTransform(
    scrollYProgress,
    [0, 0.55],
    prefersReduced ? [1, 1] : [0, 1]
  );

  return (
    <div ref={ref} className="relative">
      {/* Animated top border */}
      {index > 0 && (
        <motion.div
          style={{ scaleX: borderScaleX, transformOrigin: "0% 50%" }}
          className="absolute top-0 left-0 right-0 h-px bg-border"
        />
      )}

      <motion.a
        href="#cta"
        style={{ opacity, x }}
        className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1.2fr] gap-4 md:gap-8 items-baseline py-10 md:py-12 hover:bg-surface/50 transition-colors duration-500 ease-out-quint -mx-6 md:-mx-8 px-6 md:px-8 cursor-pointer"
      >
        {/* Number */}
        <motion.span
          style={{ scale: numberScale, opacity: numberOpacity }}
          className="font-display text-sm font-bold text-text-tertiary group-hover:text-primary transition-colors duration-500 origin-left"
        >
          {service.number}
        </motion.span>

        {/* Title + tag */}
        <motion.div style={{ clipPath }} className="flex items-center gap-4">
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight group-hover:text-foreground transition-colors duration-500">
            {service.title}
          </h3>
          {service.tag && (
            <span className="text-[10px] uppercase tracking-[0.08em] font-bold px-2.5 py-1 rounded-full bg-surface text-text-tertiary border border-border-subtle">
              {service.tag}
            </span>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          style={{ opacity: descOpacity, y: descY }}
          className="text-text-secondary text-base leading-relaxed max-w-md md:text-right"
        >
          {service.description}
        </motion.p>
      </motion.a>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.4"],
  });

  // Section heading — scroll-driven entrance
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.6],
    prefersReduced ? [0, 0] : [40, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-28 md:py-40 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section heading — left-aligned, not centered */}
        <motion.div
          style={{ opacity: headingOpacity, y: headingY }}
          className="mb-20 md:mb-28 max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.05]">
            Three things we do.
            <br />
            <span className="text-text-secondary">All of them well.</span>
          </h2>
        </motion.div>

        {/* Service rows — scroll-driven reveals */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceRow key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
