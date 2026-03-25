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
      className="group relative flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
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
      {/* Avatar */}
      <div
        className="relative mb-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-slate-100"
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={displayName}
            fill
            className="object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-xl font-semibold bg-slate-200 text-slate-500"
          >
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center">
        <h3 className="font-serif text-lg font-semibold tracking-tight text-slate-900">{displayName}</h3>
        <span
          className="mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-widest bg-slate-100 text-slate-500 uppercase"
        >
          {roleLabel}
        </span>

        {member.interests.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {member.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-600"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-3 text-xs text-slate-400 transition-colors hover:text-slate-700"
          >
            {member.email}
          </a>
        )}
      </div>
    </motion.div>
  );
}
