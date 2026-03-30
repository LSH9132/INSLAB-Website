"use client";

import type { MotionValue } from "motion/react";
import { type MutableRefObject, useEffect, useRef } from "react";

/* ── Grid constants ── */

const COLS = 24;
const ROWS = 12;
const VIEW_W = 1200;
const VIEW_H = 380;
const SPACING_X = VIEW_W / (COLS + 1);
const SPACING_Y = VIEW_H / (ROWS + 1);
const BASE_R = 1.5;
const BASE_OPACITY = 0.08;

/* Mouse interaction */
const MOUSE_RADIUS = 160;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MAX_SCALE = 3.2;
const REPEL_STRENGTH = 14;

/* Autonomous ripples */
const RIPPLE_SPEED = 130;
const RIPPLE_WIDTH = 65;
const RIPPLE_ORIGINS = [
  { x: 180, y: 100, period: 6.5 },
  { x: 950, y: 300, period: 7.5 },
  { x: 550, y: 50, period: 8.0 },
];

/* Color tiers: base → near cursor */
const COLOR_TIERS = [
  "#059669", // emerald-600 (base)
  "#10b981", // emerald-500
  "#34d399", // emerald-400
  "#f59e0b", // amber-500
];

/* ── Pre-computed data ── */

type DotData = { baseX: number; baseY: number };

const DOTS: DotData[] = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    DOTS.push({
      baseX: (col + 1) * SPACING_X,
      baseY: (row + 1) * SPACING_Y,
    });
  }
}

type AdjPair = [number, number];
const ADJ_PAIRS: AdjPair[] = [];
for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
    const idx = row * COLS + col;
    if (col < COLS - 1) ADJ_PAIRS.push([idx, idx + 1]);
    if (row < ROWS - 1) ADJ_PAIRS.push([idx, idx + COLS]);
  }
}

/* ── Component ── */

type DataFlowGridProps = {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  isActive: MutableRefObject<boolean>;
  clickRipples: MutableRefObject<{ x: number; y: number; birth: number }[]>;
  reducedMotion: boolean;
};

