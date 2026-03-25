"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  teamWordVariants,
  teamLineVariants,
  teamHeadVariants,
} from "@/lib/motion/team-variants";
import { NetworkConstellation } from "@/features/research/components/network-constellation";

type Stat = { value: string; label: string };

type TeamHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
};

type TeamHeroProps = {
  hero: TeamHeroDictionary;
  stats: Stat[];
};

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function TeamHero({ hero, stats }: TeamHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const words = hero.title.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden border-b border-slate-100 bg-white"
    >
      {/* ── Background ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        {/* Gradient blobs */}
        <div className="absolute -top-40 -left-20 h-[440px] w-[440px] rounded-full bg-teal-100/70 blur-[120px]" />
        <div className="absolute -top-32 right-0 h-[380px] w-[380px] rounded-full bg-violet-100/65 blur-[110px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-blue-100/55 blur-[100px]" />

        {/* SVG Network Topology + Log lines */}
        <NetworkConstellation showLogLines className="absolute inset-0 h-full w-full" />

        {/* Radial gradient overlay for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(255,255,255,0.85)_30%,rgba(255,255,255,0.2)_100%)]" />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-36">
        {/* Eyebrow */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-slate-500 uppercase shadow-sm backdrop-blur-sm sm:mb-8 sm:gap-2.5 sm:px-5 sm:py-2 sm:text-[11px] sm:tracking-[0.25em]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span className="relative flex size-1.5">
            {!shouldReduceMotion && (
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-teal-500"
                animate={{ scale: [1, 2.4, 1], opacity: [0.9, 0, 0.9] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            )}
            <span className="relative inline-flex size-1.5 rounded-full bg-teal-500" />
          </motion.span>
          {hero.eyebrow}
        </motion.div>

        {/* Headline — word-by-word blur entrance */}
        <motion.h1
          className="text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-slate-950 sm:text-5xl sm:leading-[1.1] sm:tracking-[-0.04em] lg:text-[5.2rem] lg:leading-[1.06]"
          variants={teamHeadVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.span className="block" variants={teamLineVariants}>
            {words.map((word, wi) => (
              <motion.span
                key={wi}
                className="inline-block"
                style={{ marginRight: wi < words.length - 1 ? "0.3em" : 0 }}
                variants={teamWordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>

        {/* Body */}
        <motion.p
          className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:mt-7 sm:text-base sm:leading-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          {hero.body}
        </motion.p>

        {/* Gradient divider */}
        <motion.div
          className="mx-auto mt-10 h-px w-48 bg-gradient-to-r from-transparent via-slate-200 to-transparent sm:mt-16 sm:w-64"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2, ease: "easeInOut" }}
        />

        {/* Stats */}
        {stats.length > 0 && (
          <motion.div
            className="mt-8 flex justify-center gap-8 sm:mt-10 sm:gap-12 lg:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 1.4 + i * 0.1,
                  ease: "easeOut",
                }}
              >
                <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[11px] font-medium tracking-wide text-slate-400 sm:mt-1.5 sm:text-xs">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
        >
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-slate-300" />
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-slate-400"
            animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
