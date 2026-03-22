"use client";

import { motion } from "motion/react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion/fade-up";
import type { ResearchArea } from "@/lib/content";

type ResearchAreaSectionProps = {
  area: ResearchArea;
  locale: string;
  index: number;
  dict: {
    keywords: string;
    representativePapers: string;
  };
};

const colorMap: Record<string, { badge: string; border: string; stripe: string }> = {
  "intelligent-networking": {
    badge: "bg-blue-50 text-blue-700",
    border: "border-blue-200",
    stripe: "border-blue-400",
  },
  "distributed-ai": {
    badge: "bg-teal-50 text-teal-700",
    border: "border-teal-200",
    stripe: "border-teal-400",
  },
  "cyber-physical-systems": {
    badge: "bg-violet-50 text-violet-700",
    border: "border-violet-200",
    stripe: "border-violet-400",
  },
};

export function ResearchAreaSection({
  area,
  locale,
  index,
  dict,
}: ResearchAreaSectionProps) {
  const title = locale === "ko" ? area.title.ko : area.title.en;
  const description = locale === "ko" ? area.description.ko : area.description.en;
  const paragraphs = description.split("\n\n");
  const colors = colorMap[area.id] ?? { badge: "bg-slate-50 text-slate-700", border: "border-slate-200", stripe: "border-slate-400" };
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.section
      id={area.id}
      className="scroll-mt-28"
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <motion.div
        className={`relative rounded-2xl border ${colors.border} border-l-4 ${colors.stripe} bg-white p-8 shadow-sm lg:p-10`}
        variants={fadeUpVariants}
      >
        {/* Large number watermark */}
        <span className="pointer-events-none absolute top-6 right-8 text-6xl font-light text-slate-200 font-serif select-none lg:text-7xl">
          {number}
        </span>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">
            {title}
          </h2>
        </div>

        {/* Description paragraphs */}
        <div className="mb-8 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-7 text-slate-600">
              {p}
            </p>
          ))}
        </div>

        {/* Keywords */}
        <div className="mb-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {dict.keywords}
          </h3>
          <div className="flex flex-wrap gap-2">
            {area.keywords.map((kw) => (
              <span
                key={kw}
                className={`rounded-sm px-3 py-1 text-xs font-medium ${colors.badge}`}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Representative Papers */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            {dict.representativePapers}
          </h3>
          <ul className="space-y-3">
            {area.papers.map((paper, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-lg bg-slate-50 p-3"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-800 font-serif italic">
                    {paper.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {paper.venue} ({paper.year})
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.section>
  );
}
