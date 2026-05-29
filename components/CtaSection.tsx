"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Brick {
  row: number;
  col: number;
  color: string;
}

const COLORS = ["cobalt", "gold", "rust", "slate", "sand"];
const COLOR_MAP: Record<string, string> = {
  cobalt: "var(--color-cobalt)",
  gold: "var(--color-gold)",
  rust: "var(--color-rust)",
  slate: "var(--color-slate-accent)",
  sand: "var(--color-sand)",
};

const INITIAL_BRICKS: Brick[] = [
  { row: 5, col: 0, color: "cobalt" },
  { row: 5, col: 1, color: "cobalt" },
  { row: 5, col: 2, color: "gold" },
  { row: 5, col: 3, color: "cobalt" },
  { row: 4, col: 1, color: "rust" },
  { row: 4, col: 2, color: "slate" },
];

export function CtaSection() {
  const [placedBricks, setPlacedBricks] = useState<Brick[]>(INITIAL_BRICKS);

  const handlePlaceBrick = () => {
    // Find next available slot scanning bottom-to-top, left-to-right
    for (let r = 5; r >= 0; r--) {
      for (let c = 0; c < 6; c++) {
        const isOccupied = placedBricks.some((b) => b.row === r && b.col === c);
        if (!isOccupied) {
          const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
          setPlacedBricks((prev) => [...prev, { row: r, col: c, color: randomColor }]);
          return;
        }
      }
    }
  };

  const handleReset = () => {
    setPlacedBricks(INITIAL_BRICKS);
  };

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#0B0F17",
        color: "var(--color-canvas)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(245, 242, 237, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 242, 237, 0.02) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          pointerEvents: "none",
          opacity: 0.8,
        }}
        aria-hidden="true"
      />

      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Call to Action Details (60%) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <span
              className="font-mono text-xs font-semibold tracking-wider uppercase mb-4"
              style={{ color: "var(--color-gold)" }}
            >
              // PROJECT COMMENCEMENT
            </span>

            <h2
              className="font-display leading-tight tracking-tight mb-6"
              style={{
                fontSize: "clamp(32px, 4.5vw, 48px)",
                fontWeight: 400,
                color: "var(--color-canvas)",
                maxWidth: "20ch",
              }}
            >
              Let's assemble your digital authority.
            </h2>

            <p
              className="font-body text-base lg:text-lg mb-10"
              style={{
                color: "rgba(245, 242, 237, 0.75)",
                lineHeight: 1.65,
                maxWidth: "50ch",
              }}
            >
              No layers of overhead. No cookie-cutter templates. Just two elite builders shipping premium, launch-ready systems at startup speed. Let's start the build.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20to%20start%20a%20project%20with%20Planicle"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center font-body text-sm font-bold uppercase tracking-wider px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--color-cobalt)",
                  color: "var(--color-canvas)",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Start Your Project
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>

              <a
                href="https://wa.me/917678455973?text=Hi%2C%20I%20want%20to%20book%20a%20strategy%20call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-body text-sm font-semibold uppercase tracking-wider px-8 py-4 transition-all duration-300 hover:bg-white/5"
                style={{
                  background: "transparent",
                  color: "var(--color-canvas)",
                  border: "1px solid rgba(245, 242, 237, 0.2)",
                  borderRadius: "4px",
                  textDecoration: "none",
                }}
              >
                Book a Strategy Call
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Sandbox Baseplate (40%) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              className="w-full max-w-[340px] aspect-square p-6 rounded-xl flex flex-col items-center justify-between"
              style={{
                background: "rgba(245, 242, 237, 0.02)",
                border: "1px solid rgba(245, 242, 237, 0.06)",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
              }}
            >
              {/* The LEGO baseplate (6x6 grid) */}
              <div
                className="p-3 rounded-lg relative"
                style={{
                  background: "#0B0F17",
                  border: "2px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)",
                  width: "220px",
                  height: "220px",
                }}
              >
                <div className="relative w-full h-full">
                  {/* Render Placed Bricks absolute positioned */}
                  <AnimatePresence>
                    {placedBricks.map((brick) => {
                      const color = COLOR_MAP[brick.color] || "var(--color-cobalt)";
                      
                      // Grid placement mapping (centered inside cells of the 196px grid)
                      const left = `calc(${brick.col} * (100% / 6) + 2px)`;
                      const top = `calc(${brick.row} * (100% / 6) + 2px)`;
                      
                      return (
                        <motion.div
                          key={`brick-${brick.row}-${brick.col}`}
                          initial={{ scale: 0.3, y: -40, opacity: 0 }}
                          animate={{ scale: 1, y: 0, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            type: "tween",
                            ease: [0.16, 1, 0.3, 1],
                            duration: 0.35,
                          }}
                          style={{
                            position: "absolute",
                            left,
                            top,
                            width: "28px",
                            height: "28px",
                            zIndex: 10,
                          }}
                        >
                          <div
                            className="brick"
                            style={{
                              "--brick-color": color,
                              "--brick-size": "28px",
                              width: "28px",
                              height: "28px",
                            } as React.CSSProperties}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sandbox Controls */}
              <div className="flex gap-4 mt-4 w-full justify-center">
                <button
                  onClick={handlePlaceBrick}
                  disabled={placedBricks.length >= 36}
                  className="font-mono text-[10px] font-bold tracking-wider text-gray-400 hover:text-white uppercase transition-colors cursor-pointer focus:outline-none"
                >
                  [+ PLACE BRICK]
                </button>
                
                {placedBricks.length > INITIAL_BRICKS.length && (
                  <button
                    onClick={handleReset}
                    className="font-mono text-[10px] font-bold tracking-wider text-red-400 hover:text-red-300 uppercase transition-colors cursor-pointer focus:outline-none"
                  >
                    [RESET GRID]
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
