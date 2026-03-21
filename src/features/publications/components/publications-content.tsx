"use client";

import { useMemo, useState } from "react";
import { PublicationFilters } from "./publication-filters";
import { PublicationList } from "./publication-list";
import type { Publication, PublicationType } from "../types";

type FiltersDictionary = {
  items: string[];
  reset: string;
  displaying: string;
  allYears: string;
};

export function PublicationsContent({
  publications,
  filters,
}: {
  publications: Publication[];
  filters: FiltersDictionary;
}) {
  const [activeType, setActiveType] = useState<PublicationType | "All">("All");
  const [activeYear, setActiveYear] = useState<number | "All">("All");

  const years = useMemo(() => {
    const set = new Set(publications.map((p) => p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [publications]);

  const filtered = useMemo(() => {
    return publications.filter((p) => {
      if (activeType !== "All" && p.type !== activeType) return false;
      if (activeYear !== "All" && p.year !== activeYear) return false;
      return true;
    });
  }, [publications, activeType, activeYear]);

  return (
    <>
      <PublicationFilters
        total={filtered.length}
        filters={filters}
        activeType={activeType}
        activeYear={activeYear}
        years={years}
        onTypeChange={setActiveType}
        onYearChange={setActiveYear}
      />
      <PublicationList publications={filtered} />
    </>
  );
}
