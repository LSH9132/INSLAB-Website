"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cardVariants } from "@/lib/motion/team-variants";

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

type MemberCardProps = {
  member: {
    id: string;
    name: { ko: string; en: string };
    photo: string;
    interests: string[];
    email?: string;
  };
  locale: string;
  roleLabel: string;
};

export function MemberCard({
  member,
  locale,
  roleLabel,
}: MemberCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const displayName = locale === "ko" ? member.name.ko : member.name.en;
  const initials = getInitials(member.name.en);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      variants={cardVariants}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
              boxShadow:
                "0 8px 24px -8px rgba(0,0,0,0.08), 0 2px 8px -2px rgba(0,0,0,0.04)",
              transition: { type: "spring", stiffness: 300, damping: 24 },
            }
      }
    >
      {/* Top gradient accent line - fades in on hover */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-teal-400 via-blue-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-semibold bg-slate-200 text-slate-400">
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col p-5">
        {/* Name + role on same line */}
        <div className="flex items-center gap-2.5">
          <h3 className="font-serif text-lg font-semibold tracking-tight text-slate-900">
            {displayName}
          </h3>
          <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
            {roleLabel}
          </span>
        </div>

        {member.interests.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {member.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-2.5 text-xs text-slate-400 transition-colors hover:text-teal-600"
          >
            {member.email}
          </a>
        )}
      </div>
    </motion.div>
  );
}
