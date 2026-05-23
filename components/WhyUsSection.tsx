"use client";

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionLabel } from "./SectionLabel";

type PillarId = "investor-ready" | "zero-worry" | "momentum";

interface Pillar {
  id: PillarId;
  label: string;
  metric: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    id: "investor-ready",
    label: "Investor-Ready Polish",
    metric: "First Impression",
    title: "Look institutional from day one.",
    description: "First impressions are permanent. We design premium, custom interfaces that make your startup look like an industry leader, instantly earning investor trust and customer confidence.",
  },
  {
    id: "zero-worry",
    label: "Zero Technical Worry",
    metric: "Built to Last",
    title: "A foundation that won't break.",
    description: "No shortcuts, no fragile templates. We build clean, modular architectures that grow with you. When your users scale from 10 to 10,000, your software remains fast and stable.",
  },
  {
    id: "momentum",
    label: "Absolute Momentum",
    metric: "Launch in 4 Wks",
    title: "Launch while your market is hot.",
    description: "We ship a production-ready, custom MVP in 28 days by running parallel design and development modules, helping you capture momentum when it matters most.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function WhyUsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();
  const [activePillar, setActivePillar] = useState<PillarId>("investor-ready");

  // Interaction states for visuals
  const [isWallCompleted, setIsWallCompleted] = useState(false);
  const [isRocketHovered, setIsRocketHovered] = useState(false);
  const [dashboardTrigger, setDashboardTrigger] = useState(0);

  // Trigger animations on tab change
  useEffect(() => {
    if (activePillar === "investor-ready") {
      setDashboardTrigger((prev) => prev + 1);
    } else {
      setIsWallCompleted(false);
      setIsRocketHovered(false);
    }
  }, [activePillar]);

  return (
    <section
      id="why-us"
      className="section-padding"
      style={{
        background: "var(--color-canvas)",
        position: "relative",
      }}
    >
      <div className="container-narrow" ref={containerRef}>
        <SectionLabel>Why Planicle</SectionLabel>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-6">
          
          {/* Left Column: Editorial & Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={prefersReduced ? false : "hidden"}
              animate={isInView ? "visible" : "hidden"}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2
                className="font-display leading-tight tracking-tight animate-fade-in"
                style={{
                  fontSize: "clamp(32px, 4.5vw, 48px)",
                  fontWeight: 400,
                  color: "var(--color-ink)",
                  margin: 0,
                  maxWidth: "16ch",
                }}
              >
                Build what investors
                <br />
                and customers believe in.
              </h2>

              <p
                className="font-body text-base lg:text-lg"
                style={{
                  color: "var(--color-ink-secondary)",
                  marginTop: "20px",
                  lineHeight: 1.65,
                  maxWidth: "48ch",
                }}
              >
                We help founders turn raw ideas into software that feels expensive, commands trust, and scales effortlessly. You focus on the business; we build the technical foundation that makes it real.
              </p>
            </motion.div>

            {/* Vertical Tab selectors */}
            <div className="flex flex-col gap-4 mt-10 w-full">
              {pillars.map((pillar) => {
                const isActive = activePillar === pillar.id;

                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActivePillar(pillar.id)}
                    className="group relative flex flex-col text-left p-5 rounded-lg border transition-all duration-300 focus:outline-none cursor-pointer hover:bg-[rgba(26,22,18,0.02)] hover:border-[rgba(26,22,18,0.08)] hover:translate-x-1"
                    style={{
                      background: isActive ? "var(--color-canvas-elevated)" : "transparent",
                      borderColor: isActive ? "rgba(26, 22, 18, 0.08)" : "transparent",
                    }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePillarBorder"
                        className="absolute inset-0 rounded-lg border-2 pointer-events-none"
                        style={{ borderColor: "var(--color-cobalt)" }}
                        transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-body text-xs font-semibold tracking-wider uppercase"
                        style={{
                          color: isActive ? "var(--color-cobalt)" : "var(--color-ink-tertiary)",
                        }}
                      >
                        {pillar.label}
                      </span>
                      <span
                        className="font-mono text-sm font-medium flex items-center gap-1.5 transition-colors duration-300 group-hover:text-[var(--color-cobalt)]"
                        style={{
                          color: isActive ? "var(--color-cobalt)" : "var(--color-ink-secondary)",
                        }}
                      >
                        {pillar.metric}
                        <span 
                          className="transition-transform duration-300"
                          style={{
                            transform: isActive ? "translateX(0)" : "translateX(-2px)",
                            opacity: isActive ? 1 : 0.4,
                          }}
                        >
                          →
                        </span>
                      </span>
                    </div>

                    <h3
                      className="font-body text-base font-semibold"
                      style={{
                        color: "var(--color-ink)",
                        margin: 0,
                      }}
                    >
                      {pillar.title}
                    </h3>
                    
                    <p
                      className="font-body text-sm mt-1.5 leading-relaxed"
                      style={{
                        color: "var(--color-ink-secondary)",
                        opacity: isActive ? 1 : 0.8,
                        maxHeight: isActive ? "200px" : "0px",
                        overflow: "hidden",
                        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {pillar.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Visualization Panel */}
          <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[460px] lg:min-h-[500px]">
            <div
              className="relative w-full aspect-[4/3] rounded-xl flex flex-col items-center justify-center p-8 overflow-hidden select-none"
              style={{
                background: "var(--color-canvas-elevated)",
                border: "1px solid rgba(26, 22, 18, 0.08)",
                boxShadow: "0 12px 40px rgba(26, 22, 18, 0.04)",
              }}
            >
              
              {/* 1. INVESTOR-READY POLISH (Growth Dashboard Mockup) */}
              {activePillar === "investor-ready" && (
                <motion.div
                  key="investor-ready"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                      PREMIUM DASHBOARD DEMO
                    </span>
                    <span className="font-mono text-[10px] text-amber-600 font-bold tracking-wide">
                      EXPONENTIAL TRACTION
                    </span>
                  </div>

                  {/* Browser Mockup Box */}
                  <div className="flex-1 bg-white border border-gray-200/80 rounded-lg shadow-sm overflow-hidden flex flex-col">
                    {/* Browser Header */}
                    <div className="h-7 bg-gray-50 border-b border-gray-150 flex items-center px-4 gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <div className="mx-auto bg-gray-200/50 rounded px-8 py-0.5 text-[8px] font-mono text-gray-400 uppercase tracking-wider">
                        localhost:3000/dashboard
                      </div>
                    </div>

                    {/* Dashboard Inner content */}
                    <div className="p-6 flex-1 flex flex-col justify-between relative">
                      {/* Metric Card Overlay */}
                      <div className="absolute top-4 left-6 flex flex-col">
                        <span className="font-mono text-[9px] text-gray-400 uppercase">MONTHLY ACTIVE USERS</span>
                        <span className="font-display text-2xl text-gray-800 font-semibold tracking-tight">+342% MAU</span>
                      </div>

                      {/* Sparkle star */}
                      <div className="absolute top-4 right-6 animate-pulse">
                        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.4-6.2-4.6-6.2 4.6 2.3-7.4-6.1-4.5h7.6z" />
                        </svg>
                      </div>

                      {/* Growing LEGO chart columns */}
                      <div className="flex items-end justify-center gap-4 flex-1 mt-12 pb-4">
                        {[
                          { height: 1, color: "var(--color-ash)" },
                          { height: 2, color: "var(--color-ash)" },
                          { height: 3, color: "var(--color-cobalt)" },
                          { height: 4, color: "var(--color-cobalt)" },
                          { height: 6, color: "var(--color-gold)" },
                        ].map((col, idx) => (
                          <div key={idx} className="flex flex-col-reverse gap-0.5 items-center">
                            {Array.from({ length: col.height }).map((_, brickIdx) => (
                              <motion.div
                                key={`${dashboardTrigger}-${brickIdx}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  duration: 0.35,
                                  ease: [0.16, 1, 0.3, 1],
                                  delay: prefersReduced ? 0 : (idx * 100 + brickIdx * 40) / 1000,
                                }}
                                className="brick"
                                style={{
                                  "--brick-color": col.color,
                                  "--brick-size": "16px",
                                  width: "28px",
                                  height: "14px",
                                } as React.CSSProperties}
                              />
                            ))}
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. ZERO TECHNICAL WORRY (Interlocking Wall Snap) */}
              {activePillar === "zero-worry" && (
                <motion.div
                  key="zero-worry"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col justify-between"
                  onMouseEnter={() => setIsWallCompleted(true)}
                  onMouseLeave={() => setIsWallCompleted(false)}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                      FOUNDATION INTEGRITY
                    </span>
                    <span className="font-mono text-xs text-gray-400">
                      Hover to snap final brick
                    </span>
                  </div>

                  {/* Interlocking Wall Frame */}
                  <div className="flex-1 flex flex-col items-center justify-center relative p-6 bg-white border border-gray-200/80 rounded-lg shadow-sm">
                    
                    {/* Visualizer Area */}
                    <div className="relative w-[180px] h-[160px] flex flex-col justify-end">
                      
                      {/* Main Solid Wall (Stack of rows) */}
                      <div className="flex flex-col gap-1 items-center">
                        {/* Row 3 (Top) */}
                        <div className="flex gap-1">
                          <div className="brick" style={{ "--brick-color": "var(--color-slate-accent)", "--brick-size": "24px", width: "56px", height: "22px" } as React.CSSProperties} />
                          
                          {/* Empty space for the gold brick (width: 56px, gap: 1) */}
                          <div className="w-[56px] h-[22px] relative">
                            {/* Dotted blueprint placeholder outline (turns solid green when secured) */}
                            <div 
                              className="absolute inset-0 border rounded transition-all duration-300" 
                              style={{
                                borderStyle: isWallCompleted ? "solid" : "dashed",
                                borderColor: isWallCompleted ? "rgba(16, 185, 129, 0.4)" : "#D1D5DB",
                                background: isWallCompleted ? "rgba(16, 185, 129, 0.05)" : "transparent",
                              }}
                            />
                            
                            {/* Gold Glow behind brick when snapped */}
                            <div
                              className="absolute inset-0 rounded bg-amber-400/20 blur-md pointer-events-none transition-all duration-300"
                              style={{
                                opacity: isWallCompleted ? 1 : 0,
                                transform: isWallCompleted ? "scale(1.2)" : "scale(0.8)",
                              }}
                            />

                            {/* Dynamic status/precision label */}
                            <span 
                              className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 shadow-sm"
                              style={{
                                background: isWallCompleted ? "var(--color-cobalt)" : "#FFFBEB",
                                color: isWallCompleted ? "#FFFFFF" : "#D97706",
                                border: isWallCompleted ? "1px solid var(--color-cobalt)" : "1px solid #FDE68A",
                              }}
                            >
                              {isWallCompleted ? "✓ SECURED FOUNDATION" : "PRECISION FIT"}
                            </span>

                            {/* Sparkle Burst Animation */}
                            {isWallCompleted && (
                              <div className="absolute inset-0 pointer-events-none z-20">
                                {/* Sparkle 1 */}
                                <motion.div
                                  initial={{ x: 28, y: 11, scale: 0, opacity: 1 }}
                                  animate={{ x: -10, y: -25, scale: 1, opacity: 0 }}
                                  transition={{ duration: 0.55, ease: "easeOut" }}
                                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
                                />
                                {/* Sparkle 2 */}
                                <motion.div
                                  initial={{ x: 28, y: 11, scale: 0, opacity: 1 }}
                                  animate={{ x: 66, y: -25, scale: 1, opacity: 0 }}
                                  transition={{ duration: 0.55, ease: "easeOut" }}
                                  className="absolute w-2 h-2 rounded bg-yellow-400 rotate-45"
                                />
                                {/* Sparkle 3 */}
                                <motion.div
                                  initial={{ x: 28, y: 11, scale: 0, opacity: 1 }}
                                  animate={{ x: 5, y: -45, scale: 1, opacity: 0 }}
                                  transition={{ duration: 0.65, ease: "easeOut" }}
                                  className="absolute w-1 h-1 rounded-full bg-amber-300"
                                />
                                {/* Sparkle 4 */}
                                <motion.div
                                  initial={{ x: 28, y: 11, scale: 0, opacity: 1 }}
                                  animate={{ x: 51, y: -45, scale: 1, opacity: 0 }}
                                  transition={{ duration: 0.65, ease: "easeOut" }}
                                  className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300"
                                />
                                {/* Sparkle 5 */}
                                <motion.div
                                  initial={{ x: 28, y: 11, scale: 0, opacity: 1 }}
                                  animate={{ x: 28, y: -50, scale: 1.2, opacity: 0 }}
                                  transition={{ duration: 0.55, ease: "easeOut" }}
                                  className="absolute w-2 h-2 rounded-full bg-amber-400"
                                />
                              </div>
                            )}

                            {/* Sliding gold brick */}
                            <div
                              style={{
                                position: "absolute",
                                left: 0,
                                top: 0,
                                transform: isWallCompleted ? "translateY(0)" : "translateY(-80px)",
                                opacity: 1,
                                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                                zIndex: 10,
                                pointerEvents: "none",
                              }}
                            >
                              <div
                                className="brick shadow-lg"
                                style={{
                                  "--brick-color": "var(--color-gold)",
                                  "--brick-size": "24px",
                                  width: "56px",
                                  height: "22px",
                                } as React.CSSProperties}
                              />
                            </div>
                          </div>
                          
                          <div className="brick" style={{ "--brick-color": "var(--color-slate-accent)", "--brick-size": "24px", width: "56px", height: "22px" } as React.CSSProperties} />
                        </div>

                        {/* Row 2 (Middle) */}
                        <div className="flex gap-1">
                          <div className="brick" style={{ "--brick-color": "var(--color-cobalt)", "--brick-size": "24px", width: "86px", height: "22px" } as React.CSSProperties} />
                          <div className="brick" style={{ "--brick-color": "var(--color-cobalt)", "--brick-size": "24px", width: "86px", height: "22px" } as React.CSSProperties} />
                        </div>

                        {/* Row 1 (Bottom Baseplate) */}
                        <div className="flex gap-1">
                          <div className="brick" style={{ "--brick-color": "var(--color-ash)", "--brick-size": "24px", width: "56px", height: "22px" } as React.CSSProperties} />
                          <div className="brick" style={{ "--brick-color": "var(--color-ash)", "--brick-size": "24px", width: "56px", height: "22px" } as React.CSSProperties} />
                          <div className="brick" style={{ "--brick-color": "var(--color-ash)", "--brick-size": "24px", width: "56px", height: "22px" } as React.CSSProperties} />
                        </div>
                      </div>

                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. ABSOLUTE MOMENTUM (Launch Rocket) */}
              {activePillar === "momentum" && (
                <motion.div
                  key="momentum"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full flex flex-col justify-between"
                  onMouseEnter={() => setIsRocketHovered(true)}
                  onMouseLeave={() => setIsRocketHovered(false)}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                      VELOCITY LAUNCH SIMULATOR
                    </span>
                    <span className="font-mono text-xs text-gray-400">
                      Hover to launch MVP
                    </span>
                  </div>

                  {/* Launch Chamber Frame */}
                  <div className="flex-1 bg-white border border-gray-200/80 rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center p-6 relative">
                    
                    {/* Launchpad Grid Lines */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(26,22,18,0.02)_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

                    {/* Rocket Container */}
                    <div 
                      className="relative flex flex-col items-center"
                      style={{
                        transform: isRocketHovered ? "translateY(-48px)" : "translateY(0px)",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {/* Nosecone */}
                      <div className="brick" style={{ "--brick-color": "var(--color-rust)", "--brick-size": "24px", width: "24px", height: "24px" } as React.CSSProperties} />

                      {/* Cockpit / Window */}
                      <div className="brick" style={{ "--brick-color": "var(--color-gold)", "--brick-size": "24px", width: "24px", height: "24px" } as React.CSSProperties} />

                      {/* Main Body */}
                      <div className="brick" style={{ "--brick-color": "var(--color-cobalt)", "--brick-size": "24px", width: "24px", height: "24px" } as React.CSSProperties} />

                      {/* Wings / Side Fins */}
                      <div className="flex gap-1.5 justify-center items-end -mt-0.5">
                        <div className="brick" style={{ "--brick-color": "var(--color-ash)", "--brick-size": "20px", width: "16px", height: "24px" } as React.CSSProperties} />
                        <div className="brick" style={{ "--brick-color": "var(--color-cobalt)", "--brick-size": "24px", width: "24px", height: "24px" } as React.CSSProperties} />
                        <div className="brick" style={{ "--brick-color": "var(--color-ash)", "--brick-size": "20px", width: "16px", height: "24px" } as React.CSSProperties} />
                      </div>

                      {/* Rocket Engines */}
                      <div className="flex gap-1 justify-center -mt-0.5">
                        <div className="brick" style={{ "--brick-color": "var(--color-rust)", "--brick-size": "16px", width: "12px", height: "12px" } as React.CSSProperties} />
                        <div className="brick" style={{ "--brick-color": "var(--color-rust)", "--brick-size": "16px", width: "12px", height: "12px" } as React.CSSProperties} />
                      </div>
                    </div>

                    {/* Launch Smoke & Fire Particles */}
                    <div 
                      className="absolute bottom-12 flex gap-1 items-center justify-center pointer-events-none"
                      style={{
                        opacity: isRocketHovered ? 1 : 0,
                        transform: isRocketHovered ? "scale(1.1) translateY(0px)" : "scale(0.8) translateY(10px)",
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                      <div className="w-5 h-5 rounded-full bg-amber-400 blur-[1px] animate-pulse" />
                      <div className="w-4 h-4 rounded-full bg-orange-500 animate-bounce" />
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    </div>

                    {/* Status Text overlay */}
                    <span 
                      className="absolute bottom-6 font-mono text-[9px] text-emerald-600 font-bold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded shadow-sm"
                      style={{
                        opacity: isRocketHovered ? 1 : 0,
                        transform: isRocketHovered ? "translateY(0)" : "translateY(5px)",
                        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      T-MINUS SHIPPED: SUCCESS
                    </span>

                  </div>
                </motion.div>
              )}

            </div>
          </div>

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
