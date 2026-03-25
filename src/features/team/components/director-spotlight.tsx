"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { motion, useReducedMotion } from "motion/react";
import type { Member } from "@/lib/content";
import {
  directorPhotoVariants,
  directorInfoVariants,
  sectionTitleVariants,
  teamStaggerContainer,
} from "@/lib/motion/team-variants";
import {
  type FloatingShape,
  renderShape,
  generateHalftoneDots,
  EASE_SMOOTH,
} from "@/lib/shapes";

type DirectorSpotlightProps = {
  member: Member;
  locale: string;
  sectionTitle: string;
  roleLabel: string;
  viewProfileLabel: string;
};

/* Brushstroke SVG path — same style as team hero */
const brushstrokePath =
  "M 0 6 C 6 2, 12 10, 18 5 S 30 1, 36 6 S 48 11, 54 5 S 66 1, 72 6";

const floatingShapes: FloatingShape[] = [
  { x: 10, cy: 85, size: 0.9, dur: 14, delay: 0,   shape: "fourStar", color: "#3b82f6", spin: 10 },
  { x: 90, cy: 78, size: 0.7, dur: 12, delay: 3,   shape: "diamond",  color: "#06b6d4", spin: 18 },
  { x: 55, cy: 92, size: 0.6, dur: 11, delay: 5,   shape: "ring",     color: "#8b5cf6" },
  { x: 75, cy: 88, size: 0.5, dur: 13, delay: 1.5, shape: "triangle", color: "#3b82f6", spin: 15 },
];

const halftoneDots = generateHalftoneDots({
  rows: 6, cols: 8, startCx: 5, startCy: 70, spacing: 3.5, maxFade: 0.55, baseRadius: 0.4,
});

