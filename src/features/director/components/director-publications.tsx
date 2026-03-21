"use client";

import { useTranslations } from "next-intl";
import { PublicationList } from "../../publications/components/publication-list";
import { directorPublications } from "../data/publications";
import { FileText } from "lucide-react";
import { Link } from "@/i18n/navigation";

export function DirectorPublications() {
  const t = useTranslations("Director");

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-5xl">
        <div className="flex flex-col items-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            {t("publications")}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Selected publications and research highlights. For a complete list of ongoing and past research outcomes from all lab members, please visit our main publications page.
          </p>
        </div>

        <div className="bg-background rounded-2xl border p-4 sm:p-8 shadow-sm">
           <PublicationList publications={directorPublications} />

           <div className="mt-8 flex justify-center">
             <Link href="/publications" className="inline-flex items-center justify-center rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 text-sm font-medium transition-colors">
                View All Lab Publications
             </Link>
           </div>
        </div>
      </div>
    </section>
  );
}
