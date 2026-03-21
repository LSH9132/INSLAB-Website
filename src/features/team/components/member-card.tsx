"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Member } from "../data/members";

const avatarColors = [
  "bg-blue-600",
  "bg-teal-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-emerald-600",
  "bg-indigo-600",
];

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

type MemberCardProps = {
  member: Member;
  locale: string;
  large?: boolean;
  roleLabel: string;
  directorLink?: string;
};

export function MemberCard({
  member,
  locale,
  large = false,
  roleLabel,
  directorLink,
}: MemberCardProps) {
  const displayName = locale === "ko" ? member.name.ko : member.name.en;
  const initials = getInitials(member.name.en);
  const colorClass = getAvatarColor(member.id);

  const card = (
    <div
      className={`group relative flex flex-col items-center rounded-2xl border border-slate-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg ${
        large ? "bg-stone-50 p-8 sm:flex-row sm:items-start sm:gap-8" : "bg-white"
      }`}
    >
      {/* Avatar */}
      <div
        className={`relative flex-shrink-0 overflow-hidden rounded-full ring-2 ring-white ring-offset-2 ${
          large ? "mb-4 h-28 w-28 sm:mb-0 sm:h-36 sm:w-36" : "mb-4 h-20 w-20"
        }`}
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
            className={`flex h-full w-full items-center justify-center ${colorClass} text-white ${
              large ? "text-3xl font-bold" : "text-xl font-semibold"
            }`}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`flex flex-col ${large ? "sm:py-2" : "items-center text-center"}`}>
        <h3
          className={`font-bold text-slate-900 ${
            large ? "text-xl" : "text-base"
          }`}
        >
          {displayName}
        </h3>
        <p className="mt-1 text-sm font-medium text-accent">{roleLabel}</p>

        {member.interests.length > 0 && (
          <div className={`mt-3 flex flex-wrap gap-1.5 ${large ? "" : "justify-center"}`}>
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
            className="mt-3 text-xs text-slate-400 hover:text-accent"
          >
            {member.email}
          </a>
        )}

        {large && directorLink && (
          <span className="mt-4 text-xs font-semibold text-accent group-hover:underline">
            {directorLink} →
          </span>
        )}
      </div>
    </div>
  );

  if (large) {
    return <Link href="/director">{card}</Link>;
  }

  return card;
}
