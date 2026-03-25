"use client";

import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";

type FooterCtaProps = {
  title: string;
  description: string;
  linkText: string;
};

/* ── Pulse rings expanding from bottom-right ──────────────────── */
const rings = [
  { delay: 0, maxR: 180 },
  { delay: 1.8, maxR: 220 },
  { delay: 3.6, maxR: 260 },
];

/* ── Sparkle particles ────────────────────────────────────────── */
const sparkles = [
  { cx: 18, cy: 22, dur: 3.0, delay: 0 },
  { cx: 72, cy: 15, dur: 2.4, delay: 1.2 },
  { cx: 35, cy: 70, dur: 2.8, delay: 0.6 },
  { cx: 82, cy: 55, dur: 3.2, delay: 2.0 },
  { cx: 55, cy: 40, dur: 2.6, delay: 3.0 },
  { cx: 12, cy: 85, dur: 2.2, delay: 1.8 },
  { cx: 90, cy: 80, dur: 3.4, delay: 0.4 },
  { cx: 45, cy: 12, dur: 2.0, delay: 2.6 },
];

export function FooterCta({ title, description, linkText }: FooterCtaProps) {
  const rm = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6">
      {/* ── Animated background ───────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden
      >
        {/* Ambient gradient blobs — drifting */}
        <motion.div
          className="absolute -top-8 -left-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl"
          animate={
            rm
              ? undefined
              : { x: [0, 20, -10, 0], y: [0, 15, -5, 0], scale: [1, 1.2, 0.9, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-6 top-1/4 h-28 w-28 rounded-full bg-violet-400/20 blur-2xl"
          animate={
            rm
              ? undefined
              : { x: [0, -15, 10, 0], y: [0, -10, 20, 0], scale: [1, 0.85, 1.15, 1] }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-6 left-1/3 h-24 w-24 rounded-full bg-blue-300/15 blur-2xl"
          animate={
            rm
              ? undefined
              : { x: [0, 10, -20, 0], y: [0, -15, 5, 0], scale: [1, 1.1, 0.95, 1] }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Signal rings — expanding from bottom-right */}
          {!rm &&
            rings.map((r, i) => (
              <motion.circle
                key={`ring${i}`}
                cx={85}
                cy={85}
                fill="none"
                stroke="white"
                strokeWidth={0.4}
                initial={{ r: 0, opacity: 0.35 }}
                animate={{ r: r.maxR / 3, opacity: 0 }}
                transition={{
                  duration: 4,
                  delay: r.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}

          {/* Sparkle particles — twinkling */}
          {sparkles.map((s, i) => (
            <motion.g key={`sk${i}`}>
              {/* Star shape */}
              <motion.path
                d={`M${s.cx},${s.cy - 1.2} L${s.cx + 0.3},${s.cy - 0.3} L${s.cx + 1.2},${s.cy} L${s.cx + 0.3},${s.cy + 0.3} L${s.cx},${s.cy + 1.2} L${s.cx - 0.3},${s.cy + 0.3} L${s.cx - 1.2},${s.cy} L${s.cx - 0.3},${s.cy - 0.3}Z`}
                fill="white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  rm
                    ? { opacity: 0.2 }
                    : {
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1.2, 0.5],
                      }
                }
                transition={{
                  duration: s.dur,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          ))}
        </svg>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/70">
          {title}
        </p>
        <p className="mb-5 text-sm leading-relaxed text-blue-100">
          {description}
        </p>
        <Link
          href="/join"
          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-lg shadow-indigo-900/20 transition-all hover:bg-blue-50 hover:shadow-xl hover:shadow-indigo-900/30"
        >
          {linkText}
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