const ease = EASE_SMOOTH;

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export function DirectorSpotlight({
  member,
  locale,
  sectionTitle,
  roleLabel,
  viewProfileLabel,
}: DirectorSpotlightProps) {
  const rm = useReducedMotion();
  const primaryName = locale === "ko" ? member.name.ko : member.name.en;
  const secondaryName = locale === "ko" ? member.name.en : member.name.ko;
  const nameParts = primaryName.split(/(?<=^.)/); // split after first char

  return (
    <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      {/* ── Background — halftone + floating shapes ──────────── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {/* Halftone screentone — bottom-left */}
          <motion.g
            animate={rm ? undefined : { opacity: [1, 1.5, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {halftoneDots.map((d, i) => (
              <circle
                key={`ht${i}`}
                cx={d.cx}
                cy={d.cy}
                r={d.r}
                fill="#94a3b8"
                opacity={0.03}
              />
            ))}
          </motion.g>

          {/* Floating shapes */}
          {!rm &&
            floatingShapes.map((s, i) => (
              <motion.g
                key={`fs${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.12, 0.12, 0] }}
                transition={{
                  duration: s.dur,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.g
                  animate={{
                    translateX: s.x,
                    translateY: [s.cy, s.cy - 60],
                    ...(s.spin ? { rotate: [0, 360] } : {}),
                  }}
                  transition={{
                    translateY: {
                      duration: s.dur,
                      delay: s.delay,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    rotate: s.spin
                      ? { duration: s.spin, repeat: Infinity, ease: "linear" }
                      : undefined,
                  }}
                >
                  {renderShape(s)}
                </motion.g>
              </motion.g>
            ))}
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* ── Section title — anime numbered ── */}
        <motion.div
          className="mb-12 flex items-center gap-3"
          initial={rm ? false : "hidden"}
          whileInView={rm ? undefined : "visible"}
          viewport={{ once: true }}
          variants={sectionTitleVariants}
        >
          <span className="font-mono text-[10px] font-bold text-blue-400">
            02
          </span>
          <span className="h-px w-8 bg-blue-400/40" />
          <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
            {sectionTitle}
          </span>
        </motion.div>

        {/* ── 2-column grid with corner-marked frame ── */}
        <div className="relative">
          {/* Outer corner marks */}
          <motion.span
            className="absolute -top-3 -left-3 h-5 w-5 border-t-2 border-l-2 border-blue-500/15 sm:h-6 sm:w-6"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            aria-hidden
          />
          <motion.span
            className="absolute -top-3 -right-3 h-5 w-5 border-t-2 border-r-2 border-blue-500/15 sm:h-6 sm:w-6"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.35, ease }}
            aria-hidden
          />
          <motion.span
            className="absolute -bottom-3 -left-3 h-5 w-5 border-b-2 border-l-2 border-blue-500/15 sm:h-6 sm:w-6"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4, ease }}
            aria-hidden
          />
          <motion.span
            className="absolute -right-3 -bottom-3 h-5 w-5 border-r-2 border-b-2 border-blue-500/15 sm:h-6 sm:w-6"
            initial={rm ? false : { opacity: 0, scale: 0.3 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45, ease }}
            aria-hidden
          />

          <motion.div
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
            initial={rm ? false : "hidden"}
            whileInView={rm ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={teamStaggerContainer}
          >
            {/* ── Photo with corner marks ── */}
            <motion.div
              className="group relative mx-auto w-full max-w-sm lg:max-w-none"
              variants={directorPhotoVariants}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                {/* Glow effect */}
                <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-blue-200/25 to-cyan-200/25 blur-2xl transition-all duration-500 group-hover:from-blue-300/35 group-hover:to-cyan-300/35" />
                <Image
                  src={member.photo}
                  alt={primaryName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 384px, 50vw"
                />
              </div>

              {/* Photo corner marks */}
              <span
                className="absolute -top-1.5 -left-1.5 h-4 w-4 border-t-2 border-l-2 border-blue-500/25"
                aria-hidden
              />
              <span
                className="absolute -top-1.5 -right-1.5 h-4 w-4 border-t-2 border-r-2 border-blue-500/25"
                aria-hidden
              />
              <span
                className="absolute -bottom-1.5 -left-1.5 h-4 w-4 border-b-2 border-l-2 border-blue-500/25"
                aria-hidden
              />
              <span
                className="absolute -right-1.5 -bottom-1.5 h-4 w-4 border-r-2 border-b-2 border-blue-500/25"
                aria-hidden
              />
            </motion.div>

            {/* ── Info ── */}
            <motion.div
              className="flex flex-col"
              variants={directorInfoVariants}
            >
              {/* Role badge */}
              <span className="mb-3 inline-block w-fit rounded-lg border border-slate-200 px-3 py-1 text-[10px] font-semibold tracking-widest text-blue-500 uppercase">
                {roleLabel}
              </span>

              {/* Name — first char solid, rest outlined + bilingual */}
              <h3 className="text-4xl font-black tracking-tight lg:text-5xl">
                <span className="text-slate-900">{nameParts[0]}</span>
                <span
                  style={{
                    WebkitTextStroke: "1.5px #0f172a",
                    color: "transparent",
                  }}
                >
                  {nameParts[1]}
                </span>{" "}
                <span className="whitespace-nowrap text-2xl font-bold text-slate-400 lg:text-3xl">
                  ({secondaryName})
                </span>
              </h3>

              {/* Brushstroke underline */}
              <motion.svg
                viewBox="0 0 72 12"
                className="mt-2 h-2.5 w-20"
                fill="none"
                initial={rm ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <motion.path
                  d={brushstrokePath}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={rm ? undefined : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>

              {/* Interests */}
              {member.interests.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {member.interests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}

              {/* Email */}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="mt-4 font-mono text-sm text-slate-400 transition-colors hover:text-blue-500"
                >
                  {member.email}
                </a>
              )}

              {/* CTA */}
              <Link
                href="/director"
                className="group/cta mt-8 inline-flex w-fit items-center gap-2 rounded-lg border-2 border-slate-900 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white"
              >
                {viewProfileLabel}
                <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
