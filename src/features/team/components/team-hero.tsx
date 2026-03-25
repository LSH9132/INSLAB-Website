"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type TeamHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
};

const heroTitleVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroBodyVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Static data for floating circles (no Math.random) ── */
const CIRCLES = [
  { cx: 80, cy: 60, r: 30, dur: 22, dx: 20, dy: 15 },
  { cx: 200, cy: 120, r: 18, dur: 26, dx: -15, dy: 20 },
  { cx: 350, cy: 80, r: 40, dur: 20, dx: 25, dy: -18 },
  { cx: 500, cy: 180, r: 14, dur: 28, dx: -20, dy: 12 },
  { cx: 620, cy: 60, r: 25, dur: 24, dx: 18, dy: 22 },
  { cx: 720, cy: 200, r: 20, dur: 30, dx: -12, dy: -16 },
  { cx: 150, cy: 300, r: 35, dur: 23, dx: 22, dy: -20 },
  { cx: 400, cy: 320, r: 16, dur: 27, dx: -18, dy: 15 },
  { cx: 560, cy: 280, r: 22, dur: 21, dx: 15, dy: -14 },
  { cx: 680, cy: 340, r: 12, dur: 25, dx: -10, dy: 18 },
];

const LINES = [
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [6, 7],
  [7, 8],
  [8, 9],
];

export function TeamHero({ hero }: { hero: TeamHeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate mb-14 overflow-hidden rounded-3xl bg-slate-50">
      {/* ── Floating network background ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Static connection lines */}
          {LINES.map(([a, b], i) => (
            <line
              key={`line-${i}`}
              x1={CIRCLES[a].cx}
              y1={CIRCLES[a].cy}
              x2={CIRCLES[b].cx}
              y2={CIRCLES[b].cy}
              stroke="#0d9488"
              strokeWidth={1}
              opacity={0.05}
            />
          ))}
          {/* Floating circles */}
          {!shouldReduceMotion
            ? CIRCLES.map((c, i) => (
                <motion.circle
                  key={`circle-${i}`}
                  cx={c.cx}
                  cy={c.cy}
                  r={c.r}
                  fill="#0d9488"
                  opacity={0.08 + (i % 3) * 0.02}
                  animate={{
                    cx: [c.cx, c.cx + c.dx, c.cx - c.dx * 0.5, c.cx],
                    cy: [c.cy, c.cy + c.dy, c.cy - c.dy * 0.5, c.cy],
                  }}
                  transition={{
                    duration: c.dur,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              ))
            : CIRCLES.map((c, i) => (
                <circle
                  key={`circle-${i}`}
                  cx={c.cx}
                  cy={c.cy}
                  r={c.r}
                  fill="#0d9488"
                  opacity={0.08 + (i % 3) * 0.02}
                />
              ))}
        </svg>
        {/* Blurred teal gradient blob */}
        <div className="absolute top-1/4 left-1/3 h-64 w-64 rounded-full bg-teal-300/10 blur-3xl" />
      </div>

      {/* ── Text content ── */}
      <div className="relative z-10 py-20 sm:py-28">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerContainerVariants}
        >
          <motion.h1
            className="max-w-4xl text-5xl leading-none font-extralight tracking-tight text-slate-800 md:text-7xl"
            variants={heroTitleVariants}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mx-auto max-w-xl text-lg leading-8 font-light text-slate-500 md:text-xl"
            variants={heroBodyVariants}
          >
            {hero.body}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
