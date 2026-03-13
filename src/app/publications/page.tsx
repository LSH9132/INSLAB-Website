import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PublicationFilters } from "@/features/publications/components/publication-filters";
import { PublicationList } from "@/features/publications/components/publication-list";
import { PublicationsHero } from "@/features/publications/components/publications-hero";
import { publications } from "@/features/publications/data/publications";

export const metadata: Metadata = {
  title: "Publications",
  description: "Selected INSLAB publications across AI, network systems, and security.",
};

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader currentPath="/publications" />
      <main className="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20">
        <PublicationsHero />
        <PublicationFilters total={publications.length} />
        <PublicationList publications={publications} />
      </main>
      <SiteFooter />
    </div>
  );
}
