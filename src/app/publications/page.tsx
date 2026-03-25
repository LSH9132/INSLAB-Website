import type { Metadata } from "next";

import { PageShell } from "@/components/layout";
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
    <PageShell
      currentPath="/publications"
      mainClassName="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20"
    >
      <PublicationsHero />
      <PublicationFilters total={publications.length} />
      <PublicationList publications={publications} />
    </PageShell>
  );
}
