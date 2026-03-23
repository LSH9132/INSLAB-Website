"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Member } from "@/lib/content";
import { MemberCard } from "./member-card";
import { teamStaggerContainer } from "@/lib/motion/team-variants";

import type { TeamDict } from "@/types/messages";
import { type FloatingShape, renderShape, EASE_SMOOTH } from "@/lib/shapes";

type TeamGridDictionary = TeamDict;

type TeamGridProps = {
  graduate: Member[];
  undergraduate: Member[];
  locale: string;
  dict: TeamGridDictionary;
};

const ease = EASE_SMOOTH;

/* ── Section component ─────────────────────────────────────── */

function MemberSection({
  members,
  title,
  sectionNum,
  bgClass,
  locale,
  roleLabels,
  shapes,
}: {
  members: Member[];
  title: string;
  sectionNum: string;
  bgClass: string;
  locale: string;
  roleLabels: Record<string, string>;
  shapes: FloatingShape[];
}) {
  const rm = useReducedMotion();

  if (members.length === 0) return null;

  return (
    <section className={`relative isolate overflow-hidden ${bgClass} py-24 sm:py-32`}>
      {/* ── Background — floating shapes ── */}
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
          {!rm &&
            shapes.map((s, i) => (
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
                    translateY: [s.cy, s.cy - 50],
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
        {/* ── Section header — anime numbered ── */}
        <motion.div
          className="mb-14 flex items-center gap-3"
          initial={rm ? false : { opacity: 0, x: -20 }}
          whileInView={rm ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="font-mono text-[10px] font-bold text-blue-400">
            {sectionNum}
          </span>
          <span className="h-px w-8 bg-blue-400/40" />
          <span className="text-sm font-semibold tracking-widest text-slate-400 uppercase">
            {title}
          </span>
        </motion.div>

        {/* ── Card grid with corner marks ── */}
        <div className="relative">
          {/* Corner marks — double lines */}
          <motion.span
            className="absolute -top-3 -left-3"
            initial={rm ? false : { opacity: 0 }}
            whileInView={rm ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
            aria-hidden
          >
            <span className="absolute top-0 left-0 h-5 w-5 border-t-[3px] border-l-[3px] border-blue-500/15 sm:h-6 sm:w-6" />
            <span className="absolute top-1.5 left-1.5 h-3 w-3 border-t-[2px] border-l-[2px] border-blue-500/8 sm:h-4 sm:w-4" />
          </motion.span>
          <motion.span
            className="absolute -right-3 -bottom-3"
            initial={rm ? false : { opacity: 0 }}
            whileInView={rm ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3, ease }}
            aria-hidden
          >
            <span className="absolute right-0 bottom-0 h-5 w-5 border-r-[3px] border-b-[3px] border-blue-500/15 sm:h-6 sm:w-6" />
            <span className="absolute right-1.5 bottom-1.5 h-3 w-3 border-r-[2px] border-b-[2px] border-blue-500/8 sm:h-4 sm:w-4" />
          </motion.span>

          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={rm ? false : "hidden"}
            whileInView={rm ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
            variants={teamStaggerContainer}
          >
            {members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                locale={locale}
                roleLabel={roleLabels[member.role]}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Floating shapes per section ───────────────────────────── */

const graduateShapes: FloatingShape[] = [
  { x: 15, cy: 85, size: 0.8, dur: 14, delay: 0,   shape: "fourStar", color: "#3b82f6", spin: 10 },
  { x: 85, cy: 78, size: 0.6, dur: 11, delay: 2,   shape: "diamond",  color: "#06b6d4", spin: 16 },
  { x: 50, cy: 90, size: 0.5, dur: 12, delay: 4,   shape: "ring",     color: "#8b5cf6" },
  { x: 30, cy: 88, size: 0.7, dur: 13, delay: 1.5, shape: "triangle", color: "#06b6d4", spin: 14 },
  { x: 70, cy: 82, size: 0.5, dur: 10, delay: 5,   shape: "fourStar", color: "#8b5cf6", spin: 12 },
];

const undergradShapes: FloatingShape[] = [
  { x: 20, cy: 82, size: 0.7, dur: 12, delay: 1,   shape: "diamond",  color: "#8b5cf6", spin: 18 },
  { x: 80, cy: 88, size: 0.6, dur: 14, delay: 0,   shape: "fourStar", color: "#3b82f6", spin: 10 },
  { x: 45, cy: 92, size: 0.5, dur: 11, delay: 3,   shape: "triangle", color: "#06b6d4", spin: 15 },
  { x: 65, cy: 80, size: 0.6, dur: 13, delay: 2.5, shape: "ring",     color: "#3b82f6" },
  { x: 10, cy: 90, size: 0.5, dur: 10, delay: 5,   shape: "diamond",  color: "#06b6d4", spin: 20 },
];

/* ── Main export ───────────────────────────────────────────── */

export function TeamGrid({
  graduate,
  undergraduate,
  locale,
  dict,
}: TeamGridProps) {
  const roleLabels: Record<string, string> = {
    Professor: dict.roles.professor,
    PhD: dict.roles.phd,
    MS: dict.roles.ms,
    BS: dict.roles.bs,
  };

  return (
    <>
      <MemberSection
        members={graduate}
        title={dict.sections.graduate}
        sectionNum="03"
        bgClass="bg-white"
        locale={locale}
        roleLabels={roleLabels}
        shapes={graduateShapes}
      />
      <MemberSection
        members={undergraduate}
        title={dict.sections.undergraduate}
        sectionNum="04"
        bgClass="bg-white"
        locale={locale}
        roleLabels={roleLabels}
        shapes={undergradShapes}
      />
    </>
  );
}
