import { PageShell } from "@/components/layout";
import { HomeHero } from "@/features/home/components/home-hero";
import { HomeMission } from "@/features/home/components/home-mission";
import { HomeNews } from "@/features/home/components/home-news";
import { HomeResearchAreas } from "@/features/home/components/home-research-areas";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, isValidLocale } from "@/lib/i18n/i18n-config";
import type { Locale } from "@/lib/i18n/i18n-config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);

  return (
    <PageShell currentPath="/" locale={locale} nav={dict.nav} footer={dict.footer}>
      <HomeHero hero={dict.home.hero} />
      <HomeMission mission={dict.home.mission} />
      <HomeResearchAreas researchAreas={dict.home.researchAreas} />
      <HomeNews news={dict.home.news} />
    </PageShell>
  );
}
