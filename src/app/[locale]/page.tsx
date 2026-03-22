import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { HomeHero } from "@/features/home/components/home-hero";
import { HomeJoinCta } from "@/features/home/components/home-join-cta";
import { HomeNews } from "@/features/home/components/home-news";
import { HomePublicationsPreview } from "@/features/home/components/home-publications-preview";
import { HomeResearchAreas } from "@/features/home/components/home-research-areas";
import {
  getNewsItems,
  getPublications,
  getResearchAreas,
} from "@/lib/content";
import { routing } from "@/i18n/routing";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = (await getMessages()) as any;

  const publications = getPublications();
  const newsItems = getNewsItems();
  const researchAreas = getResearchAreas();

  return (
    <PageShell currentPath="/" locale={locale} nav={messages.nav} footer={messages.footer}>
      <HomeHero hero={messages.home.hero} />
      <HomeResearchAreas
        dict={messages.home.researchAreas}
        areas={researchAreas}
        locale={locale}
      />
      <HomePublicationsPreview
        dict={messages.home.publications}
        publications={publications}
      />
      <HomeNews
        dict={messages.home.news}
        items={newsItems}
        locale={locale}
      />
      <HomeJoinCta dict={messages.home.joinCta} />
    </PageShell>
  );
}
