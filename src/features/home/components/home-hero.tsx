"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { Link } from "@/i18n/navigation";

type HeroDictionary = {
  eyebrow: string;
  headlineLines: string[][];
  accentWords: string[];
  subCopy: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];
};

/* ------------------------------------------------------------------ */
/* Pipeline topology (unchanged — purely visual)                        */
/* ------------------------------------------------------------------ */

const PIPE_Y  = 240;
const FEED_Y  = 130;

const pipeNodes = [
  { id: "edge",    x: 260,  y: PIPE_Y, label: "Edge AI",  color: "#0d9488" },
  { id: "ingest",  x: 490,  y: PIPE_Y, label: "Ingest",   color: "#2563eb" },
  { id: "train",   x: 720,  y: PIPE_Y, label: "Train",    color: "#7c3aed" },
  { id: "deploy",  x: 980,  y: PIPE_Y, label: "Deploy",   color: "#059669" },
];

const sensors = [
  { id: "s1", x: 60, y: 100 },
  { id: "s2", x: 60, y: 190 },
  { id: "s3", x: 60, y: 280 },
  { id: "s4", x: 60, y: 370 },
];

const targets = [
  { id: "t1", x: 1200, y: 160, label: "Production" },
  { id: "t2", x: 1200, y: 290, label: "Staging"    },
  { id: "t3", x: 1200, y: 420, label: "Edge Fleet"  },
];

const mainEdges = [
  { id: "me1", d: `M 260 ${PIPE_Y} L 490 ${PIPE_Y}`, delay: 0.8 },
  { id: "me2", d: `M 490 ${PIPE_Y} L 720 ${PIPE_Y}`, delay: 1.1 },
  { id: "me3", d: `M 720 ${PIPE_Y} L 980 ${PIPE_Y}`, delay: 1.4 },
];

const sensorEdges = sensors.map((s, i) => ({
  id: `se${i}`,
  d: `M ${s.x} ${s.y} L 140 ${s.y} L 140 ${PIPE_Y} L 260 ${PIPE_Y}`,
  delay: i * 0.18,
}));

const targetEdges = targets.map((t, i) => ({
  id: `te${i}`,
  d: `M 980 ${PIPE_Y} L 1100 ${PIPE_Y} L 1100 ${t.y} L ${t.x} ${t.y}`,
  delay: 1.7 + i * 0.15,
}));

const feedbackPath = {
  id: "feedback",
  d: `M 980 ${PIPE_Y} L 980 ${FEED_Y} L 720 ${FEED_Y} L 720 ${PIPE_Y}`,
  delay: 2.0,
};

const allEdges = [...sensorEdges, ...mainEdges, ...targetEdges, feedbackPath];

const packets = [
  ...sensors.map((s, i) => ({
    id: `pk-s${i}`, delay: 2.5 + i * 0.4, dur: 1.8 + i * 0.2,
    xs: [s.x, 140, 140, 260], ys: [s.y, s.y, PIPE_Y, PIPE_Y],
  })),
  { id: "pk-m1", delay: 3.0, dur: 1.4, xs: [260, 490],  ys: [PIPE_Y, PIPE_Y] },
  { id: "pk-m2", delay: 3.3, dur: 1.4, xs: [490, 720],  ys: [PIPE_Y, PIPE_Y] },
  { id: "pk-m3", delay: 3.6, dur: 1.4, xs: [720, 980],  ys: [PIPE_Y, PIPE_Y] },
  ...targets.map((t, i) => ({
    id: `pk-t${i}`, delay: 4.0 + i * 0.3, dur: 1.6,
    xs: [980, 1100, 1100, t.x], ys: [PIPE_Y, PIPE_Y, t.y, t.y],
  })),
  { id: "pk-fb", delay: 3.8, dur: 2.0,
    xs: [980,  980,  720,  720],
    ys: [PIPE_Y, FEED_Y, FEED_Y, PIPE_Y] },
];

const logLines = [
  { text: "epoch 24/50  loss: 0.032", x: "30%", y: "74%", delay: 2.8 },
  { text: "✓ 128 sensors online",     x: "6%",  y: "46%", delay: 3.2 },
  { text: "model v2.4 → production",  x: "74%", y: "26%", delay: 3.6 },
  { text: "accuracy: 97.8%  ↑ +0.3",  x: "64%", y: "78%", delay: 4.0 },
];

const wordVar = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
};
const lineVar  = { hidden: {}, visible: { transition: { staggerChildren: 0.055 } } };
const headVar  = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };

