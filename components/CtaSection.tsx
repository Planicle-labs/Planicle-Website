"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Sparse animated background bricks
function SparseBrickGrid() {
  const [bricks] = useState(() => {
    const colors = [
      "rgba(27, 79, 216, 0.08)",
      "rgba(232, 184, 75, 0.06)",
      "rgba(74, 111, 165, 0.06)",
      "rgba(196, 185, 154, 0.05)",
    ];
    return Array.from({ length: 24 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 8,
      size: 12 + Math.random() * 16,
    }));
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      {bricks.map((brick, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1, 1, 0.8],
            y: [0, -40, -40, -80],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: brick.delay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${brick.x}%`,
            top: `${brick.y}%`,
            width: brick.size,
            height: brick.size,
            backgroundColor: brick.color,
            borderRadius: "2px",
            boxShadow: `0 4px 12px ${brick.color}`,
          }}
        />
      ))}
    </div>
  );
}

export function CtaSection() {
  return (
    <section
      style={{
        padding: "100px 24px",
        background: "var(--color-ink)",
        color: "var(--color-canvas)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SparseBrickGrid />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 12px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "24px",
              color: "var(--color-gold)",
            }}
          >
            Ready to Build?
          </div>

          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "24px",
            }}
          >
            Turn your blueprints into <br />
            digital masterpieces.
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "rgba(245, 242, 237, 0.8)",
              marginBottom: "40px",
              maxWidth: "600px",
              marginInline: "auto",
            }}
          >
            From pixel-perfect UIs to robust architectures, we provide the
            bricks you need to scale. Let&apos;s build something extraordinary
            together.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: "var(--color-canvas)",
                color: "var(--color-ink)",
                padding: "14px 28px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "15px",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Start Your Project
            </button>
            <button
              style={{
                background: "transparent",
                color: "var(--color-canvas)",
                padding: "14px 28px",
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "15px",
                border: "1px solid rgba(245, 242, 237, 0.2)",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              View Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
