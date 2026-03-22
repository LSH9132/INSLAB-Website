import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout";
import { ResearchHero } from "@/features/research/components/research-hero";
import { ResearchAreaSection } from "@/features/research/components/research-area-section";
import { getResearchAreas, getDirectorProjects } from "@/lib/content";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "research.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ResearchPage({
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

  const researchAreas = getResearchAreas();
  const ongoingProjects = getDirectorProjects().filter((p) => p.status === "Ongoing");

  return (
    <PageShell
      currentPath="/research"
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="flex-1 bg-indigo-50/30"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-12 lg:px-10 lg:py-20">
        <ResearchHero hero={messages.research.hero} />

        <div className="space-y-10">
          {researchAreas.map((area, index) => (
            <ResearchAreaSection
              key={area.id}
              area={area}
              locale={locale}
              index={index}
              dict={messages.research}
            />
          ))}
        </div>

        {/* Ongoing Projects */}
        {ongoingProjects.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 border-l-2 border-indigo-400 pl-4 text-xl font-bold text-slate-900">
              {messages.research.ongoingProjects}
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {ongoingProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-green-100 bg-green-50/50 p-5"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 uppercase">
                      {messages.research.ongoing}
                    </span>
                    <span className="text-xs text-slate-500">
                      {project.period}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800">
                    {project.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {project.agency}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
