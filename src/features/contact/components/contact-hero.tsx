"use client";

import type { Variants } from "motion/react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useCallback, useRef } from "react";

import { Link } from "@/i18n/navigation";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";
import { staggerContainerVariants } from "@/lib/motion/fade-up";
import { EASE_SMOOTH } from "@/lib/shapes";

import { DataFlowGrid } from "./data-flow-grid";

type ContactHeroDictionary = {
  eyebrow: string;
  title: string;
  body: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const ease = EASE_SMOOTH;

const STATIC_BG =
  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(5,150,105,0.05), transparent 70%)";

/* ── Animation variants ── */

const eyebrowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

const bodyVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease },
  },
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease },
  },
};

/* ── Component ── */

export function ContactHero({ hero }: { hero: ContactHeroDictionary }) {
  const rm = useReducedMotion();
  const { smoothX, smoothY, isActive, handleMouseMove, handleMouseLeave } =
    useMousePosition({ stiffness: 120, damping: 18 });

  const clickRipples = useRef<{ x: number; y: number; birth: number }[]>([]);
  const elapsedRef = useRef(0);

  /* Mouse-following gradient glow */
  const glowBg = useTransform(
    [smoothX, smoothY],
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 500px 400px at ${x}px ${y}px, rgba(5,150,105,0.10), transparent 70%),` +
      `radial-gradient(ellipse 280px 280px at ${x}px ${y}px, rgba(245,158,11,0.05), transparent 60%),` +
      `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(5,150,105,0.04), transparent 70%)`,
  );

  /* Click ripple handler */
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (rm) return;
      const section = e.currentTarget;
      const svg = section.querySelector("svg");
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const containerAspect = rect.width / rect.height;
      const viewBoxAspect = 1200 / 380;
      let scale: number, offsetX: number, offsetY: number;
      if (containerAspect > viewBoxAspect) {
        scale = rect.width / 1200;
        offsetX = 0;
        offsetY = (rect.height - 380 * scale) / 2;
      } else {
        scale = rect.height / 380;
        offsetX = (rect.width - 1200 * scale) / 2;
        offsetY = 0;
      }
      const svgX = (localX - offsetX) / scale;
      const svgY = (localY - offsetY) / scale;
      /* Use a rough elapsed estimate from performance.now */
      clickRipples.current.push({
        x: svgX,
        y: svgY,
        birth: performance.now() / 1000,
      });
      elapsedRef.current = performance.now() / 1000;
    },
    [rm],
  );

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseMove={rm ? undefined : handleMouseMove}
      onMouseLeave={rm ? undefined : handleMouseLeave}
      onClick={rm ? undefined : handleClick}
    >
      {/* ── Layer A: Mouse-following gradient glow ── */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-20 select-none"
        style={{ background: rm ? STATIC_BG : glowBg }}
        aria-hidden
      />

      {/* ── Layer B: Interactive data flow grid ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        <DataFlowGrid
          smoothX={smoothX}
          smoothY={smoothY}
          isActive={isActive}
          clickRipples={clickRipples}
          reducedMotion={!!rm}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:px-10 lg:py-32">
        <motion.div
          className="flex flex-col"
          initial={rm ? false : "hidden"}
          whileInView={rm ? undefined : "visible"}
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants}
        >
          {/* Eyebrow */}
          <motion.div
            className="mb-5 flex items-center gap-2.5"
            variants={eyebrowVariants}
          >
            <motion.span
              className="inline-block h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
              animate={rm ? undefined : { opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase">
              {hero.eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="max-w-2xl text-5xl leading-[1.05] font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
            variants={titleVariants}
          >
            {hero.title}
          </motion.h1>

          {/* Frequency squiggle */}
          <motion.svg
            viewBox="0 0 140 20"
            className="mt-4 mb-6 h-4 w-28 sm:w-36"
            fill="none"
          >
            <motion.path
              d="M0,10 Q7,3 14,10 T28,10 T42,10 T56,10 T70,10 T84,10 T98,10 T112,10 T126,10 T140,10"
              stroke="#059669"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              initial={
                rm
                  ? { pathLength: 1, opacity: 0.5 }
                  : { pathLength: 0, opacity: 0 }
              }
              whileInView={
                rm ? undefined : { pathLength: 1, opacity: 0.5 }
              }
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease }}
            />
          </motion.svg>

          {/* Body */}
          <motion.p
            className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg"
            variants={bodyVariants}
          >
            {hero.body}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
            variants={ctaVariants}
          >
            <a
              href="#contact-info"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/25 transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/35"
            >
              {hero.ctaPrimary}
              <span aria-hidden>→</span>
            </a>
            <Link
              href="/research"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-8 py-3.5 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-colors hover:border-emerald-300 hover:bg-white hover:text-slate-900"
            >
              {hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
