"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PublicationType } from "../types";

type FiltersDictionary = {
  items: string[];
  reset: string;
  displaying: string;
  allYears: string;
};

const typeMap: (PublicationType | "All")[] = [
  "All",
  "Journal",
  "Conference",
  "Domestic",
];

export function PublicationFilters({
  total,
  filters,
  activeType,
  activeYear,
  years,
  onTypeChange,
  onYearChange,
}: {
  total: number;
  filters: FiltersDictionary;
  activeType: PublicationType | "All";
  activeYear: number | "All";
  years: number[];
  onTypeChange: (type: PublicationType | "All") => void;
  onYearChange: (year: number | "All") => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const displayingText = filters.displaying.replace("{total}", String(total));

  return (
    <section className="sticky top-[77px] z-40 mb-4 border-b border-slate-100 bg-white/90 py-4 backdrop-blur">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap gap-3">
            {filters.items.map((label, i) => {
              const type = typeMap[i];
              const isActive = activeType === type;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => onTypeChange(type)}
                  className={`rounded-sm px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={activeYear}
              onChange={(e) => {
                const v = e.target.value;
                onYearChange(v === "All" ? "All" : Number(v));
              }}
              className="rounded-sm border border-slate-200 bg-white px-3 py-2 text-[11px] font-semibold tracking-[0.18em] text-slate-700 uppercase"
            >
              <option value="All">{filters.allYears}</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {(activeType !== "All" || activeYear !== "All") && (
              <button
                type="button"
                onClick={() => {
                  onTypeChange("All");
                  onYearChange("All");
                }}
                className="rounded-sm border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase hover:border-slate-300 hover:text-slate-700"
              >
                {filters.reset}
              </button>
            )}
          </div>
        </div>

        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-sm italic text-slate-400"
        >
          {displayingText}
        </motion.p>
      </motion.div>
    </section>
  );
}
