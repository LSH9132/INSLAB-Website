"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Member } from "@/lib/content";
import { MemberCard } from "./member-card";
import {
  sectionTitleVariants,
  teamStaggerContainer,
  gradientLineVariants,
} from "@/lib/motion/team-variants";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TeamGridDictionary = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

type TeamGridProps = {
  graduate: Member[];
  undergraduate: Member[];
  locale: string;
  dict: TeamGridDictionary;
};

function MemberSection({
  members,
  title,
  bgClass,
  locale,
  roleLabels,
  variant,
}: {
  members: Member[];
  title: string;
  bgClass: string;
  locale: string;
  roleLabels: Record<string, string>;
  variant: "grid" | "dots";
}) {
  const shouldReduceMotion = useReducedMotion();

  if (members.length === 0) return null;

  const patternStyle =
    variant === "grid"
      ? {
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }
      : {
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        };

  const gradientColors =
    variant === "grid"
      ? "from-teal-400 via-blue-400 to-violet-400"
      : "from-violet-400 via-blue-400 to-teal-400";

  return (
    <section className={`relative overflow-hidden ${bgClass} py-24 sm:py-32`}>
      {/* Pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={patternStyle}
      />

      {/* Gradient blob */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden>
        {variant === "grid" ? (
          <div className="absolute top-1/3 right-[10%] h-[350px] w-[350px] rounded-full bg-teal-200/12 blur-[100px]" />
        ) : (
          <div className="absolute bottom-1/4 left-[10%] h-[320px] w-[320px] rounded-full bg-violet-200/12 blur-[100px]" />
        )}
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Section header */}
        <motion.div
          className="mb-14 flex items-center gap-6"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={teamStaggerContainer}
        >
          <motion.div
            className={`h-px w-16 origin-left bg-gradient-to-r ${gradientColors}`}
            variants={gradientLineVariants}
          />
          <motion.h2
            className="font-serif text-2xl font-medium tracking-tight text-slate-700 italic md:text-3xl"
            variants={sectionTitleVariants}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Card grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
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
    </section>
  );
}

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
        bgClass="bg-white"
        locale={locale}
        roleLabels={roleLabels}
        variant="grid"
      />
      <MemberSection
        members={undergraduate}
        title={dict.sections.undergraduate}
        bgClass="bg-slate-50/40"
        locale={locale}
        roleLabels={roleLabels}
        variant="dots"
      />
    </>
  );
}
