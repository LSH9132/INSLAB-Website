"use client";

import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion/fade-up";
import type { ResearchArea } from "@/lib/content";

type ResearchAreaSectionProps = {
  area: ResearchArea;
  locale: string;
  index: number;
  dict: {
    keywords: string;
    representativePapers: string;
  };
  className?: string;
};

const colorMap: Record<
  string,
  { icon: string; badge: string; hover: string }
> = {
  "intelligent-networking": {
    icon: "text-blue-600",
    badge: "bg-blue-50 text-blue-700",
    hover: "hover:bg-white",
  },
  "distributed-ai": {
    icon: "text-teal-600",
    badge: "bg-teal-50 text-teal-700",
    hover: "hover:bg-white",
  },
  "cyber-physical-systems": {
    icon: "text-violet-600",
    badge: "bg-violet-50 text-violet-700",
    hover: "hover:bg-white",
  },
};

function NetworkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="2" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="22" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="2" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="22" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ChipIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M9 5v14M15 5v14M5 9h14M5 15h14" />
      <path d="M2 9h3M2 15h3M19 9h3M19 15h3M9 2v3M15 2v3M9 19v3M15 19v3" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l8 4v6c0 5.5-3.8 10.7-8 12-4.2-1.3-8-6.5-8-12V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const iconComponents: Record<string, React.FC<{ className?: string }>> = {
  "intelligent-networking": NetworkIcon,
  "distributed-ai": ChipIcon,
  "cyber-physical-systems": ShieldIcon,
};

export function ResearchAreaSection({
  area,
  locale,
  index,
  dict,
  className,
}: ResearchAreaSectionProps) {
  const title = locale === "ko" ? area.title.ko : area.title.en;
  const description = locale === "ko" ? area.description.ko : area.description.en;
  const firstParagraph = description.split("\n\n")[0];
  const colors = colorMap[area.id] ?? {
    icon: "text-slate-600",
    badge: "bg-slate-50 text-slate-700",
    hover: "hover:bg-white",
  };
  const number = String(index + 1).padStart(2, "0");
  const IconComponent = iconComponents[area.id];

  return (
    <motion.div
      id={area.id}
      className={`group flex scroll-mt-28 flex-col justify-between rounded-xl border border-slate-200/50 bg-slate-50/80 p-8 transition-all duration-300 ${colors.hover} ${className ?? ""}`}
      variants={fadeUpVariants}
    >
      <div>
        {/* Header: icon + number */}
        <div className="mb-10 flex items-start justify-between">
          <div className={`rounded-lg bg-white p-3 shadow-sm ${colors.icon}`}>
            {IconComponent && <IconComponent className="h-7 w-7" />}
          </div>
          <span className="select-none text-4xl font-extrabold text-slate-200/80">
            {number}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-700">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-slate-500">
          {firstParagraph}
        </p>

        {/* Keywords */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {area.keywords.slice(0, 5).map((kw) => (
            <span
              key={kw}
              className={`rounded-sm px-2 py-0.5 text-[11px] font-medium ${colors.badge}`}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Representative Papers */}
      <div className="border-t border-slate-200/60 pt-5">
        <h4 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
          {dict.representativePapers}
        </h4>
        <ul className="space-y-2">
          {area.papers.map((paper, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[9px] font-bold text-slate-600">
                {i + 1}
              </span>
              <div>
                <p className="font-serif text-xs leading-snug font-medium text-slate-700">
                  {paper.title}
                </p>
                <p className="text-[10px] text-slate-400">
                  {paper.venue} ({paper.year})
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
