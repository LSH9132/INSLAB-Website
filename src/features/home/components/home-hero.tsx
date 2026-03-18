"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion/fade-up";

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

const pillars = [
  {
    id: "ai",
    label: "AI Systems",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path
          fillRule="evenodd"
          d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.062 1.06A.75.75 0 116.11 5.173L5.05 4.11a.75.75 0 010-1.06zm9.9 0a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 01-1.062-1.061l1.061-1.061a.75.75 0 011.06 0zM3 7.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 013 7.5zm11 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 0114 7.5zm-6.94 2.81a.75.75 0 011 1.11L6.998 12.5h6.004l-1.061-1.08a.75.75 0 011.077-1.043l2.25 2.292a.75.75 0 010 1.043l-2.25 2.292a.75.75 0 11-1.077-1.044l.663-.674H7.146l.663.674a.75.75 0 11-1.077 1.044l-2.25-2.292a.75.75 0 010-1.043l2.25-2.292a.75.75 0 01.038-.039z"
          clipRule="evenodd"
        />
      </svg>
    ),
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    id: "aiot",
    label: "AIoT",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.88 0-1.735.118-2.546.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
      </svg>
    ),
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  {
    id: "mlops",
    label: "MLOps",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
        <path
          fillRule="evenodd"
          d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
          clipRule="evenodd"
        />
      </svg>
    ),
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

/* Pipeline node positions */
const pipelineNodes = [
  { id: "n1", x: 80,  y: 80,  label: "Sensor",   delay: 0.0 },
  { id: "n2", x: 240, y: 60,  label: "Edge AI",   delay: 0.3 },
  { id: "n3", x: 400, y: 80,  label: "Gateway",   delay: 0.6 },
  { id: "n4", x: 160, y: 200, label: "MLOps",     delay: 0.9 },
  { id: "n5", x: 320, y: 210, label: "Inference", delay: 1.2 },
  { id: "n6", x: 480, y: 190, label: "Monitor",   delay: 1.5 },
  { id: "n7", x: 240, y: 330, label: "Retrain",   delay: 1.8 },
  { id: "n8", x: 400, y: 320, label: "Deploy",    delay: 2.1 },
];

const pipelineEdges = [
  { id: "e1",  from: [80,  80],  to: [240, 60]  },
  { id: "e2",  from: [240, 60],  to: [400, 80]  },
  { id: "e3",  from: [80,  80],  to: [160, 200] },
  { id: "e4",  from: [240, 60],  to: [160, 200] },
  { id: "e5",  from: [240, 60],  to: [320, 210] },
  { id: "e6",  from: [400, 80],  to: [320, 210] },
  { id: "e7",  from: [400, 80],  to: [480, 190] },
  { id: "e8",  from: [160, 200], to: [240, 330] },
  { id: "e9",  from: [320, 210], to: [240, 330] },
  { id: "e10", from: [320, 210], to: [400, 320] },
  { id: "e11", from: [480, 190], to: [400, 320] },
  { id: "e12", from: [240, 330], to: [400, 320] },
];

const packets = pipelineEdges.map((edge, i) => ({
  ...edge,
  delay: i * 0.28,
  duration: 2.4 + (i % 4) * 0.3,
}));

const logLines = [
  { text: "▶  model_v2.3 training started", color: "text-emerald-600" },
  { text: "   epoch 12/50 — loss: 0.0214",  color: "text-slate-500"  },
  { text: "✓  accuracy: 97.8%",             color: "text-cyan-600"   },
  { text: "▶  deploying to edge cluster…",  color: "text-violet-600" },
  { text: "✓  3 / 3 nodes healthy",         color: "text-slate-500"  },
];

