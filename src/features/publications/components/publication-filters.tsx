"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { PublicationType } from "@/lib/content";
import type { FiltersDictionary } from "./publications-content";

const typeMap: (PublicationType | "All")[] = [
  "All",
  "Journal",
  "Conference",
  "Domestic",
];

const MIN_TAG_COUNT = 2;

type OpenPanel = "years" | "topics" | null;

/* ------------------------------------------------------------------ */
/*  Chevron icon                                                       */
/* ------------------------------------------------------------------ */
function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""} ${className ?? ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                         */
/* ------------------------------------------------------------------ */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  filters,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  filters: FiltersDictionary;
}) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  const btn =
    "flex h-8 min-w-8 items-center justify-center rounded-sm px-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors";

  return (
    <nav
      aria-label={filters.page}
      className="flex items-center justify-center gap-1.5"
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${btn} ${currentPage <= 1 ? "cursor-not-allowed text-slate-300" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
      >
        {filters.prev}
      </button>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e${i}`} className="flex h-8 min-w-8 items-center justify-center text-[11px] text-slate-400">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={`${btn} ${p === currentPage ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${btn} ${currentPage >= totalPages ? "cursor-not-allowed text-slate-300" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
      >
        {filters.next}
      </button>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Filters                                                            */
/* ------------------------------------------------------------------ */
export function PublicationFilters({
  filters,
  totalFiltered,
  totalAll,
  activeType,
  activeYears,
  activeTags,
  allYears,
  availableTags,
  hasActiveFilters,
  currentPage,
  totalPages,
  onTypeChange,
  onYearToggle,
  onTagToggle,
  onReset,
  onPageChange,
}: {
  filters: FiltersDictionary;
  totalFiltered: number;
  totalAll: number;
  activeType: PublicationType | "All";
  activeYears: Set<number>;
  activeTags: Set<string>;
  allYears: number[];
  availableTags: { tag: string; count: number }[];
  hasActiveFilters: boolean;
  currentPage: number;
  totalPages: number;
  onTypeChange: (type: PublicationType | "All") => void;
  onYearToggle: (year: number) => void;
  onTagToggle: (tag: string) => void;
  onReset: () => void;
  onPageChange: (page: number) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [showAllTags, setShowAllTags] = useState(false);

  const displayingText = filters.displaying
    .replace("{count}", String(totalFiltered))
    .replace("{total}", String(totalAll));

  const toggle = (panel: OpenPanel) =>
    setOpenPanel((prev) => (prev === panel ? null : panel));

  const primaryTags = availableTags.filter((t) => t.count >= MIN_TAG_COUNT);
  const secondaryTags = availableTags.filter((t) => t.count < MIN_TAG_COUNT);
  const visibleTags = showAllTags ? availableTags : primaryTags;

  /* shared styles */
  const pill = (active: boolean) =>
    `rounded-sm px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
      active
        ? "bg-slate-900 text-white"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }`;

  const toggleBtn = (active: boolean, open: boolean) =>
    `flex items-center gap-1.5 rounded-sm px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
      active
        ? "bg-slate-900 text-white"
        : open
          ? "bg-slate-200 text-slate-800"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }`;

  return (
    <section className="sticky top-[77px] z-40 mb-4 border-b border-slate-100 bg-white/90 py-4 backdrop-blur">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-3"
      >
        {/* Row 1: Type buttons | Year toggle | Topics toggle | Reset */}
        <div className="flex flex-wrap items-center gap-2">
          {/* type pills */}
          {filters.items.map((label, i) => {
            const type = typeMap[i];
            return (
              <button
                key={label}
                type="button"
                onClick={() => onTypeChange(type)}
                className={pill(activeType === type)}
              >
                {label}
              </button>
            );
          })}

          {/* divider */}
          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

          {/* year toggle */}
          <button
            type="button"
            onClick={() => toggle("years")}
            className={toggleBtn(activeYears.size > 0, openPanel === "years")}
          >
            {filters.allYears}
            {activeYears.size > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-[9px]">
                {activeYears.size}
              </span>
            )}
            <Chevron open={openPanel === "years"} />
          </button>

          {/* topics toggle */}
          <button
            type="button"
            onClick={() => {
              toggle("topics");
              setShowAllTags(false);
            }}
            className={toggleBtn(activeTags.size > 0, openPanel === "topics")}
          >
            {filters.topics}
            {activeTags.size > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white/20 px-1 text-[9px]">
                {activeTags.size}
              </span>
            )}
            <Chevron open={openPanel === "topics"} />
          </button>

          {/* reset */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="ml-auto rounded-sm border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase hover:border-slate-300 hover:text-slate-700"
            >
              {filters.reset}
            </button>
          )}
        </div>

        {/* Accordion panels — only one open at a time */}
        <AnimatePresence initial={false}>
          {openPanel === "years" && (
            <motion.div
              key="years"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5 pb-1 pt-1">
                {allYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => onYearToggle(year)}
                    className={`rounded-sm px-3 py-1.5 text-[11px] font-semibold tabular-nums tracking-wider transition-colors ${
                      activeYears.has(year)
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {openPanel === "topics" && (
            <motion.div
              key="topics"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-1.5 pb-1 pt-1">
                {visibleTags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onTagToggle(tag)}
                    className={`flex items-center gap-1 rounded-sm px-2.5 py-1.5 text-[10px] font-semibold tracking-wider transition-colors ${
                      activeTags.has(tag)
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tag}
                    <span
                      className={`ml-0.5 text-[9px] ${
                        activeTags.has(tag)
                          ? "text-slate-400"
                          : "text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}

                {/* show more / less */}
                {secondaryTags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllTags((v) => !v)}
                    className="rounded-sm px-2.5 py-1.5 text-[10px] font-medium tracking-wider text-slate-400 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-slate-600"
                  >
                    {showAllTags
                      ? `− Hide ${secondaryTags.length}`
                      : `+ ${secondaryTags.length} more`}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Row 2: Info line + pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-sm italic text-slate-400"
          >
            {displayingText}
          </motion.p>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            filters={filters}
          />
        </div>
      </motion.div>
    </section>
  );
}
