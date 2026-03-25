"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion } from "motion/react";

import { Link } from "@/i18n/navigation";
import { staggerContainerVariants } from "@/lib/motion/fade-up";

type HeroDictionary = {
  eyebrow: string;
  title: string;
  titleAccent: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
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

const heroCtaVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── Network graph: nodes & edges ── */
const NODES: { cx: number; cy: number; r: number; pulse?: boolean }[] = [
  // Primary cluster (center-right)
  { cx: 480, cy: 70, r: 5, pulse: true },
  { cx: 580, cy: 120, r: 4 },
  { cx: 520, cy: 180, r: 6, pulse: true },
  { cx: 660, cy: 75, r: 4.5 },
  { cx: 640, cy: 200, r: 5, pulse: true },
  { cx: 440, cy: 140, r: 4 },
  { cx: 730, cy: 150, r: 4 },
  { cx: 560, cy: 260, r: 4.5 },
  // Outer scattered nodes
  { cx: 760, cy: 60, r: 3 },
  { cx: 780, cy: 240, r: 3.5, pulse: true },
  { cx: 400, cy: 250, r: 3 },
  { cx: 350, cy: 90, r: 3 },
  { cx: 700, cy: 280, r: 3 },
  { cx: 470, cy: 300, r: 3.5 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 3], [0, 5], [0, 11],
  [1, 2], [1, 3], [1, 4], [1, 6],
  [2, 4], [2, 5], [2, 7], [2, 10],
  [3, 6], [3, 8],
  [4, 6], [4, 7], [4, 9], [4, 12],
  [5, 2], [5, 10],
  [6, 8], [6, 9],
  [7, 10], [7, 12], [7, 13],
  [9, 12],
  [10, 13],
];

/* ── Data-flow particle along an edge ── */
function DataParticle({
  from,
  to,
  delay,
  duration,
}: {
  from: (typeof NODES)[number];
  to: (typeof NODES)[number];
  delay: number;
  duration: number;
}) {
  return (
    <motion.circle
      r={2}
      fill="#3b82f6"
      initial={{ cx: from.cx, cy: from.cy, opacity: 0 }}
      animate={{
        cx: [from.cx, to.cx],
        cy: [from.cy, to.cy],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: duration * 1.5,
        ease: "linear",
      }}
    />
  );
}

export function HomeHero({ hero }: { hero: HeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden">
      {/* ── Gradient blobs ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 select-none"
        aria-hidden
      >
        <div className="absolute -top-32 right-1/4 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[400px] w-[400px] rounded-full bg-violet-100/50 blur-[100px]" />
        <div className="absolute -bottom-20 left-1/3 h-[350px] w-[350px] rounded-full bg-teal-100/40 blur-[100px]" />
      </div>

      {/* ── Network graph background ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 800 340"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Dashed orbit rings for depth */}
          <circle
            cx={580}
            cy={160}
            r={120}
            stroke="#3b82f6"
            strokeWidth={0.5}
            strokeDasharray="4 6"
            opacity={0.08}
          />
          <circle
            cx={580}
            cy={160}
            r={200}
            stroke="#3b82f6"
            strokeWidth={0.4}
            strokeDasharray="3 8"
            opacity={0.06}
          />

          {/* Edges */}
          {EDGES.map(([from, to], i) => {
            const a = NODES[from];
            const b = NODES[to];
            return !shouldReduceMotion ? (
              <motion.line
                key={`edge-${i}`}
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke="#3b82f6"
                strokeWidth={1}
                opacity={0.18}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.4 + i * 0.08,
                  delay: 0.2 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ) : (
              <line
                key={`edge-${i}`}
                x1={a.cx}
                y1={a.cy}
                x2={b.cx}
                y2={b.cy}
                stroke="#3b82f6"
                strokeWidth={1}
                opacity={0.18}
              />
            );
          })}

          {/* Data-flow particles travelling along select edges */}
          {!shouldReduceMotion && (
            <>
              <DataParticle from={NODES[0]} to={NODES[1]} delay={1.2} duration={1.8} />
              <DataParticle from={NODES[1]} to={NODES[4]} delay={2.0} duration={2.0} />
              <DataParticle from={NODES[3]} to={NODES[6]} delay={1.6} duration={1.6} />
              <DataParticle from={NODES[2]} to={NODES[7]} delay={2.8} duration={2.2} />
              <DataParticle from={NODES[4]} to={NODES[9]} delay={3.2} duration={1.8} />
              <DataParticle from={NODES[6]} to={NODES[8]} delay={2.4} duration={1.4} />
              <DataParticle from={NODES[5]} to={NODES[2]} delay={1.0} duration={2.0} />
              <DataParticle from={NODES[7]} to={NODES[13]} delay={3.6} duration={1.6} />
            </>
          )}

          {/* Nodes */}
          {NODES.map((node, i) =>
            !shouldReduceMotion ? (
              <g key={`node-${i}`}>
                {/* Pulse ring for highlighted nodes */}
                {node.pulse && (
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    initial={{ opacity: 0.3, scale: 1 }}
                    animate={{
                      opacity: [0.3, 0, 0.3],
                      scale: [1, 3, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      delay: i * 0.6,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                )}
                {/* Glow */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r * 2.5}
                  fill="#3b82f6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.06 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.08,
                  }}
                />
                {/* Core */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="#3b82f6"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 0.35, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </g>
            ) : (
              <circle
                key={`node-${i}`}
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="#3b82f6"
                opacity={0.3}
              />
            ),
          )}
        </svg>
      </div>

      {/* ── Text content ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-10 lg:py-36"
        initial={shouldReduceMotion ? false : "hidden"}
        whileInView={shouldReduceMotion ? undefined : "visible"}
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainerVariants}
      >
        {/* Eyebrow */}
        <motion.span
          className="font-serif text-lg text-blue-600"
          variants={heroEyebrowVariants}
        >
          {hero.eyebrow}
        </motion.span>

        {/* Headline */}
        <motion.h1
          className="mt-5 max-w-3xl text-5xl leading-[1.05] font-extrabold tracking-tight text-slate-900 md:text-7xl"
          variants={heroTitleVariants}
        >
          {hero.title}{" "}
          <span className="text-blue-600">{hero.titleAccent}</span>
        </motion.h1>

        {/* Body */}
        <motion.p
          className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500"
          variants={heroBodyVariants}
        >
          {hero.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
          variants={heroCtaVariants}
        >
          <Link
            href="/research"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/35"
          >
            {hero.ctaPrimary}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/team"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-8 py-3.5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900"
          >
            {hero.ctaSecondary}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
