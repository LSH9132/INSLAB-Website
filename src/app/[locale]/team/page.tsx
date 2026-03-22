import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { TeamHero } from "@/features/team/components/team-hero";
import { TeamGrid } from "@/features/team/components/team-grid";
import { getMembers } from "@/lib/content";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TeamPage({
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

  const members = getMembers();
  const professor = members.find((m) => m.role === "Professor")!;
  const graduate = members.filter((m) => m.role === "PhD" || m.role === "MS");
  const undergraduate = members.filter((m) => m.role === "BS");

  return (
    <PageShell
      currentPath="/team"
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20"
    >
      <TeamHero hero={messages.team.hero} />
      <TeamGrid
        professor={professor}
        graduate={graduate}
        undergraduate={undergraduate}
        locale={locale}
        dict={messages.team}
      />
    </PageShell>
  );
}
