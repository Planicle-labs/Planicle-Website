"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const reasons = [
  {
    number: "01",
    title: "Zero templates",
    description:
      "Every interface is engineered from scratch. Your practice deserves more than a recycled theme.",
  },
  {
    number: "02",
    title: "Performance as standard",
    description:
      "Built on Next.js and React. Sub-second loads. Your clients never wait.",
  },
  {
    number: "03",
    title: "Designed for conversion",
    description:
      "Layouts are strategically structured to guide visitors toward booking, contacting, or purchasing.",
  },
];

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof reasons)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Each card tracks its own position for spotlight effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Spotlight: full opacity when centered, faded when above/below
  const spotlightOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    prefersReduced ? [1, 1, 1, 1, 1] : [0.15, 0.7, 1, 0.7, 0.35]
  );

  // Parallax: each card moves at a different speed
  const speeds = [60, 90, 120];
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : [speeds[index], -speeds[index] * 0.4]
  );

  // Number color shift — indigo when in spotlight
  const numberColor = useTransform(
    scrollYProgress,
    [0.25, 0.45, 0.55, 0.75],
    [
      "oklch(0.45 0.008 270)",
      "oklch(0.52 0.24 280)",
      "oklch(0.52 0.24 280)",
      "oklch(0.45 0.008 270)",
    ]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: spotlightOpacity,
        y: yOffset,
      }}
      className="group"
    >
      <motion.span
        style={{ color: numberColor }}
        className="font-display text-sm font-bold block mb-4 transition-colors duration-500"
      >
        {reason.number}
      </motion.span>
      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-4">
        {reason.title}
      </h3>
      <p className="text-text-secondary text-base leading-relaxed max-w-lg">
        {reason.description}
      </p>
    </motion.div>
  );
}

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Heading: subtle scale reduction as you scroll past
  const headingScale = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    prefersReduced ? [1, 1] : [1, 0.96]
  );
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    prefersReduced ? [1, 1] : [0, 1]
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.2],
    prefersReduced ? [0, 0] : [30, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="py-28 md:py-40 px-6 md:px-12 border-t border-border"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24">
          <motion.div
            style={{
              scale: headingScale,
              opacity: headingOpacity,
              y: headingY,
            }}
            className="lg:sticky lg:top-32 lg:self-start origin-top-left"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Why professionals
              <br />
              <span className="text-text-secondary">choose Planicle.</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-md leading-relaxed">
              Doctors, architects, and top-tier brokers trust us because their
              digital storefront matters as much as their physical one.
            </p>
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-16">
            {reasons.map((reason, index) => (
              <ReasonCard
                key={reason.number}
                reason={reason}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