export function DataFlowGrid({
  smoothX,
  smoothY,
  isActive,
  clickRipples,
  reducedMotion,
}: DataFlowGridProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<(SVGCircleElement | null)[]>([]);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const activation = new Float32Array(DOTS.length);
    let mx = 0;
    let my = 0;
    let prevTime = 0;
    let elapsed = 0;
    let frame = 0;

    const unsubX = smoothX.on("change", (v) => { mx = v; });
    const unsubY = smoothY.on("change", (v) => { my = v; });

    function tick(timestamp: number) {
      const dt = prevTime ? (timestamp - prevTime) / 1000 : 0.016;
      prevTime = timestamp;
      elapsed += dt;

      const svg = svgRef.current;
      if (!svg) {
        frame = requestAnimationFrame(tick);
        return;
      }
      const rect = svg.getBoundingClientRect();
      if (rect.width === 0) {
        frame = requestAnimationFrame(tick);
        return;
      }

      /* Convert mouse to SVG coords (account for preserveAspectRatio slice) */
      const containerAspect = rect.width / rect.height;
      const viewBoxAspect = VIEW_W / VIEW_H;
      let scale: number, offsetX: number, offsetY: number;
      if (containerAspect > viewBoxAspect) {
        scale = rect.width / VIEW_W;
        offsetX = 0;
        offsetY = (rect.height - VIEW_H * scale) / 2;
      } else {
        scale = rect.height / VIEW_H;
        offsetX = (rect.width - VIEW_W * scale) / 2;
        offsetY = 0;
      }
      const svgMx = (mx - offsetX) / scale;
      const svgMy = (my - offsetY) / scale;
      const mouseOn = isActive.current;

      /* Clean expired click ripples */
      const cr = clickRipples.current;
      for (let i = cr.length - 1; i >= 0; i--) {
        if (elapsed - cr[i].birth > 3) cr.splice(i, 1);
      }

      /* Per-dot computation */
      for (let i = 0; i < DOTS.length; i++) {
        const dot = DOTS[i];
        const el = dotsRef.current[i];
        if (!el) continue;

        /* Autonomous ripple */
        let ripple = 0;
        for (let r = 0; r < RIPPLE_ORIGINS.length; r++) {
          const orig = RIPPLE_ORIGINS[r];
          const dist = Math.hypot(dot.baseX - orig.x, dot.baseY - orig.y);
          const waveFront = ((elapsed / orig.period) % 1) * 800;
          const delta = Math.abs(dist - waveFront);
          if (delta < RIPPLE_WIDTH) {
            ripple = Math.max(ripple, 1 - delta / RIPPLE_WIDTH);
          }
        }

        /* Click ripple */
        for (let c = 0; c < cr.length; c++) {
          const rp = cr[c];
          const dist = Math.hypot(dot.baseX - rp.x, dot.baseY - rp.y);
          const age = elapsed - rp.birth;
          const waveFront = age * RIPPLE_SPEED * 1.5;
          const delta = Math.abs(dist - waveFront);
          const fade = Math.max(0, 1 - age / 2.5);
          if (delta < RIPPLE_WIDTH * 0.8) {
            ripple = Math.max(ripple, (1 - delta / (RIPPLE_WIDTH * 0.8)) * fade);
          }
        }

        /* Mouse proximity */
        let mouseInf = 0;
        let repelDx = 0;
        let repelDy = 0;
        if (mouseOn) {
          const dx = dot.baseX - svgMx;
          const dy = dot.baseY - svgMy;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            mouseInf = 1 - dist / MOUSE_RADIUS;
            const norm = dist || 1;
            repelDx = (dx / norm) * REPEL_STRENGTH * mouseInf;
            repelDy = (dy / norm) * REPEL_STRENGTH * mouseInf;
          }
        }

        /* Combine */
        const act = Math.min(1, ripple + mouseInf);
        activation[i] = act;
        const scale = 1 + act * (MAX_SCALE - 1);
        const opacity = BASE_OPACITY + act * 0.45;
        const fx = dot.baseX + repelDx;
        const fy = dot.baseY + repelDy;
        const colorIdx = Math.min(3, Math.floor(mouseInf * 4));

        el.setAttribute("cx", fx.toFixed(1));
        el.setAttribute("cy", fy.toFixed(1));
        el.setAttribute("r", (BASE_R * scale).toFixed(2));
        el.setAttribute("opacity", opacity.toFixed(3));
        el.setAttribute("fill", COLOR_TIERS[colorIdx]);
      }

      /* Connection lines */
      const LINE_THRESHOLD = 0.18;
      for (let i = 0; i < ADJ_PAIRS.length; i++) {
        const line = linesRef.current[i];
        if (!line) continue;
        const [a, b] = ADJ_PAIRS[i];
        const actA = activation[a];
        const actB = activation[b];
        if (actA > LINE_THRESHOLD && actB > LINE_THRESHOLD) {
          const strength = Math.min(actA, actB);
          const dA = dotsRef.current[a];
          const dB = dotsRef.current[b];
          if (dA && dB) {
            line.setAttribute("x1", dA.getAttribute("cx")!);
            line.setAttribute("y1", dA.getAttribute("cy")!);
            line.setAttribute("x2", dB.getAttribute("cx")!);
            line.setAttribute("y2", dB.getAttribute("cy")!);
            line.setAttribute("opacity", (strength * 0.18).toFixed(3));
          }
        } else {
          line.setAttribute("opacity", "0");
        }
      }

      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY, isActive, clickRipples, reducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      fill="none"
    >
      <defs>
        <filter id="grid-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      <g>
        {ADJ_PAIRS.map((_, i) => (
          <line
            key={`l${i}`}
            ref={(el) => { linesRef.current[i] = el; }}
            stroke="#0d9488"
            strokeWidth={0.4}
            opacity={0}
          />
        ))}
      </g>

      {/* Dot grid */}
      <g filter={reducedMotion ? undefined : "url(#grid-glow)"}>
        {DOTS.map((dot, i) => (
          <circle
            key={`d${i}`}
            ref={(el) => { dotsRef.current[i] = el; }}
            cx={dot.baseX}
            cy={dot.baseY}
            r={BASE_R}
            fill="#059669"
            opacity={BASE_OPACITY}
          />
        ))}
      </g>
    </svg>
  );
}
