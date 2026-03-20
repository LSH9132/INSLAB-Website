import type { Metadata } from "next";

import { PageShell } from "@/components/layout";
import { PublicationFilters } from "@/features/publications/components/publication-filters";
import { PublicationList } from "@/features/publications/components/publication-list";
import { PublicationsHero } from "@/features/publications/components/publications-hero";
import { publications } from "@/features/publications/data/publications";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isValidLocale } from "@/lib/i18n/i18n-config";
import type { Locale } from "@/lib/i18n/i18n-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);

  return {
    title: dict.publications.metadata.title,
    description: dict.publications.metadata.description,
  };
}

export default async function PublicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <PageShell
      currentPath="/publications"
      locale={locale}
      nav={dict.nav}
      footer={dict.footer}
      mainClassName="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20"
    >
      <PublicationsHero hero={dict.publications.hero} />
      <PublicationFilters total={publications.length} filters={dict.publications.filters} />
      <PublicationList publications={publications} />
    </PageShell>
  );
}
