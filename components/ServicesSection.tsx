"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionLabel } from "./SectionLabel";

interface LegoBrickProps {
  cols?: number;
  rows?: number;
  color?: string;
  style?: React.CSSProperties;
}

function LegoBrick({ cols = 2, rows = 1, color = "var(--color-cobalt)", style = {} }: LegoBrickProps) {
  const studSpacing = 14;
  const brickWidth = cols * studSpacing;
  const brickHeight = rows * studSpacing;
  const studs = Array.from({ length: cols * rows });

  return (
    <div
      style={{
        width: `${brickWidth}px`,
        height: `${brickHeight}px`,
        background: color,
        borderRadius: "3px",
        position: "relative",
        boxShadow: "inset 0 -2.5px 0 rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 8px rgba(0, 0, 0, 0.12)",
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        padding: "2px",
        gap: "2px",
        boxSizing: "border-box",
        transform: "translateZ(0)",
        willChange: "transform",
        ...style,
      }}
    >
      {studs.map((_, i) => (
        <div
          key={i}
          style={{
            background: "inherit",
            borderRadius: "50%",
            boxShadow: "0 1px 1.5px rgba(0, 0, 0, 0.2), inset 0 0.8px 0 rgba(255, 255, 255, 0.2)",
            border: "0.5px solid rgba(0, 0, 0, 0.1)",
            width: "70%",
            height: "70%",
            margin: "auto",
            transform: "translateZ(0)",
          }}
        />
      ))}
    </div>
  );
}

