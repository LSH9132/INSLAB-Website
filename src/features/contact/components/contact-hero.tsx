"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { staggerContainerVariants } from "@/lib/motion/fade-up";

type ContactHeroDictionary = {
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

/* ── Signal rings: 3 concentric rings expanding from left-offset center ── */
const RINGS = [
  { delay: 0 },
  { delay: 2 },
  { delay: 4 },
];

export function ContactHero({ hero }: { hero: ContactHeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate mb-14 overflow-hidden">
      {/* ── Signal rings background ── */}
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
          {/* Static center dot */}
          <circle cx={200} cy={150} r={3} fill="#78716c" opacity={0.3} />

          {/* Expanding rings */}
          {!shouldReduceMotion &&
            RINGS.map((ring, i) => (
              <motion.circle
                key={`ring-${i}`}
                cx={200}
                cy={150}
                r={0}
                stroke="#78716c"
                strokeWidth={1}
                fill="none"
                initial={{ r: 0, opacity: 0.2 }}
                animate={{ r: 250, opacity: 0 }}
                transition={{
                  duration: 4,
                  delay: ring.delay,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 2,
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
            className="max-w-4xl text-4xl leading-none font-medium tracking-[0.08em] text-stone-800 uppercase md:text-6xl"
            variants={heroTitleVariants}
          >
            {hero.title}
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
