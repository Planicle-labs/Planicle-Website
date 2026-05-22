"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

// Authentic LEGO Starry Night palette
const PALETTE = [
  "#06193F", // 0: Earth Blue (Midnight sky base)
  "#008F9B", // 1: Dark Turquoise (Shadowed Swirls)
  "#36AEBF", // 2: Medium Azure (Swirl & Glow)
  "#9DC3E6", // 3: Bright Light Blue (Highlight Swirls)
  "#FDF38C", // 4: Cool Yellow (Moon & Stars)
  "#05131D", // 5: Black (Cypress & Shadows)
];

const COLS = 128;
const ROWS = 102;

// Star positions [nx, ny] normalized 0-1
const STARS: [number, number][] = [
  [0.2, 0.1],
  [0.6, 0.15],
  [0.35, 0.25],
  [0.75, 0.12],
  [0.45, 0.08],
  [0.88, 0.28],
];

// Moon center normalized
const MOON_CX = 0.8;
const MOON_CY = 0.18;
const MOON_R = 0.08;

function getColor(x: number, y: number): number {
  const nx = x / COLS;
  const ny = y / ROWS;

  // --- 1. Foreground Cypress (Black #05131D) ---
  if (ny > 0.3) {
    const cypressCenter = 0.15;
    const widthAtBase = 0.08;
    const widthAtTop = 0.02;
    const treeNy = (ny - 0.3) / 0.7;
    const width = widthAtTop + (widthAtBase - widthAtTop) * treeNy;
    // Flame-like wobble
    const wobble = Math.sin(ny * 25) * 0.015;
    if (Math.abs(nx - cypressCenter - wobble) < width) {
      return 5;
    }
  }

  // --- 2. Moon (Cool Yellow #FDF38C) ---
  const dx = nx - MOON_CX;
  const dy = (ny - MOON_CY) * (COLS / ROWS); // Adjust for aspect ratio
  const moonDist = Math.sqrt(dx * dx + dy * dy);

  // Crescent shape
  const moonInnerDist = Math.sqrt((dx + 0.03) ** 2 + (dy - 0.02) ** 2);
  if (moonDist <= MOON_R && moonInnerDist > MOON_R * 0.85) {
    return 4;
  }

  // --- 3. Stars (Cool Yellow #FDF38C) ---
  for (const [sx, sy] of STARS) {
    const sdx = nx - sx;
    const sdy = (ny - sy) * (COLS / ROWS);
    const d = Math.sqrt(sdx * sdx + sdy * sdy);
    if (d < 0.012) return 4;
    // Star glow/halo
    if (d < 0.035 && Math.sin(d * 150) > 0.4) return 2;
  }

  // --- 4. Rolling Hills (Earth Blue #06193F base) ---
  if (ny > 0.65) {
    const hillLine =
      0.7 + Math.sin(nx * 6) * 0.04 + Math.sin(nx * 12 + 1) * 0.02;
    if (ny > hillLine) {
      // Hills use darker tones
      return Math.sin(nx * 20 + ny * 10) > 0 ? 0 : 5;
    }
  }

  // --- 5. Sky Swirls (Medium Azure, Bright Light Blue, Dark Turquoise) ---
  // Multiple overlapping sine waves create the characteristic Van Gogh swirls
  const swirl1 =
    Math.sin(nx * 10 + ny * 3 + Math.sin(ny * 5) * 2.5) * 0.5 + 0.5;
  const swirl2 = Math.sin(nx * 7 - ny * 5 + Math.cos(nx * 8) * 1.8) * 0.5 + 0.5;

  const combined = swirl1 * 0.6 + swirl2 * 0.4;

  // Map combined value to sky palette (0-3)
  if (combined > 0.85) return 3; // Brightest highlights
  if (combined > 0.65) return 2; // Mid-tones
  if (combined > 0.45) return 1; // Deep azure/turquoise
  return 0; // Earth Blue base
}

function generateGrid(): number[][] {
  const grid: number[][] = [];
  for (let y = 0; y < ROWS; y++) {
    const row: number[] = [];
    for (let x = 0; x < COLS; x++) {
      row.push(getColor(x, y));
    }
    grid.push(row);
  }
  return grid;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

interface StarryNightMosaicProps {
  brickSize?: number;
  gap?: number;
  className?: string;
}

export function StarryNightMosaic({
  brickSize = 14,
  gap = 1,
  className = "",
}: StarryNightMosaicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animFrameRef = useRef<number>(0);
  const grid = useMemo(() => generateGrid(), []);

  const cellSize = brickSize + gap;
  const canvasWidth = COLS * cellSize;
  const canvasHeight = ROWS * cellSize;

  const drawBrick = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      colorIdx: number,
      scale: number,
    ) => {
      const [r, g, b] = hexToRgb(PALETTE[colorIdx]);
      const px = x * cellSize;
      const py = y * cellSize;
      const s = brickSize * scale;
      const offset = (brickSize - s) / 2;

      // Brick body
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.beginPath();
      ctx.roundRect(px + offset, py + offset, s, s, 2 * scale);
      ctx.fill();

      // Bottom shadow
      ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
      ctx.fillRect(px + offset, py + offset + s - 1.5 * scale, s, 1.5 * scale);

      // Top highlight
      ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
      ctx.fillRect(px + offset, py + offset, s, 1 * scale);

      // Stud (circular bump)
      const studR = s * 0.28;
      const cx = px + offset + s / 2;
      const cy = py + offset + s / 2;

      ctx.beginPath();
      ctx.arc(cx, cy, studR, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill();

      // Stud shadow
      ctx.beginPath();
      ctx.arc(cx, cy, studR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 0, 0, 0.25)`;
      ctx.lineWidth = 0.5 * scale;
      ctx.stroke();

      // Stud highlight
      ctx.beginPath();
      ctx.arc(cx - studR * 0.2, cy - studR * 0.2, studR * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.15)`;
      ctx.fill();
    },
    [brickSize, cellSize],
  );

  // IntersectionObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !grid || !isVisible) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // HiDPI support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);

    const animDuration = 1800; // ms
    const staggerPerBrick = animDuration / (COLS + ROWS);
    let startTime: number | null = null;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx!.fillStyle = "#05131D"; // Dark background
      ctx!.fillRect(0, 0, canvasWidth, canvasHeight);

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const delay = (x + y) * staggerPerBrick * 0.6;
          const progress = Math.min(Math.max((elapsed - delay) / 400, 0), 1);

          if (progress <= 0) continue;

          // Ease out expo
          const eased = 1 - Math.pow(1 - progress, 3);
          drawBrick(ctx!, x, y, grid![y][x], eased);
        }
      }

      if (elapsed < animDuration + 800) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible, canvasWidth, canvasHeight, drawBrick, grid]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        maxWidth: canvasWidth,
        height: "auto",
        aspectRatio: `${COLS} / ${ROWS}`,
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        background: "#05131D",
      }}
      role="img"
      aria-label="Starry Night LEGO brick mosaic"
    />
  );
}
