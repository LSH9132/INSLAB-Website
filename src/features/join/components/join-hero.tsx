"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  type FloatingShape,
  renderShape,
  generateHalftoneDots,
  generateSpeedLines,
  EASE_SMOOTH,
} from "@/lib/shapes";

type JoinHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
  bodySecond: string;
};

/* ------------------------------------------------------------------ */
/* Anime-style decorative SVG data                                      */
/* ------------------------------------------------------------------ */

const speedLines = generateSpeedLines(36, 8, 48);

const halftoneDots = generateHalftoneDots({
  rows: 8, cols: 10, startCx: 62, startCy: 65, spacing: 3.5, maxFade: 0.6, baseRadius: 0.45,
});

const brushstrokePath =
  "M 0 8 C 8 3, 16 12, 24 7 S 40 2, 48 8 S 64 14, 72 7 S 88 2, 96 8";

const floatingShapes: FloatingShape[] = [
  { x: 6,  cy: 82, size: 1.4, dur: 14, delay: 0,   shape: "fourStar", color: "#3b82f6", spin: 9 },
  { x: 14, cy: 95, size: 1.0, dur: 11, delay: 3,   shape: "diamond",  color: "#06b6d4", spin: 16 },
  { x: 22, cy: 78, size: 0.8, dur: 16, delay: 6,   shape: "circle",   color: "#8b5cf6" },
  { x: 32, cy: 90, size: 1.2, dur: 13, delay: 1.5, shape: "triangle", color: "#3b82f6", spin: 14 },
  { x: 38, cy: 84, size: 0.9, dur: 10, delay: 4.5, shape: "ring",     color: "#06b6d4" },
  { x: 48, cy: 96, size: 1.1, dur: 15, delay: 2,   shape: "fourStar", color: "#8b5cf6", spin: 11 },
  { x: 52, cy: 80, size: 0.7, dur: 12, delay: 7,   shape: "diamond",  color: "#3b82f6", spin: 18 },
  { x: 62, cy: 88, size: 1.3, dur: 11, delay: 0.5, shape: "circle",   color: "#06b6d4" },
  { x: 68, cy: 94, size: 0.9, dur: 14, delay: 5,   shape: "triangle", color: "#8b5cf6", spin: 13 },
  { x: 78, cy: 82, size: 1.1, dur: 13, delay: 3.5, shape: "fourStar", color: "#3b82f6", spin: 10 },
  { x: 85, cy: 92, size: 0.8, dur: 10, delay: 1,   shape: "ring",     color: "#06b6d4" },
  { x: 94, cy: 86, size: 1.0, dur: 16, delay: 6.5, shape: "diamond",  color: "#8b5cf6", spin: 15 },
];

