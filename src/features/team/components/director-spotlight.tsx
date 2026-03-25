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

type DirectorSpotlightProps = {
  member: Member;
  locale: string;
  sectionTitle: string;
  roleLabel: string;
  viewProfileLabel: string;
};

export function DirectorSpotlight({
  member,
  locale,
  sectionTitle,
  roleLabel,
  viewProfileLabel,
}: DirectorSpotlightProps) {
  const shouldReduceMotion = useReducedMotion();
  const displayName = locale === "ko" ? member.name.ko : member.name.en;

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-24 sm:py-32">
      {/* Dot pattern background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden>
        <motion.div
          className="absolute top-1/4 left-[8%] h-[380px] w-[380px] rounded-full bg-teal-300/15 blur-[100px]"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute right-[12%] bottom-1/4 h-[320px] w-[320px] rounded-full bg-blue-300/12 blur-[100px]"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -30, 25, 0], y: [0, 25, -35, 0] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 24, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Section label */}
        <motion.h2
          className="mb-12 text-sm font-semibold tracking-widest text-slate-400 uppercase"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true }}
          variants={sectionTitleVariants}
        >
          {sectionTitle}
        </motion.h2>

        {/* 2-column grid */}
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.2 }}
          variants={teamStaggerContainer}
        >
          {/* Photo */}
          <motion.div
            className="group relative mx-auto w-full max-w-sm lg:max-w-none"
            variants={directorPhotoVariants}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
              {/* Glow effect behind photo */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-teal-200/30 to-blue-200/30 blur-2xl transition-all duration-500 group-hover:from-teal-300/40 group-hover:to-blue-300/40" />
              <Image
                src={member.photo}
                alt={displayName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 384px, 50vw"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div className="flex flex-col" variants={directorInfoVariants}>
            <span className="mb-3 inline-block w-fit rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold tracking-widest text-slate-500 uppercase">
              {roleLabel}
            </span>

            <h3 className="font-serif text-4xl font-medium tracking-tight text-slate-900 lg:text-6xl">
              {displayName}
            </h3>

            {member.interests.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {member.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm font-medium text-slate-600"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}

            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="mt-4 text-sm text-slate-400 transition-colors hover:text-slate-700"
              >
                {member.email}
              </a>
            )}

            {/* CTA */}
            <Link
              href="/director"
              className="group/cta mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
            >
              {viewProfileLabel}
              <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                &rarr;
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