/* node accent colours (light palette) */
const nodeColors = [
  "#7c3aed", "#0891b2", "#059669",
  "#7c3aed", "#0891b2", "#059669",
  "#8b5cf6", "#34d399",
];

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export function HomeHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 bg-white pt-16 pb-24 lg:pt-24 lg:pb-28">
      {/* Subtle grid */}
      <div className="absolute inset-0 -z-20 bg-grid opacity-60" />

      {/* Soft radial tints */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.07),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.07),transparent_40%)]" />

      {/* Animated colour blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-40 -left-40 -z-10 h-[480px] w-[480px] rounded-full bg-violet-200/50 blur-[120px]"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-24 -right-16 -z-10 h-[340px] w-[340px] rounded-full bg-cyan-200/50 blur-[100px]"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* ---------- Content grid ---------- */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-y-16 lg:grid-cols-2 lg:gap-x-14">

          {/* ---- Left: Text ---- */}
          <motion.div
            className="z-10 max-w-2xl"
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={staggerContainerVariants}
          >
            {/* Badge */}
            <motion.div
              variants={fadeUpVariants}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] text-violet-700 uppercase"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400/60" />
                <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
              </span>
              Intelligence Network System Lab
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[4.4rem]"
            >
              Building the next{" "}
              <span className="block bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                intelligent systems
              </span>
            </motion.h1>

            {/* Sub copy */}
            <motion.p
              variants={fadeUpVariants}
              className="mt-6 max-w-lg text-lg leading-8 text-slate-500"
            >
              INSLAB advances research in AI Systems,&nbsp;AIoT, and MLOps —
              connecting intelligent models to real-world infrastructure through
              adaptive, deployable, and scalable architectures.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpVariants} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/publications"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/12 hover:bg-violet-700 transition-colors"
              >
                Explore Research
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#mission"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Our Vision
              </a>
            </motion.div>

            {/* Research pillar chips */}
            <motion.div variants={fadeUpVariants} className="mt-12 flex flex-wrap gap-3">
              {pillars.map((p) => (
                <div
                  key={p.id}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${p.badge}`}
                >
                  {p.icon}
                  {p.label}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ---- Right: Visualization card ---- */}
          <motion.div
            className="relative lg:min-h-[560px]"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 32 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            {/* Soft glow behind card */}
            <div className="absolute inset-0 -z-10 scale-[0.88] rounded-[2rem] bg-gradient-to-br from-violet-300/40 via-cyan-200/30 to-emerald-200/30 blur-3xl" />

            {/* Main card */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.1)]">
              {/* Card header bar */}
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                <span className="ml-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  INSLAB · AI Pipeline
                </span>
              </div>

              {/* Pipeline SVG */}
              <div className="relative h-[380px] w-full bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.06),transparent_60%)]">
                <svg
                  viewBox="0 0 580 400"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="#7c3aed" stopOpacity="0.4" />
                      <stop offset="50%"  stopColor="#0891b2" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Edges */}
                  {pipelineEdges.map((edge) => (
                    <line
                      key={edge.id}
                      x1={edge.from[0]} y1={edge.from[1]}
                      x2={edge.to[0]}   y2={edge.to[1]}
                      stroke="url(#edgeGrad)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  ))}

                  {/* Animated data packets */}
                  {!shouldReduceMotion &&
                    packets.map((packet) => (
                      <g key={`pkt-${packet.id}`}>
                        <motion.circle
                          r="5"
                          fill="rgba(124,58,237,0.2)"
                          animate={{
                            cx: [packet.from[0], packet.to[0]],
                            cy: [packet.from[1], packet.to[1]],
                            opacity: [0, 0.8, 0],
                            scale: [0.6, 1.3, 0.6],
                          }}
                          transition={{ duration: packet.duration, delay: packet.delay, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle
                          r="2.5"
                          fill="#7c3aed"
                          animate={{
                            cx: [packet.from[0], packet.to[0]],
                            cy: [packet.from[1], packet.to[1]],
                            opacity: [0, 1, 0],
                          }}
                          transition={{ duration: packet.duration, delay: packet.delay, repeat: Infinity, ease: "linear" }}
                        />
                      </g>
                    ))}

                  {/* Nodes */}
                  {pipelineNodes.map((node, i) => {
                    const c = nodeColors[i % nodeColors.length];
                    return (
                      <g key={node.id}>
                        <motion.circle
                          cx={node.x} cy={node.y} r="20"
                          fill={c}
                          opacity="0.08"
                          animate={
                            shouldReduceMotion ? undefined
                            : { r: [16, 26, 16], opacity: [0.06, 0.16, 0.06] }
                          }
                          transition={{ duration: 3.2, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <circle cx={node.x} cy={node.y} r="11" fill="white" stroke={c} strokeWidth="2" />
                        <circle cx={node.x} cy={node.y} r="5"  fill={c} opacity="0.9" />
                        <text
                          x={node.x} y={node.y + 26}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#64748b"
                          fontFamily="system-ui, sans-serif"
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating badges */}
                <motion.div
                  className="absolute top-5 right-5 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-2.5 shadow-sm"
                  animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-[10px] font-semibold tracking-widest text-violet-500 uppercase">AI System</div>
                  <div className="mt-0.5 text-sm font-bold text-slate-800">Model Active</div>
                </motion.div>

                <motion.div
                  className="absolute bottom-5 right-5 rounded-xl border border-cyan-200 bg-cyan-50 px-3.5 py-2.5 shadow-sm"
                  animate={shouldReduceMotion ? undefined : { y: [0, 7, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="text-[10px] font-semibold tracking-widest text-cyan-600 uppercase">AIoT Nodes</div>
                  <div className="mt-0.5 text-sm font-bold text-slate-800">128 Online</div>
                </motion.div>
              </div>

              {/* Terminal / log panel */}
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-semibold tracking-widest text-emerald-600 uppercase">
                    MLOps Pipeline
                  </span>
                </div>
                <div className="space-y-1 font-mono text-[11px]">
                  {logLines.map((line, i) => (
                    <motion.div
                      key={i}
                      className={line.color}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.18, duration: 0.4 }}
                    >
                      {line.text}
                    </motion.div>
                  ))}
                  {!shouldReduceMotion && (
                    <motion.span
                      className="inline-block h-3.5 w-1.5 bg-slate-400"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Floating stat chip outside card */}
            <motion.div
              className="absolute -left-8 top-1/3 hidden rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-lg lg:block"
              animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="text-[10px] font-semibold tracking-widest text-emerald-600 uppercase">Accuracy</div>
              <div className="text-xl font-bold text-slate-900">97.8%</div>
              <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                  style={{ width: "92%" }}
                  animate={shouldReduceMotion ? undefined : { width: ["88%", "97%", "88%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
