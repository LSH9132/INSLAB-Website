"use client";

import { useTranslations } from "next-intl";
import { PublicationList } from "../../publications/components/publication-list";
import type { Publication } from "@/lib/content";
import { FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function DirectorPublications({
  publications,
}: {
  publications: Publication[];
}) {
  const t = useTranslations("Director");

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
          <PublicationList publications={publications} />

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
