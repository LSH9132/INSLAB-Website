import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Messages } from "@/types/messages";
import { PageShell } from "@/components/layout";
import { DirectorHero } from "@/features/director/components/director-hero";
import { DirectorEducation } from "@/features/director/components/director-education";
import { DirectorResearch } from "@/features/director/components/director-research";
import { DirectorPublications } from "@/features/director/components/director-publications";
import { DirectorPatents } from "@/features/director/components/director-patents";
import { DirectorProjects } from "@/features/director/components/director-projects";
import {
  getDirectorEducation,
  getDirectorCareer,
  getDirectorProjects,
  getDirectorPatents,
  getDirectorPublications,
} from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Director.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function DirectorPage({
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

  const education = getDirectorEducation();
  const career = getDirectorCareer();
  const projects = getDirectorProjects();
  const patents = getDirectorPatents();
  const publications = getDirectorPublications();

  return (
    <PageShell
      currentPath="/director"
      locale={locale}
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="flex-1"
    >
      <DirectorHero locale={locale} />
      <DirectorEducation education={education} career={career} />
      <DirectorResearch />
      <DirectorPublications publications={publications} />
      <DirectorProjects projects={projects} />
      <DirectorPatents patents={patents} />
    </PageShell>
  );
}
