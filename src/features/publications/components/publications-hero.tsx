"use client";

import { motion, useReducedMotion } from "motion/react";

import { fadeUpVariants } from "@/lib/motion/fade-up";

export function PublicationsHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="mb-14 flex flex-col gap-6"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.45 }}
      variants={fadeUpVariants}
    >
      <div className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.24em] text-slate-400 uppercase">
        <span className="h-px w-8 bg-slate-300" />
        Academic Output
      </div>
      <h1 className="max-w-4xl text-5xl leading-none font-medium tracking-tight text-slate-950 font-serif italic md:text-7xl">
        Selected Publications
      </h1>
      <p className="max-w-2xl text-base leading-8 text-slate-500 md:text-xl">
        Our research spans artificial intelligence, network systems, and
        cybersecurity. Explore representative papers and the themes shaping
        INSLAB&apos;s recent academic output.
      </p>
    </motion.section>
  );
}
