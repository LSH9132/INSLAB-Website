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

const ease = [0.22, 1, 0.36, 1] as const;

export function MemberCard({
  member,
  locale,
  roleLabel,
}: MemberCardProps) {
  const rm = useReducedMotion();
  const displayName = locale === "ko" ? member.name.ko : member.name.en;
  const initials = getInitials(member.name.en);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-lg border border-slate-200/80 bg-white"
      variants={cardVariants}
      whileHover={
        rm
          ? undefined
          : {
              y: -3,
              transition: { type: "spring", stiffness: 300, damping: 24 },
            }
      }
    >
      {/* Corner marks — subtle */}
      <span className="absolute top-2 left-2 h-3 w-3 border-t-[2px] border-l-[2px] border-blue-500/15" aria-hidden />
      <span className="absolute right-2 bottom-2 h-3 w-3 border-r-[2px] border-b-[2px] border-blue-500/15" aria-hidden />

      {/* Photo */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-3xl font-semibold text-slate-300">
            {initials}
          </div>
        )}

        {/* Role badge — overlaid bottom-right */}
        <span className="absolute right-3 bottom-3 rounded border border-white/60 bg-white/90 px-2 py-0.5 text-[10px] font-semibold tracking-widest text-blue-500 uppercase backdrop-blur-sm">
          {roleLabel}
        </span>
      </div>

      {/* Info */}
      <div className="flex flex-col p-5">
        {/* Name */}
        <h3 className="text-lg font-bold tracking-tight text-slate-900">
          {displayName}
        </h3>

        {member.interests.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {member.interests.map((interest) => (
              <span
                key={interest}
                className="rounded border border-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-500"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="mt-2.5 font-mono text-xs text-slate-400 transition-colors hover:text-blue-500"
          >
            {member.email}
          </a>
        )}
      </div>
    </motion.div>
  );
}
