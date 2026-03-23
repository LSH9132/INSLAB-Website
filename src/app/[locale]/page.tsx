import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
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
import type { Messages } from "@/types/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

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

  const messages = (await getMessages()) as Messages;

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
