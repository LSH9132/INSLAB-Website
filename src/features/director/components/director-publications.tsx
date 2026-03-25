"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PublicationList } from "../../publications/components/publication-list";
import type { Publication, PublicationType } from "@/lib/content";
import { FileText, ArrowUpDown } from "lucide-react";
import { Link } from "@/i18n/navigation";

type FilterType = "All" | "Journal" | "Conference";
type SortOrder = "newest" | "oldest";

export function DirectorPublications({
  publications,
}: {
  publications: Publication[];
}) {
  const t = useTranslations("Director");

  const [activeType, setActiveType] = useState<FilterType>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filterTypes: FilterType[] = ["All", "Journal", "Conference"];

  const filtered = useMemo(() => {
    let result =
      activeType === "All"
        ? publications
        : publications.filter((p) => p.type === activeType);

    result = [...result].sort((a, b) => {
      const dateA = a.date ?? `${a.year}-12-31`;
      const dateB = b.date ?? `${b.year}-12-31`;
      return sortOrder === "newest"
        ? dateB.localeCompare(dateA)
        : dateA.localeCompare(dateB);
    });

    return result;
  }, [publications, activeType, sortOrder]);

  const pill = (active: boolean) =>
    `rounded-sm px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors ${
      active
        ? "bg-slate-900 text-white"
        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
    }`;

  const filterLabelMap: Record<FilterType, string> = {
    All: t("filters.all"),
    Journal: t("filters.journal"),
    Conference: t("filters.conference"),
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="mb-12 flex flex-col items-center space-y-4">
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl md:text-5xl">
            <FileText className="h-8 w-8 text-teal-600" />
            {t("publications")}
          </h2>
          <p className="max-w-2xl text-center text-slate-500">
            Selected publications and research highlights. For a complete list
            of ongoing and past research outcomes from all lab members, please
            visit our main publications page.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-8">
          {/* Filter & Sort controls */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {filterTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={pill(activeType === type)}
              >
                {filterLabelMap[type]}
              </button>
            ))}

            <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

            <button
              type="button"
              onClick={() =>
                setSortOrder((o) => (o === "newest" ? "oldest" : "newest"))
              }
              className="flex items-center gap-1.5 rounded-sm bg-slate-100 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 transition-colors hover:bg-slate-200"
            >
              <ArrowUpDown className="h-3 w-3" />
              {sortOrder === "newest"
                ? t("filters.newestFirst")
                : t("filters.oldestFirst")}
            </button>
          </div>

          {filtered.length > 0 ? (
            <PublicationList publications={filtered} />
          ) : (
            <p className="py-12 text-center text-sm text-slate-400">
              {t("filters.noResults")}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <Link
              href="/publications"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600 hover:shadow-lg"
            >
              View All Lab Publications
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
