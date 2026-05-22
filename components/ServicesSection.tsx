"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";
import { LegoMosaic, PATTERN_ROCKET, PATTERN_NODES, PATTERN_GRID } from "./LegoMosaic";

const services = [
  {
    pattern: PATTERN_ROCKET,
    title: "Websites & Apps",
    description:
      "High-converting landing pages and full-stack applications. Built fast, built right.",
    accent: "cobalt",
  },
  {
    pattern: PATTERN_NODES,
    title: "AI Workflows",
    description:
      "Custom AI integrations and automation pipelines that save time and create leverage.",
    accent: "slate",
  },
  {
    pattern: PATTERN_GRID,
    title: "Design Systems",
    description:
      "Scalable component libraries and brand systems that keep your product consistent.",
    accent: "rust",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="services"
      className="section-padding"
      style={{
        background: "var(--color-canvas-elevated)",
      }}
    >
      <div className="container-narrow" ref={ref}>
        <SectionLabel>Services</SectionLabel>

        <h2
          style={{
            fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
            fontSize: "clamp(36px, 5vw, 48px)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
            margin: "0 0 16px 0",
          }}
        >
          What we build.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body), 'DM Sans', sans-serif",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "var(--color-ink-secondary)",
            maxWidth: "52ch",
            margin: "0 0 56px 0",
          }}
        >
          Three capabilities. One standard: exceptional.
        </p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: prefersReduced ? 0 : 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="card"
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div
                style={{
                  padding: "16px",
                  background: "var(--color-canvas)",
                  borderRadius: "4px",
                  width: "fit-content",
                }}
              >
                <LegoMosaic
                  pattern={service.pattern}
                  brickSize={10}
                  gap={1}
                  animate={false}
                />
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    margin: "0 0 8px 0",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "var(--color-ink-secondary)",
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
