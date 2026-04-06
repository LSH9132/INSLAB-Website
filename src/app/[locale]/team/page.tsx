import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { TeamHero } from "@/features/team/components/team-hero";
import { DirectorSpotlight } from "@/features/team/components/director-spotlight";
import { TeamGrid } from "@/features/team/components/team-grid";
import { getMembers, getResearchAreas, getDirectorProjects } from "@/lib/content";
import { routing } from "@/i18n/routing";
import type { Messages } from "@/types/messages";

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
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
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

  const messages = (await getMessages()) as Messages;

  const members = getMembers();
  const professor = members.find((m) => m.role === "Professor")!;
  const graduate = members.filter((m) => m.role === "PhD" || m.role === "MS");
  const undergraduate = members.filter((m) => m.role === "BS");

  const memberCount = members.filter((m) => m.role !== "Professor").length;
  const areaCount = getResearchAreas().length;
  const projectCount = getDirectorProjects().filter((p) => p.status === "Ongoing").length;

  const stats = messages.team.stats.map((s: { value: string; label: string }, i: number) => ({
    ...s,
    value: i === 0 ? String(memberCount) : i === 1 ? String(areaCount) : `${projectCount}+`,
  }));

  return (
    <PageShell
      currentPath="/team"
      locale={locale}
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="flex-1"
    >
      <TeamHero hero={messages.team.hero} stats={stats} />
      <DirectorSpotlight
        member={professor}
        locale={locale}
        sectionTitle={messages.team.sections.director}
        roleLabel={messages.team.roles.professor}
        viewProfileLabel={messages.team.viewProfile}
      />
      <TeamGrid
        graduate={graduate}
        undergraduate={undergraduate}
        locale={locale}
        dict={messages.team}
      />
    </PageShell>
  );
}
