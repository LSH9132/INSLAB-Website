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
      {/* Category Filter */}
      <div className="sticky top-[77px] z-40 mb-8 border-b border-slate-100 bg-white/90 py-4 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const label = cat === "All" ? dict.all : dict.categories[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* News Cards */}
      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-slate-400">
          {dict.noResults}
        </p>
      ) : (
        <motion.div
          className="space-y-6"
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

            return (
              <motion.article
                key={item.id}
                className="group flex flex-col gap-5 rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-start"
                variants={fadeUpVariants}
              >
                {/* Image or placeholder */}
                {item.imageUrl ? (
                  <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-40">
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url(${item.imageUrl})`,
                        filter: "grayscale(20%)",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex h-40 w-full flex-shrink-0 items-center justify-center rounded-lg bg-slate-50 sm:h-28 sm:w-40">
                    <span className="text-3xl text-slate-300">
                      {item.category === "Awards"
                        ? "🏆"
                        : item.category === "Papers"
                          ? "📄"
                          : item.category === "Events"
                            ? "📅"
                            : "📢"}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-slate-600 uppercase">
                      {categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400">
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
