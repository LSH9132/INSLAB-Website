"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "@/lib/motion/fade-up";
import type { NewsItem, NewsCategory } from "../data/news-items";
import { categoryOrder } from "../data/news-items";

type NewsListDictionary = {
  all: string;
  categories: Record<string, string>;
  noResults: string;
};

type NewsListProps = {
  items: NewsItem[];
  locale: string;
  dict: NewsListDictionary;
};

const badgeColorMap: Record<string, string> = {
  Awards: "bg-amber-50 text-amber-700",
  Papers: "bg-blue-50 text-blue-700",
  Events: "bg-violet-50 text-violet-700",
  Notices: "bg-stone-100 text-stone-600",
};

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === "ko" ? "ko-KR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsList({ items, locale, dict }: NewsListProps) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | "All">(
    "All"
  );

  const filtered = useMemo(() => {
    const result =
      activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory);
    return result.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [items, activeCategory]);

  const categories: (NewsCategory | "All")[] = ["All", ...categoryOrder];

  return (
    <div>
      {/* Category Filter — underline tabs */}
      <div className="sticky top-[77px] z-40 mb-8 border-b border-slate-200 bg-white/90 py-4 backdrop-blur">
        <div className="flex flex-wrap gap-6">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const label = cat === "All" ? dict.all : dict.categories[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`border-b-2 pb-2 text-sm transition-colors ${
                  isActive
                    ? "border-slate-900 font-semibold text-slate-900"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* News Timeline List */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-400">
          {dict.noResults}
        </p>
      ) : (
        <motion.div
          className="space-y-0 divide-y divide-slate-100"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filtered.map((item) => {
            const title = locale === "ko" ? item.title.ko : item.title.en;
            const description =
              locale === "ko" ? item.description.ko : item.description.en;
            const categoryLabel = dict.categories[item.category];
            const badgeColor = badgeColorMap[item.category] ?? "bg-slate-100 text-slate-600";

            return (
              <motion.article
                key={item.id}
                className="group flex gap-6 py-6 transition-colors hover:bg-slate-50/50"
                variants={fadeUpVariants}
              >
                {/* Date column */}
                <div className="hidden w-28 flex-shrink-0 flex-col sm:flex">
                  <span className="text-sm text-slate-400 font-serif italic">
                    {formatDate(item.date, locale)}
                  </span>
                  <span className={`mt-2 inline-block w-fit rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase ${badgeColor}`}>
                    {categoryLabel}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center">
                  {/* Mobile date + badge */}
                  <div className="mb-2 flex items-center gap-3 sm:hidden">
                    <span className={`rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase ${badgeColor}`}>
                      {categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-serif italic">
                      {formatDate(item.date, locale)}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-accent">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
