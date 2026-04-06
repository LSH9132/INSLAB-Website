import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { NewsHero } from "@/features/news/components/news-hero";
import { NewsList } from "@/features/news/components/news-list";
import { getNewsItems } from "@/lib/content";
import { routing } from "@/i18n/routing";
import type { Messages } from "@/types/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function NewsPage({
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

  return (
    <PageShell
      currentPath="/news"
      locale={locale}
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20"
    >
      <NewsHero hero={messages.news.hero} />
      <NewsList
        items={getNewsItems()}
        locale={locale}
        dict={messages.news.filters}
      />
    </PageShell>
  );
}