export function HomeHero({ hero }: { hero: HeroDictionary }) {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0.5);

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
  }

  const accentSet = new Set(hero.accentWords);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative isolate overflow-hidden border-b border-slate-100 bg-white"
    >
      {/* ── Background ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 -z-10 select-none" aria-hidden>

        <div
          className="absolute inset-0 opacity-[0.32]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="absolute -top-40 -left-20 h-[440px] w-[440px] rounded-full bg-teal-100/70 blur-[120px]" />
        <div className="absolute -top-32 right-0 h-[380px] w-[380px] rounded-full bg-violet-100/65 blur-[110px]" />
        <div className="absolute bottom-0 left-1/2 h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-blue-100/55 blur-[100px]" />

        <svg
          viewBox="0 0 1400 480"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {allEdges.map((edge) => (
            <motion.path
              key={edge.id}
              d={edge.d}
              stroke={edge.id === "feedback" ? "#7c3aed" : "#dde6f0"}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={edge.id === "feedback" ? "5 4" : undefined}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: edge.delay, ease: "easeInOut" }}
            />
          ))}

          {!shouldReduceMotion &&
            packets.map((pk) => (
              <motion.circle
                key={pk.id}
                r="3.5"
                fill={pk.id.includes("fb") ? "#7c3aed" : pk.id.includes("s") ? "#0d9488" : "#2563eb"}
                animate={{
                  cx: pk.xs,
                  cy: pk.ys,
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: pk.dur,
                  delay: pk.delay,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: "linear",
                  times: [0, 0.08, 0.88, 1],
                }}
              />
            ))}

          {sensors.map((s, i) => (
            <g key={s.id}>
              <motion.rect
                x={s.x - 10} y={s.y - 10} width={20} height={20} rx={4}
                fill="white" stroke="#0d9488" strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.15 + i * 0.12 }}
              />
              <motion.rect
                x={s.x - 5} y={s.y - 5} width={10} height={10} rx={2}
                fill="#0d9488" opacity={0.8}
                initial={{ opacity: 0 }} animate={{ opacity: 0.8 }}
                transition={{ delay: 0.3 + i * 0.12 }}
              />
              {!shouldReduceMotion && (
                <motion.rect
                  x={s.x - 14} y={s.y - 14} width={28} height={28} rx={6}
                  stroke="#0d9488" strokeWidth="1" fill="none"
                  animate={{ opacity: [0.3, 0, 0.3], scale: [1, 1.6, 1] }}
                  transition={{ duration: 2.4, delay: i * 0.3, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <text x={s.x} y={s.y + 26} textAnchor="middle" fontSize="10"
                fill="#64748b" fontFamily="system-ui, sans-serif">Sensor {i + 1}</text>
            </g>
          ))}

          {pipeNodes.map((node, i) => (
            <g key={node.id}>
              {!shouldReduceMotion && (
                <motion.circle cx={node.x} cy={node.y} r={20}
                  fill={node.color} opacity={0.1}
                  animate={{ r: [16, 26, 16], opacity: [0.08, 0.18, 0.08] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <motion.circle cx={node.x} cy={node.y} r={13}
                fill="white" stroke={node.color} strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.9 + i * 0.18 }}
              />
              <motion.circle cx={node.x} cy={node.y} r={6}
                fill={node.color}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 1.0 + i * 0.18 }}
              />
              <text x={node.x} y={node.y + 30} textAnchor="middle" fontSize="11"
                fill="#64748b" fontFamily="system-ui, sans-serif" fontWeight="500">
                {node.label}
              </text>
            </g>
          ))}

          {targets.map((t, i) => (
            <g key={t.id}>
              <motion.rect
                x={t.x - 11} y={t.y - 11} width={22} height={22} rx={4}
                fill="white" stroke="#059669" strokeWidth="1.5"
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 2.0 + i * 0.15 }}
              />
              <motion.rect
                x={t.x - 5} y={t.y - 5} width={10} height={10} rx={2}
                fill="#059669" opacity={0.85}
                initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
                transition={{ delay: 2.1 + i * 0.15 }}
              />
              <text x={t.x + 18} y={t.y + 4} fontSize="10"
                fill="#64748b" fontFamily="system-ui, sans-serif">{t.label}</text>
            </g>
          ))}

          <motion.text
            x={852} y={FEED_Y - 8}
            textAnchor="middle" fontSize="10"
            fill="#7c3aed" fontFamily="system-ui, sans-serif" fontWeight="600"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          >
            MLOps loop
          </motion.text>
        </svg>

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

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(255,255,255,0.85)_30%,rgba(255,255,255,0.2)_100%)]" />
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24 lg:px-8 lg:pb-36 lg:pt-36">

        {/* Eyebrow */}
        <motion.div
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3.5 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-slate-500 uppercase shadow-sm backdrop-blur-sm sm:mb-8 sm:gap-2.5 sm:px-5 sm:py-2 sm:text-[11px] sm:tracking-[0.25em]"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.span className="relative flex size-1.5">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-teal-500"
              animate={{ scale: [1, 2.4, 1], opacity: [0.9, 0, 0.9] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative inline-flex size-1.5 rounded-full bg-teal-500" />
          </motion.span>
          {hero.eyebrow}
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-[2rem] font-bold leading-[1.12] tracking-[-0.03em] text-slate-950 sm:text-5xl sm:leading-[1.1] sm:tracking-[-0.04em] lg:text-[5.2rem] lg:leading-[1.06]"
          variants={headVar}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          {hero.headlineLines.map((words, li) => (
            <motion.span key={li} className="block" variants={lineVar}>
              {words.map((word, wi) => (
                <motion.span
                  key={`${li}-${wi}`}
                  className={`inline-block ${accentSet.has(word) ? "text-blue-600" : ""}`}
                  style={{ marginRight: wi < words.length - 1 ? "0.3em" : 0 }}
                  variants={wordVar}
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:mt-7 sm:text-base sm:leading-8"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          {hero.subCopy}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
        >
          <Link
            href="/publications"
            className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition-shadow hover:shadow-lg hover:shadow-blue-500/35 sm:w-auto"
          >
            <motion.span
              className="absolute inset-0 bg-blue-700"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
            <span className="relative">{hero.ctaPrimary}</span>
            <span className="relative transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <a
            href="#mission"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-8 py-3.5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 sm:w-auto"
          >
            {hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mx-auto mt-10 h-px w-48 bg-gradient-to-r from-transparent via-slate-200 to-transparent sm:mt-16 sm:w-64"
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2, ease: "easeInOut" }}
        />

        {/* Stats */}
        <motion.div
          className="mt-8 flex justify-center gap-8 sm:mt-10 sm:gap-12 lg:gap-16"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          {hero.stats.map((s, i) => (
            <motion.div
              key={s.label} className="text-center"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.4 + i * 0.1, ease: "easeOut" }}
            >
              <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-[11px] font-medium tracking-wide text-slate-400 sm:mt-1.5 sm:text-xs">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