const services = [
  {
    title: "Websites & Apps",
    description:
      "High-converting landing pages and full-stack applications. Built fast, built right.",
    type: "web",
  },
  {
    title: "AI Workflows",
    description:
      "Custom AI integrations and automation pipelines that save time and create leverage.",
    type: "ai",
  },
  {
    title: "Design Systems",
    description:
      "Scalable component libraries and brand systems that keep your product consistent.",
    type: "design",
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
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                background: "var(--color-canvas)",
                borderColor: "rgba(26, 22, 18, 0.08)",
                willChange: "transform, opacity",
              }}
            >
              {/* Graphical Box */}
              <div
                style={{
                  height: "180px",
                  background: "var(--color-canvas-elevated)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(26, 22, 18, 0.04)",
                  backgroundImage: "linear-gradient(rgba(26, 22, 18, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 22, 18, 0.015) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* 3D isometric viewport */}
                <div
                  style={{
                    transform: "perspective(800px) rotateX(18deg) rotateY(-18deg) rotateZ(3deg)",
                    transformStyle: "preserve-3d",
                    position: "relative",
                    width: "160px",
                    height: "120px",
                    willChange: "transform",
                  }}
                  className="flex items-center justify-center"
                >
                  {/* Baseplate */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "6px",
                      border: "2px solid var(--color-sand)",
                      background: "var(--color-canvas-elevated)",
                      backgroundImage: "radial-gradient(rgba(26, 22, 18, 0.06) 1.5px, transparent 1.5px)",
                      backgroundSize: "14px 14px",
                      boxShadow: "inset 0 1.5px 4px rgba(0,0,0,0.05), 0 6px 15px rgba(0,0,0,0.06)",
                      transform: "translateZ(-8px)",
                    }}
                  />

                  {/* Render type-specific graphic */}
                  {service.type === "web" && (
                    <>
                      {/* Stack of bricks propping browser */}
                      <div style={{ position: "absolute", left: "28px", top: "72px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={2} rows={1} color="var(--color-cobalt)" />
                      </div>
                      <div style={{ position: "absolute", left: "84px", top: "72px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={1} rows={1} color="var(--color-gold)" />
                      </div>

                      {/* Floating mini browser */}
                      <motion.div
                        className="absolute bg-white/95 border rounded shadow-md flex flex-col overflow-hidden"
                        style={{
                          left: "28px",
                          top: "20px",
                          width: "98px",
                          height: "60px",
                          borderColor: "rgba(26, 22, 18, 0.12)",
                          transform: "translateZ(18px)",
                        }}
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <div className="h-2.5 bg-gray-100 border-b border-gray-200 flex items-center px-1.5 gap-0.5">
                          <div className="w-0.5 h-0.5 rounded-full bg-red-400" />
                          <div className="w-0.5 h-0.5 rounded-full bg-yellow-400" />
                          <div className="w-0.5 h-0.5 rounded-full bg-green-400" />
                        </div>
                        <div className="p-1 flex-1 flex flex-col gap-0.5">
                          <div className="w-1/2 h-1 bg-gray-800 rounded" />
                          <div className="w-5/6 h-0.5 bg-gray-300 rounded" />
                          <div className="flex gap-0.5 mt-auto">
                            <div className="h-2 w-1/3 bg-blue-100 rounded" />
                            <div className="h-2 w-2/3 bg-blue-600 rounded" />
                          </div>
                        </div>
                      </motion.div>

                      {/* Floating detail piece */}
                      <motion.div
                        className="absolute"
                        style={{ right: "20px", top: "15px", transform: "translateZ(25px)" }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        <LegoBrick cols={1} rows={1} color="var(--color-gold)" style={{ opacity: 0.8 }} />
                      </motion.div>
                    </>
                  )}

                  {service.type === "ai" && (
                    <>
                      {/* Nodes connections paths */}
                      <svg className="absolute inset-0 w-full h-full">
                        <motion.path
                          d="M 44 34 C 44 60, 116 60, 116 84"
                          stroke="var(--color-cobalt)"
                          strokeWidth="1.5"
                          strokeDasharray="4 3"
                          fill="none"
                          initial={{ strokeDashoffset: 0 }}
                          animate={{ strokeDashoffset: [0, -10] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>

                      {/* Left chat node */}
                      <motion.div
                        className="absolute bg-white border shadow-md flex items-center justify-center p-1"
                        style={{
                          left: "20px",
                          top: "20px",
                          width: "48px",
                          height: "28px",
                          borderRadius: "4px",
                          borderColor: "rgba(22, 163, 74, 0.2)",
                          transform: "translateZ(10px)",
                        }}
                        animate={{ scale: [0.96, 1.04, 0.96] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mr-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <div className="w-5 h-0.5 bg-gray-400 rounded" />
                          <div className="w-7 h-0.5 bg-gray-300 rounded" />
                        </div>
                      </motion.div>

                      {/* Stacked modular brick in the center */}
                      <div style={{ position: "absolute", left: "70px", top: "52px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={1} rows={1} color="var(--color-ash)" />
                      </div>

                      {/* Right AI node */}
                      <motion.div
                        className="absolute bg-white border shadow-md flex items-center justify-center p-1"
                        style={{
                          right: "20px",
                          bottom: "20px",
                          width: "48px",
                          height: "28px",
                          borderRadius: "4px",
                          borderColor: "rgba(124, 58, 237, 0.2)",
                          transform: "translateZ(10px)",
                        }}
                        animate={{ scale: [1.04, 0.96, 1.04] }}
                        transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                      >
                        <div className="w-1.5 h-1.5 rounded bg-purple-500 animate-bounce mr-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <div className="w-6 h-0.5 bg-purple-600 rounded" />
                          <div className="w-4 h-0.5 bg-gray-300 rounded" />
                        </div>
                      </motion.div>
                    </>
                  )}

                  {service.type === "design" && (
                    <>
                      {/* Blueprint frame */}
                      <svg className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(2px)" }}>
                        <rect
                          x="22" y="26" width="116" height="68" rx="4"
                          stroke="var(--color-rust)"
                          strokeWidth="1"
                          strokeDasharray="4 3"
                          fill="none"
                          style={{ opacity: 0.6 }}
                        />
                      </svg>

                      {/* Stacked design components represented by bricks */}
                      {/* Row 1 (back) */}
                      <div style={{ position: "absolute", left: "30px", top: "35px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={2} rows={1} color="var(--color-cobalt)" />
                      </div>
                      <div style={{ position: "absolute", left: "62px", top: "35px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={2} rows={1} color="var(--color-gold)" />
                      </div>
                      <div style={{ position: "absolute", left: "94px", top: "35px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={1} rows={1} color="var(--color-rust)" />
                      </div>

                      {/* Row 2 (front) */}
                      <div style={{ position: "absolute", left: "30px", top: "68px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={2} rows={1} color="var(--color-ash)" />
                      </div>
                      <div style={{ position: "absolute", left: "62px", top: "68px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={2} rows={1} color="var(--color-slate-accent)" />
                      </div>
                      <div style={{ position: "absolute", left: "94px", top: "68px", transform: "translateZ(4px)" }}>
                        <LegoBrick cols={1} rows={1} color="var(--color-cobalt)" />
                      </div>

                      {/* Highlight Floating brick */}
                      <motion.div
                        className="absolute"
                        style={{ left: "62px", top: "35px", transform: "translateZ(18px)" }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <LegoBrick cols={2} rows={1} color="var(--color-gold)" />
                      </motion.div>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Description */}
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