const ease = EASE_SMOOTH;

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function JoinHero({ hero }: { hero: JoinHeroDictionary }) {
  const rm = useReducedMotion();
  const titleWords = hero.title.split(/\s+/);

  return (
    <section className="relative isolate overflow-hidden">
      {/* ── Background ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Speed lines — rotating */}
          <motion.g
            style={{ originX: "50px", originY: "50px" }}
            animate={rm ? undefined : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          >
            {speedLines.map((l, i) => (
              <motion.line
                key={`sp${i}`}
                x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                stroke="#94a3b8"
                strokeWidth={i % 3 === 0 ? 0.25 : 0.12}
                initial={rm ? { opacity: 0.07 } : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.07 }}
                transition={{
                  pathLength: { duration: 1.2, delay: i * 0.02, ease: "easeOut" },
                  opacity: { duration: 0.6, delay: i * 0.02 },
                }}
              />
            ))}
          </motion.g>

          {/* Halftone — breathing */}
          <motion.g
            animate={rm ? undefined : { opacity: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {halftoneDots.map((d, i) => (
              <circle
                key={`ht${i}`}
                cx={d.cx} cy={d.cy} r={d.r}
                fill="#94a3b8" opacity={0.035}
              />
            ))}
          </motion.g>

          {/* Floating shapes */}
          {!rm &&
            floatingShapes.map((s, i) => (
              <motion.g
                key={`fs${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.25, 0.25, 0] }}
                transition={{
                  duration: s.dur, delay: s.delay,
                  repeat: Infinity, ease: "linear",
                }}
              >
                <motion.g
                  animate={{
                    translateX: s.x,
                    translateY: [s.cy, s.cy - 65],
                    ...(s.spin ? { rotate: [0, 360] } : {}),
                  }}
                  transition={{
                    translateY: {
                      duration: s.dur, delay: s.delay,
                      repeat: Infinity, ease: "linear",
                    },
                    rotate: s.spin
                      ? { duration: s.spin, repeat: Infinity, ease: "linear" }
                      : undefined,
                  }}
                >
                  {renderShape(s)}
                </motion.g>
              </motion.g>
            ))}
        </svg>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 py-16 sm:py-20">
        {/* Title card with corner marks */}
        <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-8 sm:py-14">
          {/* Corner marks — double lines, spread from center */}
          {/* Top-left */}
          <motion.span
            className="absolute top-0 left-0"
            initial={rm ? false : { opacity: 0, x: 200, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            aria-hidden
          >
            <span className="absolute top-0 left-0 h-6 w-6 border-t-[3px] border-l-[3px] border-blue-500/20 sm:h-8 sm:w-8" />
            <span className="absolute top-2 left-2 h-4 w-4 border-t-[2px] border-l-[2px] border-blue-500/10 sm:h-5 sm:w-5" />
          </motion.span>
          {/* Top-right */}
          <motion.span
            className="absolute top-0 right-0"
            initial={rm ? false : { opacity: 0, x: -200, y: 100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            aria-hidden
          >
            <span className="absolute top-0 right-0 h-6 w-6 border-t-[3px] border-r-[3px] border-blue-500/20 sm:h-8 sm:w-8" />
            <span className="absolute top-2 right-2 h-4 w-4 border-t-[2px] border-r-[2px] border-blue-500/10 sm:h-5 sm:w-5" />
          </motion.span>
          {/* Bottom-left */}
          <motion.span
            className="absolute bottom-0 left-0"
            initial={rm ? false : { opacity: 0, x: 200, y: -100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            aria-hidden
          >
            <span className="absolute bottom-0 left-0 h-6 w-6 border-b-[3px] border-l-[3px] border-blue-500/20 sm:h-8 sm:w-8" />
            <span className="absolute bottom-2 left-2 h-4 w-4 border-b-[2px] border-l-[2px] border-blue-500/10 sm:h-5 sm:w-5" />
          </motion.span>
          {/* Bottom-right */}
          <motion.span
            className="absolute right-0 bottom-0"
            initial={rm ? false : { opacity: 0, x: -200, y: -100 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease }}
            aria-hidden
          >
            <span className="absolute right-0 bottom-0 h-6 w-6 border-r-[3px] border-b-[3px] border-blue-500/20 sm:h-8 sm:w-8" />
            <span className="absolute right-2 bottom-2 h-4 w-4 border-r-[2px] border-b-[2px] border-blue-500/10 sm:h-5 sm:w-5" />
          </motion.span>

          {/* Eyebrow */}
          <motion.div
            className="mb-8 flex items-center justify-center gap-3"
            initial={rm ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <span className="h-px w-6 bg-slate-300" />
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              {hero.eyebrow}
            </span>
            <span className="h-px w-6 bg-slate-300" />
          </motion.div>

          {/* Title */}
          <h1 className="text-center text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="block"
                style={
                  i === titleWords.length - 1
                    ? { WebkitTextStroke: "2px #0f172a", color: "transparent" }
                    : { color: "#0f172a" }
                }
                initial={
                  rm ? false : { opacity: 0, scale: 0.92, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Brushstroke */}
          <motion.svg
            viewBox="0 0 96 16"
            className="mx-auto mt-4 h-3 w-24 sm:w-28"
            fill="none"
            initial={rm ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <motion.path
              d={brushstrokePath}
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={rm ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>

        {/* Body — two lines, second lighter */}
        <motion.div
          className="mx-auto mt-4 max-w-xl space-y-3 text-center"
          initial={rm ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
        >
          <p className="text-base leading-relaxed text-slate-500">
            {hero.body}
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            {hero.bodySecond}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
