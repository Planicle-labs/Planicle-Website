"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
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
        ...style,
      }}
    >
      {studs.map((_, i) => (
        <div
          key={i}
          style={{
            background: "inherit",
            borderRadius: "50%",
            boxShadow: "0 1px 1.5px rgba(0, 0, 0, 0.25), inset 0 0.8px 0 rgba(255, 255, 255, 0.25)",
            border: "0.5px solid rgba(0, 0, 0, 0.12)",
            width: "70%",
            height: "70%",
            margin: "auto",
          }}
        />
      ))}
    </div>
  );
}

const stages = [
  {
    label: "FOUNDATION",
    heading: "Every great system starts with clarity.",
    body: "We map your goals, workflows, and operational needs into a clear technical foundation before a single line of code is written.",
    keywords: "Strategy · Research · User Flows · Architecture",
    deliverables: [
      "Technical Architecture Plan",
      "Interactive Wireframes & User Journeys",
      "Tech Stack & Dependency Selection"
    ]
  },
  {
    label: "DIGITAL PRESENCE",
    heading: "Designed to earn trust at first glance.",
    body: "We craft high-performance websites and product experiences that position your business clearly, build credibility, and convert attention into action.",
    keywords: "Brand Systems · UX · Frontend Engineering · Conversion",
    deliverables: [
      "Custom Design Tokens & System",
      "High-Fidelity Interactive Prototypes",
      "Production-Grade Responsive Frontend"
    ]
  },
  {
    label: "AUTOMATION",
    heading: "Systems that scale beyond manual work.",
    body: "From backend infrastructure to WhatsApp workflows and AI automations, we connect the tools, processes, and intelligence that keep your business moving efficiently.",
    keywords: "AI Workflows · WhatsApp Automation · APIs · Backend Systems",
    deliverables: [
      "Robust REST & GraphQL APIs",
      "Automated WhatsApp Notification Flows",
      "Custom AI Agents & LLM Integrations"
    ]
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const prefersReduced = useReducedMotion();

  // Scroll tracking across the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track change in scroll to update active stage
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 3 stages, divided into thirds: [0 - 0.33], (0.33 - 0.66], (0.66 - 1.0]
    if (latest < 0.33) {
      setActiveStage(0);
    } else if (latest < 0.66) {
      setActiveStage(1);
    } else {
      setActiveStage(2);
    }
  });

  // Smooth scroll progress indicators for visual/text details if needed
  const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      id="process"
      className="relative w-full"
      style={{
        height: prefersReduced ? "auto" : "200vh",
        background: "var(--color-canvas)",
        backgroundImage: "linear-gradient(rgba(26, 22, 18, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 22, 18, 0.02) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Sticky Inner Container */}
      <div
        className="w-full"
        style={{
          position: prefersReduced ? "relative" : "sticky",
          top: 0,
          height: prefersReduced ? "auto" : "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div className="container-narrow w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Section */}
          <div className="lg:col-span-5 flex flex-col justify-center py-12 lg:py-0">
            <SectionLabel>Our Process</SectionLabel>

            {/* Stepper Timeline & Text */}
            <div className="flex gap-6 lg:gap-8 items-start mt-4">
              
              {/* Stepper Vertical Bar */}
              {!prefersReduced && (
                <div 
                  className="hidden sm:flex flex-col items-center relative"
                  style={{ height: "240px", width: "16px", marginTop: "8px" }}
                >
                  {/* Background Track line */}
                  <div 
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "1.5px",
                      background: "rgba(26, 22, 18, 0.08)",
                      zIndex: 1,
                    }}
                  />
                  {/* Active Indicator line */}
                  <motion.div 
                    style={{
                      position: "absolute",
                      top: 0,
                      width: "1.5px",
                      height: indicatorHeight,
                      background: "var(--color-cobalt)",
                      zIndex: 2,
                    }}
                  />

                  {/* Step Nodes */}
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (containerRef.current) {
                          const rect = containerRef.current.getBoundingClientRect();
                          const scrollTop = window.scrollY + rect.top;
                          const stageHeight = rect.height / 3;
                          window.scrollTo({
                            top: scrollTop + stageHeight * idx + 50,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="flex items-center justify-center rounded-full border focus:outline-none transition-all duration-300"
                      style={{
                        position: "absolute",
                        top: idx === 0 ? "0%" : idx === 1 ? "50%" : "100%",
                        transform: "translateY(-50%)",
                        width: "24px",
                        height: "24px",
                        fontSize: "9px",
                        fontWeight: 600,
                        fontFamily: "var(--font-mono), monospace",
                        zIndex: 3,
                        background: activeStage === idx ? "var(--color-cobalt)" : "var(--color-canvas)",
                        color: activeStage === idx ? "var(--color-canvas)" : "var(--color-ink-secondary)",
                        borderColor: activeStage === idx ? "var(--color-cobalt)" : "rgba(26, 22, 18, 0.15)",
                        boxShadow: activeStage === idx ? "0 2px 8px rgba(27, 79, 216, 0.25)" : "none",
                        cursor: "pointer",
                      }}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* Text Container: Editorial Stages */}
              <div 
                className="flex-1 relative" 
                style={{ 
                  display: prefersReduced ? "flex" : "grid",
                  flexDirection: "column",
                  gap: prefersReduced ? "48px" : "0px",
                  gridTemplateColumns: "1fr",
                  gridTemplateRows: "1fr",
                  minHeight: prefersReduced ? "auto" : "280px",
                }}
              >
                {stages.map((stage, idx) => {
                  const isCurrent = prefersReduced || activeStage === idx;
                  
                  return (
                    <motion.div
                      key={idx}
                      style={{ 
                        gridArea: prefersReduced ? "auto" : "1 / 1 / 2 / 2",
                        alignSelf: "center",
                      }}
                      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                      animate={isCurrent ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Label */}
                      <span
                        className="font-mono text-xs font-semibold tracking-wider text-emerald-600 block mb-2"
                        style={{
                          color: "var(--color-cobalt)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {stage.label}
                      </span>

                      {/* Heading */}
                      <h3
                        className="font-display leading-tight tracking-tight mb-4"
                        style={{
                          fontSize: "clamp(26px, 3.5vw, 36px)",
                          fontWeight: 400,
                          color: "var(--color-ink)",
                          lineHeight: 1.2,
                        }}
                      >
                        {stage.heading}
                      </h3>

                      {/* Body */}
                      <p
                        className="font-body text-base lg:text-lg mb-6 max-w-lg"
                        style={{
                          color: "var(--color-ink-secondary)",
                          lineHeight: 1.6,
                        }}
                      >
                        {stage.body}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="flex flex-col gap-2.5 mb-6">
                        {stage.deliverables.map((item, dIdx) => (
                          <motion.div
                            key={dIdx}
                            className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                            initial={{ opacity: 0, x: -8 }}
                            animate={isCurrent ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                            transition={{ delay: 0.15 + dIdx * 0.1, duration: 0.4 }}
                          >
                            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-blue-600" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="2.5 6 4.5 8 9.5 3" />
                              </svg>
                            </span>
                            <span className="font-body text-sm text-gray-600 dark:text-gray-400">{item}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Supporting Keywords */}
                      <div
                        className="font-mono text-[11px] sm:text-xs pt-4"
                        style={{
                          borderTop: "1px solid rgba(26, 22, 18, 0.08)",
                          color: "var(--color-ink-tertiary)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {stage.keywords}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Right Column: Visual Stage Representation */}
          <div className="lg:col-span-7 flex justify-center items-center h-full relative py-8 lg:py-0">
            {/* Visualizer Frame */}
            <div
              className="relative w-full aspect-[4/3] max-w-[540px] rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "var(--color-canvas-elevated)",
                border: "1px solid rgba(26, 22, 18, 0.08)",
                boxShadow: "0 12px 40px rgba(26, 22, 18, 0.04)",
              }}
            >
              {/* Isometric Model Area */}
              <div
                style={{
                  transform: "perspective(1000px) rotateX(16deg) rotateY(-18deg) rotateZ(3deg)",
                  transformStyle: "preserve-3d",
                  position: "relative",
                  width: "360px",
                  height: "260px",
                }}
                className="flex items-center justify-center"
              >
                
                {/* Physical-feeling Studded Baseplate */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "8px",
                    border: "3px solid var(--color-sand)",
                    background: "var(--color-canvas-elevated)",
                    backgroundImage: "radial-gradient(rgba(26, 22, 18, 0.07) 2px, transparent 2px)",
                    backgroundSize: "20px 20px",
                    boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.06), 0 10px 25px rgba(0, 0, 0, 0.1)",
                    transform: "translateZ(-10px)",
                  }}
                />

                {/* Floating accent elements around the baseplate */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ left: "-40px", top: "10px", transform: "translateZ(30px)" }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LegoBrick cols={1} rows={1} color="var(--color-gold)" style={{ opacity: 0.25 }} />
                </motion.div>
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ right: "-30px", bottom: "20px", transform: "translateZ(30px)" }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LegoBrick cols={1} rows={1} color="var(--color-cobalt)" style={{ opacity: 0.2 }} />
                </motion.div>
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ left: "20px", bottom: "-30px", transform: "translateZ(30px)" }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LegoBrick cols={2} rows={1} color="var(--color-ash)" style={{ opacity: 0.15 }} />
                </motion.div>

                {/* ─────────────────── PERSISTENT LEGO TRAY & COLUMNS (MIGRATING) ─────────────────── */}
                
                {/* Tray Guideline */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{
                    left: "34px",
                    top: "134px",
                    width: "92px",
                    height: "64px",
                    border: "1.5px dashed rgba(26, 22, 18, 0.15)",
                    borderRadius: "6px",
                    background: "rgba(26, 22, 18, 0.01)",
                    transform: "translateZ(2px)",
                  }}
                  animate={{ opacity: activeStage === 0 ? 1 : 0.2 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Migrating Bricks */}
                {/* Brick A: Cobalt 2x1 */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ transform: "translateZ(12px)" }}
                  animate={{
                    left: activeStage === 0 ? 40 : 90,
                    top: activeStage === 0 ? 140 : 230,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14 }}
                >
                  <LegoBrick cols={2} rows={1} color="var(--color-cobalt)" />
                </motion.div>

                {/* Brick B: Gold 2x1 */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ transform: "translateZ(12px)" }}
                  animate={{
                    left: activeStage === 0 ? 70 : 90,
                    top: activeStage === 0 ? 140 : 216,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.05 }}
                >
                  <LegoBrick cols={2} rows={1} color="var(--color-gold)" />
                </motion.div>

                {/* Brick C: Rust 2x1 */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ transform: "translateZ(12px)" }}
                  animate={{
                    left: activeStage === 0 ? 40 : 210,
                    top: activeStage === 0 ? 170 : 230,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
                >
                  <LegoBrick cols={2} rows={1} color="var(--color-rust)" />
                </motion.div>

                {/* Brick D: Ash 2x1 */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ transform: "translateZ(12px)" }}
                  animate={{
                    left: activeStage === 0 ? 70 : 210,
                    top: activeStage === 0 ? 170 : 216,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
                >
                  <LegoBrick cols={2} rows={1} color="var(--color-ash)" />
                </motion.div>

                {/* Brick E: Slate 1x1 */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ transform: "translateZ(12px)" }}
                  animate={{
                    left: activeStage === 0 ? 100 : 95,
                    top: activeStage === 0 ? 140 : 202,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
                >
                  <LegoBrick cols={1} rows={1} color="var(--color-slate-accent)" />
                </motion.div>

                {/* Brick F: Cobalt 1x1 */}
                <motion.div
                  className="absolute pointer-events-none"
                  style={{ transform: "translateZ(12px)" }}
                  animate={{
                    left: activeStage === 0 ? 100 : 215,
                    top: activeStage === 0 ? 170 : 202,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.25 }}
                >
                  <LegoBrick cols={1} rows={1} color="var(--color-cobalt)" />
                </motion.div>


                {/* ─────────────────── STAGE 1: FOUNDATION VISUALS ─────────────────── */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeStage === 0 ? 1 : 0.15 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Grid guidelines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(5px)" }}>
                    {/* Architectural dashed guide borders */}
                    <motion.rect
                      x="20" y="20" width="320" height="220" rx="6"
                      stroke="var(--color-cobalt)"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      fill="none"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: activeStage === 0 ? [0, -20] : 0 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Dividing coordinate lines */}
                    <line x1="180" y1="20" x2="180" y2="240" stroke="rgba(27, 79, 216, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="20" y1="130" x2="340" y2="130" stroke="rgba(27, 79, 216, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  </svg>

                  {/* Centered structured blueprint panels */}
                  <div 
                    className="absolute border border-dashed rounded flex flex-col p-3"
                    style={{
                      left: "110px",
                      top: "60px",
                      width: "140px",
                      height: "110px",
                      borderColor: "rgba(27, 79, 216, 0.4)",
                      background: "rgba(27, 79, 216, 0.02)",
                      transform: "translateZ(15px)",
                    }}
                  >
                    <div className="w-1/2 h-2 bg-blue-300/30 rounded mb-2" />
                    <div className="w-5/6 h-1.5 bg-blue-300/20 rounded mb-1.5" />
                    <div className="w-4/6 h-1.5 bg-blue-300/20 rounded mb-3" />
                    <div className="w-full flex justify-between gap-2 mt-auto">
                      <div className="h-6 w-full bg-blue-200/20 border border-blue-400/20 rounded" />
                      <div className="h-6 w-full bg-blue-200/20 border border-blue-400/20 rounded" />
                    </div>
                  </div>
                </motion.div>


                {/* ─────────────────── STAGE 2: DIGITAL PRESENCE VISUALS ─────────────────── */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeStage === 1 ? 1 : activeStage === 2 ? 0.8 : 0,
                    scale: activeStage === 1 ? 1 : activeStage === 2 ? 1 : 0.95
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transform: "translateZ(20px)" }}
                >
                  {/* Layered browser window snapping together */}
                  <motion.div 
                    className="absolute bg-white/90 border rounded-lg shadow-lg flex flex-col overflow-hidden"
                    style={{
                      left: "60px",
                      top: "50px",
                      width: "240px",
                      height: "155px",
                      borderColor: "rgba(26, 22, 18, 0.12)",
                      backdropFilter: "blur(6px)",
                    }}
                    animate={activeStage === 1 ? { y: [15, 0], opacity: [0, 1] } : {}}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {/* Browser top bar */}
                    <div className="h-6 bg-gray-100/80 border-b border-gray-200/80 flex items-center px-3 gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                    {/* Browser Content */}
                    <div className="p-3 flex-1 flex flex-col gap-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-mono text-[7px] font-bold text-gray-800">PLANICLE.</div>
                        <div className="h-3 w-12 bg-blue-600 rounded flex items-center justify-center">
                          <span style={{ fontSize: "5px", color: "#fff", fontWeight: "bold" }}>LAUNCH</span>
                        </div>
                      </div>
                      
                      {/* Hero UI elements inside */}
                      <div className="w-2/3 h-3 bg-gray-900 rounded mb-1" />
                      <div className="w-5/6 h-2 bg-gray-400/30 rounded mb-2" />
                      
                      {/* Grid representation */}
                      <div className="grid grid-cols-3 gap-2 mt-auto">
                        <div className="h-10 border border-gray-200 bg-gray-50/50 rounded flex flex-col p-1 gap-1">
                          <div className="w-4 h-1 bg-blue-600 rounded" />
                          <div className="w-6 h-1 bg-gray-300 rounded" />
                          <div className="w-5 h-1 bg-gray-300 rounded" />
                        </div>
                        <div className="h-10 border border-gray-200 bg-gray-50/50 rounded flex flex-col p-1 gap-1">
                          <div className="w-3 h-1 bg-amber-500 rounded" />
                          <div className="w-6 h-1 bg-gray-300 rounded" />
                          <div className="w-5 h-1 bg-gray-300 rounded" />
                        </div>
                        <div className="h-10 border border-blue-200 bg-blue-50/20 rounded flex flex-col p-1 gap-1">
                          <div className="w-5 h-1 bg-blue-600 rounded" />
                          <div className="w-4 h-1 bg-gray-300 rounded" />
                          <div className="w-5 h-1 bg-gray-300 rounded" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Accompanying physical lego blocks snapping on top */}
                  <motion.div
                    className="absolute"
                    style={{ right: "35px", top: "35px", transform: "translateZ(30px)" }}
                    animate={activeStage === 1 ? { y: [-30, 0], opacity: [0, 1] } : {}}
                    transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.25 }}
                  >
                    <div className="brick" style={{ "--brick-color": "var(--color-cobalt)", "--brick-size": "20px" } as React.CSSProperties} />
                  </motion.div>
                  <motion.div
                    className="absolute"
                    style={{ right: "15px", top: "55px", transform: "translateZ(30px)" }}
                    animate={activeStage === 1 ? { y: [-30, 0], opacity: [0, 1] } : {}}
                    transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.35 }}
                  >
                    <div className="brick" style={{ "--brick-color": "var(--color-gold)", "--brick-size": "20px" } as React.CSSProperties} />
                  </motion.div>
                </motion.div>


                {/* ─────────────────── STAGE 3: AUTOMATION VISUALS ─────────────────── */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: activeStage === 2 ? 1 : 0,
                    scale: activeStage === 2 ? 1 : 0.9
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ transform: "translateZ(30px)" }}
                >
                  {/* Glowing Pipelines / Paths (SVGs) */}
                  <svg className="absolute inset-0 w-full h-full">
                    {/* Animated path 1: Left browser mock to Whatsapp node */}
                    <motion.path
                      d="M 120 130 C 120 180, 70 190, 70 210"
                      stroke="var(--color-cobalt)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      fill="none"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: activeStage === 2 ? [0, -20] : 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Animated path 2: Right browser mock to AI flow module */}
                    <motion.path
                      d="M 240 130 C 240 180, 290 190, 290 210"
                      stroke="var(--color-rust)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      fill="none"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: activeStage === 2 ? [0, -20] : 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Animated path 3: Backend connection */}
                    <motion.path
                      d="M 180 80 L 180 35"
                      stroke="var(--color-gold)"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                      fill="none"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: activeStage === 2 ? [0, 20] : 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    />
                  </svg>

                  {/* Flow Nodes */}
                  
                  {/* Whatsapp Node (Bottom Left) */}
                  <motion.div 
                    className="absolute bg-white border shadow-md flex items-center justify-center p-1.5"
                    style={{
                      left: "40px",
                      bottom: "20px",
                      width: "60px",
                      height: "36px",
                      borderRadius: "6px",
                      borderColor: "rgba(22, 163, 74, 0.3)",
                      transform: "translateZ(10px)",
                    }}
                    animate={activeStage === 2 ? { scale: [0.95, 1.05, 0.95] } : {}}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {/* Small whatsapp mock */}
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="flex flex-col gap-0.5">
                        <div className="w-6 h-1 bg-gray-400 rounded" />
                        <div className="w-8 h-1 bg-gray-300 rounded" />
                      </div>
                    </div>
                  </motion.div>

                  {/* AI Flow Module (Bottom Right) */}
                  <motion.div 
                    className="absolute bg-white border shadow-md flex items-center justify-center p-1.5"
                    style={{
                      right: "40px",
                      bottom: "20px",
                      width: "60px",
                      height: "36px",
                      borderRadius: "6px",
                      borderColor: "rgba(124, 58, 237, 0.3)",
                      transform: "translateZ(10px)",
                    }}
                    animate={activeStage === 2 ? { scale: [1.05, 0.95, 1.05] } : {}}
                    transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
                  >
                    {/* AI Spark/Flow icon */}
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded bg-purple-500 animate-bounce" />
                      <div className="flex flex-col gap-0.5">
                        <div className="w-8 h-1 bg-purple-600 rounded" />
                        <div className="w-5 h-1 bg-gray-300 rounded" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Backend System Database Node (Top Center) */}
                  <motion.div 
                    className="absolute bg-white border shadow-md flex flex-col p-1.5 items-center justify-center"
                    style={{
                      left: "150px",
                      top: "10px",
                      width: "60px",
                      height: "32px",
                      borderRadius: "4px",
                      borderColor: "rgba(232, 184, 75, 0.4)",
                      transform: "translateZ(10px)",
                    }}
                  >
                    <div className="w-8 h-1.5 bg-amber-500 rounded mb-0.5" />
                    <div className="w-10 h-1 bg-gray-300 rounded" />
                  </motion.div>

                  {/* Central Hub representing active machinery (overlaying browser) */}
                  <div
                    className="absolute bg-white/40 border shadow-lg flex items-center justify-center"
                    style={{
                      left: "145px",
                      top: "115px",
                      width: "70px",
                      height: "40px",
                      borderRadius: "6px",
                      borderColor: "rgba(27, 79, 216, 0.2)",
                      backdropFilter: "blur(2px)",
                      transform: "translateZ(25px)",
                    }}
                  >
                    <div className="relative w-6 h-6">
                      {/* Rotating mechanical gear */}
                      <motion.svg
                        className="w-full h-full text-blue-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        animate={{ rotate: activeStage === 2 ? 360 : 0 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
                      </motion.svg>
                    </div>
                  </div>

                </motion.div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
