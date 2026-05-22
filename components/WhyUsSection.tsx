"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";

const reasons = [
  {
    metric: "Senior",
    title: "Founder-led",
    description: "Every project gets senior attention. No handoffs to juniors, no diluted quality.",
  },
  {
    metric: "4 wks",
    title: "Ship Fast",
    description: "MVP in 4 weeks, not 4 months. We move at startup speed because we are one.",
  },
  {
    metric: "100%",
    title: "Taste-driven",
    description: "We ship things that look expensive. Your product earns trust before users read a word.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function WhyUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="why-us"
      className="section-padding"
      style={{
        background: "var(--color-canvas)",
      }}
    >
      <div className="container-narrow" ref={ref}>
        <SectionLabel>Why Planicle</SectionLabel>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "64px",
            alignItems: "start",
          }}
          className="why-us-grid"
        >
          {/* Left — Pull quote */}
          <motion.div
            initial={prefersReduced ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Two developers.
              <br />
              Zero fluff.
              <br />
              <span style={{ color: "var(--color-cobalt)" }}>
                Infinite precision.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: "18px",
                lineHeight: 1.65,
                color: "var(--color-ink-secondary)",
                marginTop: "24px",
                maxWidth: "48ch",
              }}
            >
              We&apos;re not a factory. We&apos;re craftsmen who take on 3 projects at a time,
              so every pixel gets the attention it deserves.
            </p>
          </motion.div>

          {/* Right — Reason cards */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{
              staggerChildren: prefersReduced ? 0 : 0.1,
              delayChildren: 0.2,
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr",
                  gap: "24px",
                  alignItems: "start",
                  padding: "28px",
                  background: i === 0 ? "var(--color-canvas-elevated)" : "transparent",
                  borderRadius: "6px",
                  border: i === 0 ? "1px solid rgba(26, 22, 18, 0.06)" : "1px solid transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                    fontSize: "22px",
                    fontWeight: 400,
                    color: "var(--color-cobalt)",
                    lineHeight: 1,
                  }}
                >
                  {reason.metric}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "var(--color-ink)",
                      margin: "0 0 6px 0",
                    }}
                  >
                    {reason.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                      fontSize: "15px",
                      lineHeight: 1.6,
                      color: "var(--color-ink-secondary)",
                      margin: 0,
                    }}
                  >
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .why-us-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
