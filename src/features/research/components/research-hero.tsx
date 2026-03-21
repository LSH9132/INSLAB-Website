"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type ResearchHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
};

const heroEyebrowVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
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

/* ── Dot grid: 20 cols × 8 rows ── */
const COLS = 20;
const ROWS = 8;
const SPACING_X = 800 / (COLS + 1);
const SPACING_Y = 300 / (ROWS + 1);

const DOTS: { cx: number; cy: number; col: number }[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    DOTS.push({
      cx: SPACING_X * (c + 1),
      cy: SPACING_Y * (r + 1),
      col: c,
    });
  }
}

export function ResearchHero({ hero }: { hero: ResearchHeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate mb-14 overflow-hidden rounded-2xl bg-indigo-50/40">
      {/* ── Dot grid + scanline background ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient
              id="scanline-fade"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="30%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="70%" stopColor="#6366f1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Static dots */}
          {DOTS.map((d, i) => (
            <circle
              key={`dot-${i}`}
              cx={d.cx}
              cy={d.cy}
              r={1.5}
              fill="#6366f1"
              opacity={0.12}
            />
          ))}

          {/* Scanline */}
          {!shouldReduceMotion && (
            <motion.rect
              x={0}
              y={0}
              width={40}
              height={300}
              fill="url(#scanline-fade)"
              animate={{ x: [-40, 840] }}
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          )}
        </svg>
      </div>

      {/* ── Text content ── */}
      <div className="relative z-10 px-6 py-16 sm:px-10 sm:py-20">
        <motion.div
          className="flex flex-col gap-6"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerContainerVariants}
        >
          <motion.div
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-indigo-400 uppercase"
            variants={heroEyebrowVariants}
          >
            <motion.span
              className="h-px w-8 origin-left bg-indigo-300"
              initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0.5 }}
              whileInView={
                shouldReduceMotion ? undefined : { scaleX: 1, opacity: 1 }
              }
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            {hero.eyebrow}
          </motion.div>
          <motion.h1
            className="max-w-4xl font-serif text-5xl leading-none font-medium italic tracking-tight text-slate-900 md:text-7xl"
            variants={heroTitleVariants}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="max-w-2xl text-lg leading-8 font-light text-slate-500 md:text-xl"
            variants={heroBodyVariants}
          >
            {hero.body}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
