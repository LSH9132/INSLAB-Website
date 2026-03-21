"use client";

import { motion } from "motion/react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion/fade-up";
import type { Member } from "../data/members";
import { MemberCard } from "./member-card";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TeamGridDictionary = any;
/* eslint-enable @typescript-eslint/no-explicit-any */

type TeamGridProps = {
  professor: Member;
  graduate: Member[];
  undergraduate: Member[];
  locale: string;
  dict: TeamGridDictionary;
};

export function TeamGrid({
  professor,
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
    <div className="space-y-16">
      {/* Director */}
      <motion.section
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
          variants={fadeUpVariants}
        >
          <span className="h-6 w-1.5 rounded-full bg-accent" />
          {dict.sections.director}
        </motion.h2>
        <motion.div className="max-w-2xl" variants={fadeUpVariants}>
          <MemberCard
            member={professor}
            locale={locale}
            large
            roleLabel={roleLabels[professor.role]}
            directorLink={dict.viewProfile}
          />
        </motion.div>
      </motion.section>

      {/* Graduate Students */}
      {graduate.length > 0 && (
        <motion.section
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
            variants={fadeUpVariants}
          >
            <span className="h-6 w-1.5 rounded-full bg-teal-500" />
            {dict.sections.graduate}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {graduate.map((member) => (
              <motion.div key={member.id} variants={fadeUpVariants}>
                <MemberCard
                  member={member}
                  locale={locale}
                  roleLabel={roleLabels[member.role]}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Undergraduate Researchers */}
      {undergraduate.length > 0 && (
        <motion.section
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900"
            variants={fadeUpVariants}
          >
            <span className="h-6 w-1.5 rounded-full bg-violet-500" />
            {dict.sections.undergraduate}
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {undergraduate.map((member) => (
              <motion.div key={member.id} variants={fadeUpVariants}>
                <MemberCard
                  member={member}
                  locale={locale}
                  roleLabel={roleLabels[member.role]}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
