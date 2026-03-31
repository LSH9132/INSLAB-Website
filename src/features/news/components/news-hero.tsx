"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useLightMotion } from "@/lib/hooks/use-light-motion";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type NewsHeroDictionary = {
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

/* ── Static typewriter lines data ── */
const LINES: {
  y: number;
  x1: number;
  x2: number;
  sw: number;
  color: string;
  delay: number;
  dur: number;
}[] = [
  // Bold "headline" lines
  { y: 40, x1: 60, x2: 520, sw: 2.5, color: "#64748b", delay: 0, dur: 1.8 },
  {
    y: 80,
    x1: 100,
    x2: 620,
    sw: 2.5,
    color: "#64748b",
    delay: 0.3,
    dur: 1.6,
  },
  {
    y: 200,
    x1: 80,
    x2: 440,
    sw: 2.5,
    color: "#64748b",
    delay: 1.8,
    dur: 1.5,
  },
  // Thin "body" lines
  {
    y: 120,
    x1: 120,
    x2: 700,
    sw: 1,
    color: "#94a3b8",
    delay: 0.6,
    dur: 2.0,
  },
  {
    y: 145,
    x1: 120,
    x2: 580,
    sw: 1,
    color: "#94a3b8",
    delay: 0.9,
    dur: 1.8,
  },
  {
    y: 170,
    x1: 120,
    x2: 650,
    sw: 1,
    color: "#94a3b8",
    delay: 1.2,
    dur: 1.7,
  },
  {
    y: 230,
    x1: 140,
    x2: 560,
    sw: 1,
    color: "#94a3b8",
    delay: 2.0,
    dur: 1.6,
  },
  {
    y: 252,
    x1: 140,
    x2: 480,
    sw: 1,
    color: "#94a3b8",
    delay: 2.2,
    dur: 1.5,
  },
  {
    y: 274,
    x1: 140,
    x2: 620,
    sw: 1,
    color: "#94a3b8",
    delay: 2.3,
    dur: 1.8,
  },
  {
    y: 296,
    x1: 140,
    x2: 400,
    sw: 1,
    color: "#94a3b8",
    delay: 2.5,
    dur: 1.5,
  },
  // Amber accent line
  {
    y: 108,
    x1: 60,
    x2: 260,
    sw: 2,
    color: "#f59e0b",
    delay: 1.5,
    dur: 1.2,
  },
];

export function NewsHero({ hero }: { hero: NewsHeroDictionary }) {
  const shouldReduceMotion = useLightMotion();

  return (
    <section className="relative isolate mb-14 overflow-hidden">
      {/* ── Typewriter lines background ── */}
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
          {LINES.map((l, i) =>
            !shouldReduceMotion ? (
              <motion.line
                key={`line-${i}`}
                x1={l.x1}
                y1={l.y}
                x2={l.x2}
                y2={l.y}
                stroke={l.color}
                strokeWidth={l.sw}
                opacity={0.25}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: l.dur,
                  delay: l.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ) : (
              <line
                key={`line-${i}`}
                x1={l.x1}
                y1={l.y}
                x2={l.x2}
                y2={l.y}
                stroke={l.color}
                strokeWidth={l.sw}
                opacity={0.25}
              />
            ),
          )}
        </svg>
      </div>

      {/* ── Text content ── */}
      <div className="relative z-10 py-16 sm:py-20">
        <motion.div
          className="flex flex-col items-center gap-6 text-center"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.45 }}
          variants={staggerContainerVariants}
        >
          <motion.h1
            className="max-w-4xl font-serif text-5xl leading-none font-bold tracking-tight text-slate-900 md:text-7xl"
            variants={heroTitleVariants}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mx-auto mt-2 max-w-xl text-lg leading-8 font-light text-slate-500 md:text-xl"
            variants={heroBodyVariants}
          >
            {hero.body}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
