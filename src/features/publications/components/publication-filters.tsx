"use client";

import { motion, useReducedMotion } from "motion/react";

const filterItems = ["Year", "Research Area", "Type"];

export function PublicationFilters({ total }: { total: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="sticky top-[77px] z-40 mb-4 border-b border-slate-100 bg-white/90 py-4 backdrop-blur">
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-wrap items-center justify-between gap-5"
      >
        <div className="flex flex-wrap gap-3">
          {filterItems.map((label) => (
            <button
              key={label}
              type="button"
              className="rounded-sm bg-slate-100 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-slate-700 uppercase hover:bg-slate-200"
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="ml-2 rounded-sm border border-slate-200 bg-white px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-slate-400 uppercase hover:border-slate-300 hover:text-slate-700"
          >
            Reset Filters
          </button>
        </div>
        <motion.p
          initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-sm italic text-slate-400"
        >
          Displaying {total} papers
        </motion.p>
      </motion.div>
    </section>
  );
}
