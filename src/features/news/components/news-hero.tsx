"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type NewsHeroDictionary = {
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

export function NewsHero({ hero }: { hero: NewsHeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="mb-14 flex flex-col gap-6"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.45 }}
      variants={staggerContainerVariants}
    >
      <motion.div
        className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase"
        variants={heroEyebrowVariants}
      >
        <motion.span
          className="h-px w-8 origin-left bg-slate-300"
          initial={shouldReduceMotion ? false : { scaleX: 0, opacity: 0.5 }}
          whileInView={shouldReduceMotion ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
        {hero.eyebrow}
      </motion.div>
      <motion.h1
        className="max-w-4xl text-5xl leading-none font-medium tracking-tight text-slate-900 font-serif italic md:text-7xl"
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
    </motion.section>
  );
}
