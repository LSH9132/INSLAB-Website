"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  teamWordVariants,
  teamLineVariants,
  teamHeadVariants,
} from "@/lib/motion/team-variants";

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
/* SVG Network Topology — data                                         */
/* ------------------------------------------------------------------ */

const HUB = { x: 500, y: 250, r: 28, color: "#1e293b", label: "INSLAB" };

const pillars = [
  { id: "data",    x: 500, y: 100, color: "#0d9488", label: "DATA" },
  { id: "system",  x: 680, y: 370, color: "#2563eb", label: "SYSTEM" },
  { id: "service", x: 320, y: 370, color: "#7c3aed", label: "SERVICE" },
];

const memberNodes: { id: string; x: number; y: number; pillar: string }[] = [
  // DATA satellites
  { id: "d1", x: 380, y: 50,  pillar: "data" },
  { id: "d2", x: 500, y: 30,  pillar: "data" },
  { id: "d3", x: 620, y: 50,  pillar: "data" },
  // SYSTEM satellites
  { id: "s1", x: 740, y: 310, pillar: "system" },
  { id: "s2", x: 790, y: 400, pillar: "system" },
  { id: "s3", x: 720, y: 460, pillar: "system" },
  // SERVICE satellites
  { id: "v1", x: 260, y: 310, pillar: "service" },
  { id: "v2", x: 210, y: 400, pillar: "service" },
  { id: "v3", x: 280, y: 460, pillar: "service" },
];

const spokeEdges = pillars.map((p, i) => ({
  id: `spoke-${p.id}`,
  d: `M ${HUB.x} ${HUB.y} L ${p.x} ${p.y}`,
  delay: 0.4 + i * 0.2,
}));

const interPillarEdges = [
  {
    id: "ip-ds",
    d: `M ${pillars[0].x} ${pillars[0].y} Q 620 230 ${pillars[1].x} ${pillars[1].y}`,
    delay: 1.2,
  },
  {
    id: "ip-sv",
    d: `M ${pillars[1].x} ${pillars[1].y} Q 500 420 ${pillars[2].x} ${pillars[2].y}`,
    delay: 1.4,
  },
  {
    id: "ip-vd",
    d: `M ${pillars[2].x} ${pillars[2].y} Q 380 230 ${pillars[0].x} ${pillars[0].y}`,
    delay: 1.6,
  },
];

const memberEdges = memberNodes.map((m, i) => {
  const p = pillars.find((pl) => pl.id === m.pillar)!;
  return {
    id: `me-${m.id}`,
    d: `M ${p.x} ${p.y} L ${m.x} ${m.y}`,
    delay: 1.0 + i * 0.1,
  };
});

const packets = pillars.map((p, i) => ({
  id: `pkt-${p.id}`,
  color: p.color,
  delay: 2.5 + i * 0.6,
  dur: 1.8,
  xs: [HUB.x, p.x],
  ys: [HUB.y, p.y],
}));

const logLines = [
  { text: "nodes: 12 active",       x: "28%", y: "72%", delay: 2.8 },
  { text: "✓ data pipeline healthy", x: "6%",  y: "44%", delay: 3.2 },
  { text: "latency: 4ms avg",       x: "72%", y: "28%", delay: 3.6 },
  { text: "throughput: 1.2k ops/s",  x: "62%", y: "76%", delay: 4.0 },
];

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

        {/* SVG Network Topology */}
        <svg
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Spoke edges: hub → pillars */}
          {spokeEdges.map((e) => (
            <motion.path
              key={e.id}
              d={e.d}
              stroke="#dde6f0"
              strokeWidth={1.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: e.delay, ease: "easeInOut" }}
            />
          ))}

          {/* Inter-pillar edges (dashed curves) */}
          {interPillarEdges.map((e) => (
            <motion.path
              key={e.id}
              d={e.d}
              stroke="#94a3b8"
              strokeWidth={1}
              strokeLinecap="round"
              strokeDasharray="5 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: e.delay, ease: "easeInOut" }}
            />
          ))}

          {/* Member edges: pillar → member */}
          {memberEdges.map((e) => (
            <motion.path
              key={e.id}
              d={e.d}
              stroke="#dde6f0"
              strokeWidth={1}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: e.delay, ease: "easeInOut" }}
            />
          ))}

          {/* Orbital ring around hub */}
          {!shouldReduceMotion && (
            <motion.circle
              cx={HUB.x}
              cy={HUB.y}
              r={45}
              stroke="#94a3b8"
              strokeWidth={0.8}
              strokeDasharray="4 6"
              fill="none"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
            />
          )}

          {/* Hub node */}
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={HUB.r}
            fill="white"
            stroke={HUB.color}
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: 0.2,
            }}
          />
          <motion.circle
            cx={HUB.x}
            cy={HUB.y}
            r={12}
            fill={HUB.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 18,
              delay: 0.3,
            }}
          />
          <motion.text
            x={HUB.x}
            y={HUB.y + 46}
            textAnchor="middle"
            fontSize="11"
            fill="#64748b"
            fontFamily="system-ui, sans-serif"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {HUB.label}
          </motion.text>

          {/* Pillar nodes */}
          {pillars.map((p, i) => (
            <g key={p.id}>
              {/* Pulse halo */}
              {!shouldReduceMotion && (
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={16}
                  fill={p.color}
                  opacity={0.08}
                  animate={{
                    r: [16, 26, 16],
                    opacity: [0.08, 0.18, 0.08],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={13}
                fill="white"
                stroke={p.color}
                strokeWidth={2}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: 0.6 + i * 0.18,
                }}
              />
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={6}
                fill={p.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: 0.7 + i * 0.18,
                }}
              />
              <text
                x={p.x}
                y={p.y + 28}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
                fontFamily="system-ui, sans-serif"
                fontWeight="500"
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Member satellite nodes */}
          {memberNodes.map((m, i) => {
            const p = pillars.find((pl) => pl.id === m.pillar)!;
            return (
              <motion.circle
                key={m.id}
                cx={m.x}
                cy={m.y}
                r={6}
                fill="white"
                stroke={p.color}
                strokeWidth={1.5}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                  delay: 1.2 + i * 0.08,
                }}
              />
            );
          })}

          {/* Data packets */}
          {!shouldReduceMotion &&
            packets.map((pk) => (
              <motion.circle
                key={pk.id}
                r={3}
                fill={pk.color}
                animate={{
                  cx: pk.xs,
                  cy: pk.ys,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: pk.dur,
                  delay: pk.delay,
                  repeat: Infinity,
                  repeatDelay: 2.0,
                  ease: "linear",
                  times: [0, 0.08, 0.88, 1],
                }}
              />
            ))}
        </svg>

        {/* Log lines */}
        {!shouldReduceMotion &&
          logLines.map((line) => (
            <motion.div
              key={line.text}
              className="absolute font-mono text-[10px] font-medium text-slate-400"
              style={{ left: line.x, top: line.y }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: 5,
                delay: line.delay,
                repeat: Infinity,
                repeatDelay: 8,
                times: [0, 0.1, 0.8, 1],
              }}
            >
              {line.text}
            </motion.div>
          ))}

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
