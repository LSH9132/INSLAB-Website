"use client";

import { motion, useReducedMotion } from "motion/react";

type Stat = { value: string; label: string };

type TeamHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
  bodySecond: string;
};

type TeamHeroProps = {
  hero: TeamHeroDictionary;
  stats: Stat[];
};

/* ------------------------------------------------------------------ */
/* Anime-style decorative SVG data                                      */
/* ------------------------------------------------------------------ */

/* Radial speed lines from center */
const speedLines = Array.from({ length: 36 }, (_, i) => {
  const angle = i * 10;
  const rad = (angle * Math.PI) / 180;
  const inner = 8;
  const outer = 48;
  return {
    x1: 50 + Math.cos(rad) * inner,
    y1: 50 + Math.sin(rad) * inner,
    x2: 50 + Math.cos(rad) * outer,
    y2: 50 + Math.sin(rad) * outer,
  };
});

/* Screentone halftone dots — bottom-right fade */
const halftoneDots: { cx: number; cy: number; r: number }[] = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 10; col++) {
    const fade = (row + col) / 16;
    if (fade < 0.6) {
      halftoneDots.push({
        cx: 62 + col * 3.5,
        cy: 65 + row * 3.5,
        r: 0.45 * (1 - fade),
      });
    }
  }
}

/* Brushstroke SVG path — hand-drawn wavy underline */
const brushstrokePath =
  "M 0 8 C 8 3, 16 12, 24 7 S 40 2, 48 8 S 64 14, 72 7 S 88 2, 96 8";

/* Smooth easing */
const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function TeamHero({ hero, stats }: TeamHeroProps) {
  const rm = useReducedMotion();
  const titleWords = hero.title.split(" ");

  return (
    <section className="relative isolate overflow-hidden border-b border-slate-100 bg-white">
      {/* ── Background decorations ───────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        {/* Speed lines + halftone + diagonal cross */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Radial speed lines */}
          {speedLines.map((l, i) => (
            <motion.line
              key={`sp${i}`}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="#94a3b8"
              strokeWidth={i % 3 === 0 ? 0.15 : 0.08}
              opacity={0.04}
              initial={rm ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: i * 0.02, ease: "easeOut" }}
            />
          ))}

          {/* Diagonal cross behind title */}
          <line
            x1="20"
            y1="15"
            x2="80"
            y2="85"
            stroke="#94a3b8"
            strokeWidth="0.12"
            opacity={0.05}
          />
          <line
            x1="80"
            y1="15"
            x2="20"
            y2="85"
            stroke="#94a3b8"
            strokeWidth="0.12"
            opacity={0.05}
          />

          {/* Halftone screentone */}
          {halftoneDots.map((d, i) => (
            <circle
              key={`ht${i}`}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="#94a3b8"
              opacity={0.035}
            />
          ))}
        </svg>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 sm:pt-36 sm:pb-24 lg:px-10">
        {/* ── Title card area with corner marks ── */}
        <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-8 sm:py-14">
          {/* Corner marks — anime UI frame */}
          <motion.span
            className="absolute top-0 left-0 h-5 w-5 border-t-2 border-l-2 border-blue-500/20 sm:h-7 sm:w-7"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            aria-hidden
          />
          <motion.span
            className="absolute top-0 right-0 h-5 w-5 border-t-2 border-r-2 border-blue-500/20 sm:h-7 sm:w-7"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease }}
            aria-hidden
          />
          <motion.span
            className="absolute bottom-0 left-0 h-5 w-5 border-b-2 border-l-2 border-blue-500/20 sm:h-7 sm:w-7"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease }}
            aria-hidden
          />
          <motion.span
            className="absolute right-0 bottom-0 h-5 w-5 border-r-2 border-b-2 border-blue-500/20 sm:h-7 sm:w-7"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.45, ease }}
            aria-hidden
          />

          {/* Eyebrow — centered with dashes */}
          <motion.div
            className="mb-8 flex items-center justify-center gap-3"
            initial={rm ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            <span className="h-px w-6 bg-slate-300" />
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              {hero.eyebrow}
            </span>
            <span className="h-px w-6 bg-slate-300" />
          </motion.div>

          {/* Title — centered, word-by-word stagger */}
          <h1 className="text-center text-6xl font-black leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className="block"
                style={
                  i === titleWords.length - 1
                    ? {
                        WebkitTextStroke: "2px #0f172a",
                        color: "transparent",
                      }
                    : { color: "#0f172a" }
                }
                initial={
                  rm
                    ? false
                    : { opacity: 0, scale: 0.92, filter: "blur(6px)" }
                }
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.12,
                  ease,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Brushstroke underline */}
          <motion.svg
            viewBox="0 0 96 16"
            className="mx-auto mt-4 h-3 w-24 sm:w-28"
            fill="none"
            initial={rm ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <motion.path
              d={brushstrokePath}
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              initial={rm ? undefined : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.svg>
        </div>

        {/* ── Body text — centered column ── */}
        <motion.div
          className="mx-auto mt-6 max-w-xl space-y-3 text-center"
          initial={rm ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
        >
          <p className="text-base leading-relaxed text-slate-500">
            {hero.body}
          </p>
          <p className="text-base leading-relaxed text-slate-400">
            {hero.bodySecond}
          </p>
        </motion.div>

        {/* ── Accent divider ── */}
        <motion.div
          className="mx-auto mt-8 h-px w-12 bg-blue-500/30 sm:mt-10"
          initial={rm ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.65, ease: "easeInOut" }}
        />

        {/* ── Stats — bordered cards ── */}
        {stats.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="min-w-[100px] rounded-lg border border-slate-200 px-6 py-4 text-center"
                initial={rm ? false : { opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                  delay: 0.7 + i * 0.1,
                }}
              >
                <div className="font-mono text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-[10px] font-medium tracking-widest text-blue-500 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Scroll indicator ── */}
        <motion.div
          className="mt-14 flex flex-col items-center gap-2 sm:mt-20"
          initial={rm ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-blue-400/40" />
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.5)]"
            animate={rm ? undefined : { y: [0, 6, 0] }}
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
