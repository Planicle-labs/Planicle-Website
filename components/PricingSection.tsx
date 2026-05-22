"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";

const tiers = [
  {
    name: "Starter",
    price: "$2,500",
    period: "one-time",
    description: "A premium landing page that makes your startup look established.",
    features: [
      "Custom design & development",
      "Responsive across all devices",
      "SEO-optimized structure",
      "Analytics integration",
      "2 rounds of revision",
      "Delivered in 2 weeks",
    ],
    cta: "Get Started",
    ctaStyle: "secondary" as const,
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$8,000",
    period: "starting at",
    description: "Full-stack application with the polish investors notice.",
    features: [
      "Everything in Starter",
      "Full-stack app development",
      "Authentication & database",
      "Payment integration",
      "Admin dashboard",
      "Delivered in 4 weeks",
      "30 days post-launch support",
    ],
    cta: "Book a Call",
    ctaStyle: "primary" as const,
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "scoped to you",
    description: "Complex systems, AI workflows, and ongoing technical partnership.",
    features: [
      "Everything in Growth",
      "AI/ML integrations",
      "Custom API architecture",
      "Third-party integrations",
      "Dedicated support channel",
      "Ongoing retainer available",
    ],
    cta: "Let's Talk",
    ctaStyle: "secondary" as const,
    highlighted: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="pricing"
      className="section-padding"
      style={{
        background: "var(--color-canvas-elevated)",
      }}
    >
      <div className="container-narrow" ref={ref}>
        <SectionLabel>Pricing</SectionLabel>

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
          Transparent pricing.
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body), 'DM Sans', sans-serif",
            fontSize: "18px",
            lineHeight: 1.6,
            color: "var(--color-ink-secondary)",
            maxWidth: "48ch",
            margin: "0 0 56px 0",
          }}
        >
          No hourly billing surprises. Fixed scope, fixed price, exceptional results.
        </p>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: prefersReduced ? 0 : 0.12 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "var(--color-canvas)",
                borderRadius: "6px",
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                border: tier.highlighted
                  ? "2px solid var(--color-cobalt)"
                  : "1px solid rgba(26, 22, 18, 0.08)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Highlighted badge */}
              {tier.highlighted && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-canvas)",
                    background: "var(--color-cobalt)",
                    padding: "4px 10px",
                    borderRadius: "3px",
                  }}
                >
                  Popular
                </div>
              )}

              {/* Tier name */}
              <p
                style={{
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  margin: "0 0 16px 0",
                }}
              >
                {tier.name}
              </p>

              {/* Price */}
              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display), 'Cormorant Garamond', serif",
                    fontSize: "clamp(40px, 5vw, 52px)",
                    fontWeight: 500,
                    lineHeight: 1,
                    color: "var(--color-ink)",
                  }}
                >
                  {tier.price}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: "13px",
                  color: "var(--color-ink-tertiary)",
                  margin: "0 0 20px 0",
                }}
              >
                {tier.period}
              </p>

              {/* Description */}
              <p
                style={{
                  fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: "var(--color-ink-secondary)",
                  margin: "0 0 28px 0",
                }}
              >
                {tier.description}
              </p>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(26, 22, 18, 0.08)",
                  margin: "0 0 24px 0",
                }}
              />

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 32px 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                }}
              >
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    style={{
                      fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "var(--color-ink-secondary)",
                      display: "flex",
                      alignItems: "baseline",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-cobalt)",
                        fontSize: "14px",
                        lineHeight: 1,
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20a%20website"
                target="_blank"
                rel="noopener noreferrer"
                className={tier.ctaStyle === "primary" ? "btn-primary" : "btn-secondary"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {tier.cta}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
