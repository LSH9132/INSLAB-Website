"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type JoinHeroDictionary = {
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

/* ── Rising bubbles: 15 particles with static configs ── */
const BUBBLES = [
  { cx: 60, r: 5, dur: 12, delay: 0, driftX: 20 },
  { cx: 130, r: 3, dur: 15, delay: 2, driftX: -15 },
  { cx: 200, r: 7, dur: 10, delay: 1, driftX: 25 },
  { cx: 270, r: 4, dur: 14, delay: 3, driftX: -20 },
  { cx: 340, r: 6, dur: 11, delay: 0.5, driftX: 10 },
  { cx: 410, r: 3, dur: 16, delay: 4, driftX: -30 },
  { cx: 480, r: 5, dur: 13, delay: 2.5, driftX: 18 },
  { cx: 540, r: 4, dur: 18, delay: 6, driftX: -12 },
  { cx: 600, r: 7, dur: 9, delay: 1.5, driftX: 28 },
  { cx: 660, r: 3, dur: 17, delay: 5, driftX: -22 },
  { cx: 720, r: 6, dur: 8, delay: 3.5, driftX: 15 },
  { cx: 100, r: 4, dur: 14, delay: 7, driftX: -18 },
  { cx: 300, r: 5, dur: 12, delay: 8, driftX: 22 },
  { cx: 500, r: 3, dur: 16, delay: 6.5, driftX: -25 },
  { cx: 750, r: 4, dur: 11, delay: 4.5, driftX: 12 },
];

export function JoinHero({ hero }: { hero: JoinHeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  // Split title to colorize "INSLAB"
  const parts = hero.title.split(/(INSLAB)/);

  return (
    <section className="relative isolate mb-14 overflow-hidden">
      {/* ── Rising bubbles background ── */}
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
          {!shouldReduceMotion &&
            BUBBLES.map((b, i) => (
              <motion.circle
                key={`bubble-${i}`}
                cx={b.cx}
                r={b.r}
                fill="#10b981"
                initial={{ cy: 420, opacity: 0 }}
                animate={{
                  cy: [-20],
                  cx: [b.cx, b.cx + b.driftX, b.cx - b.driftX * 0.5, b.cx],
                  opacity: [0, 0.18, 0.18, 0],
                }}
                transition={{
                  duration: b.dur,
                  delay: b.delay,
                  ease: "linear",
                  repeat: Infinity,
                  times: [0, 0.1, 0.8, 1],
                }}
              />
            ))}
        </svg>
      </div>

      {/* ── Text content ── */}
      <div className="relative z-10 py-16 sm:py-20">
        <motion.div
          className="flex flex-col gap-6"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerContainerVariants}
        >
          <motion.h1
            className="max-w-4xl text-5xl leading-none font-bold tracking-tight text-slate-900 md:text-7xl"
            variants={heroTitleVariants}
          >
            {parts.map((part, i) =>
              part === "INSLAB" ? (
                <span key={i} className="text-emerald-600">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </motion.h1>
          <motion.p
            className="mt-2 max-w-2xl text-lg leading-8 font-light text-slate-500 md:text-xl"
            variants={heroBodyVariants}
          >
            {hero.body}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
