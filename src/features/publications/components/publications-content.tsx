"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Pagination, PublicationFilters } from "./publication-filters";
import { PublicationList } from "./publication-list";
import type { Publication, PublicationType } from "@/lib/content";

const ITEMS_PER_PAGE = 20;

export type FiltersDictionary = {
  items: string[];
  reset: string;
  displaying: string;
  allYears: string;
  topics: string;
  newestFirst: string;
  oldestFirst: string;
  noResults: string;
  prev: string;
  next: string;
  page: string;
};

export function PublicationsContent({
  publications,
  filters,
}: {
  publications: Publication[];
  filters: FiltersDictionary;
}) {
  const [activeType, setActiveType] = useState<PublicationType | "All">("All");
  const [activeYears, setActiveYears] = useState<Set<number>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const allYears = useMemo(() => {
    const set = new Set(publications.map((p) => p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [publications]);

  const filtered = useMemo(() => {
    const result = publications.filter((p) => {
      if (activeType !== "All" && p.type !== activeType) return false;
      if (activeYears.size > 0 && !activeYears.has(p.year)) return false;
      if (activeTags.size > 0 && !p.tags.some((t) => activeTags.has(t)))
        return false;
      return true;
    });
    return [...result].sort((a, b) => {
      const dateA = a.date ?? `${a.year}-12-31`;
      const dateB = b.date ?? `${b.year}-12-31`;
      return sortOrder === "newest"
        ? dateB.localeCompare(dateA)
        : dateA.localeCompare(dateB);
    });
  }, [publications, activeType, activeYears, activeTags, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paged = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, safePage]);

  // Tags with counts scoped to current type+year filter (before tag filter)
  const availableTags = useMemo(() => {
    const preTagFiltered = publications.filter((p) => {
      if (activeType !== "All" && p.type !== activeType) return false;
      if (activeYears.size > 0 && !activeYears.has(p.year)) return false;
      return true;
    });
    const counts = new Map<string, number>();
    for (const p of preTagFiltered) {
      for (const tag of p.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));
  }, [publications, activeType, activeYears]);

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleTypeChange = useCallback((type: PublicationType | "All") => {
    setActiveType(type);
    setCurrentPage(1);
  }, []);

  const handleYearToggle = useCallback((year: number) => {
    setActiveYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
    setCurrentPage(1);
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
    setCurrentPage(1);
  }, []);

  const handleSortToggle = useCallback(() => {
    setSortOrder((o) => (o === "newest" ? "oldest" : "newest"));
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setActiveType("All");
    setActiveYears(new Set());
    setActiveTags(new Set());
    setSortOrder("newest");
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      scrollToTop();
    },
    [scrollToTop],
  );

  const hasActiveFilters =
    activeType !== "All" || activeYears.size > 0 || activeTags.size > 0;

  return (
    <div ref={containerRef}>
      <PublicationFilters
        filters={filters}
        totalFiltered={filtered.length}
        totalAll={publications.length}
        activeType={activeType}
        activeYears={activeYears}
        activeTags={activeTags}
        allYears={allYears}
        availableTags={availableTags}
        hasActiveFilters={hasActiveFilters}
        sortOrder={sortOrder}
        onSortToggle={handleSortToggle}
        currentPage={safePage}
        totalPages={totalPages}
        onTypeChange={handleTypeChange}
        onYearToggle={handleYearToggle}
        onTagToggle={handleTagToggle}
        onReset={handleReset}
        onPageChange={handlePageChange}
      />

      {paged.length > 0 ? (
        <PublicationList
          key={`${activeType}-${[...activeYears].join(",")}-${[...activeTags].join(",")}-${safePage}`}
          publications={paged}
        />
      ) : (
        <p className="py-20 text-center text-sm text-slate-400">
          {filters.noResults}
        </p>
      )}

      {/* Pagination below list */}
      <div className="py-8">
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          filters={filters}
        />
      </div>
    </div>
  );
}
