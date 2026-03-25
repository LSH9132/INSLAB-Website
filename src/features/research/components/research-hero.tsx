"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type ResearchHeroDictionary = {
  eyebrow: string;
  title: string;
  titleAccent: string;
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

export function ResearchHero({ hero }: { hero: ResearchHeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-6 py-16 lg:px-10 lg:py-24">
      {/* Geometric circle background */}
      <div
        className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-1/2 opacity-[0.06]"
        aria-hidden
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full text-blue-700"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="25"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="90"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="18"
            y1="18"
            x2="82"
            y2="82"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          <line
            x1="82"
            y1="18"
            x2="18"
            y2="82"
            stroke="currentColor"
            strokeWidth="0.3"
          />
        </svg>
      </div>

      <motion.div
        className="flex max-w-4xl flex-col gap-6"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.45 }}
        variants={staggerContainerVariants}
      >
        <motion.span
          className="font-serif text-lg italic text-blue-600"
          variants={heroEyebrowVariants}
        >
          {hero.eyebrow}
        </motion.span>

        <motion.h1
          className="text-5xl leading-[1.05] font-extrabold tracking-tight text-slate-900 md:text-7xl"
          variants={heroTitleVariants}
        >
          {hero.title}{" "}
          <span className="text-blue-700">{hero.titleAccent}</span>.
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg leading-relaxed text-slate-500"
          variants={heroBodyVariants}
        >
          {hero.body}
        </motion.p>
      </motion.div>
    </section>
  );
}
