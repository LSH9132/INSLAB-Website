import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { HomeHero } from "@/features/home/components/home-hero";
import { HomeMission } from "@/features/home/components/home-mission";
import { HomeNews } from "@/features/home/components/home-news";
import { HomeResearchAreas } from "@/features/home/components/home-research-areas";
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

  return (
    <PageShell currentPath="/" locale={locale} nav={messages.nav} footer={messages.footer}>
      <HomeHero hero={messages.home.hero} />
      <HomeMission mission={messages.home.mission} />
      <HomeResearchAreas researchAreas={messages.home.researchAreas} />
      <HomeNews news={messages.home.news} />
    </PageShell>
  );
}
