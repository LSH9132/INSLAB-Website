import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";

import { PageShell } from "@/components/layout";
import { ResearchHero } from "@/features/research/components/research-hero";
import { ResearchAreaSection } from "@/features/research/components/research-area-section";
import { NetworkConstellation } from "@/features/research/components/network-constellation";
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

  const research = messages.research;

  return (
    <PageShell
      currentPath="/research"
      nav={messages.nav}
      footer={messages.footer}
      mainClassName="flex-1"
    >
      {/* Blueprint grid background */}
      <div
        className="min-h-screen"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      >
        {/* Hero */}
        <div className="mx-auto max-w-6xl">
          <ResearchHero hero={research.hero} />
        </div>

        {/* Research Grid */}
        <section className="mx-auto max-w-6xl px-6 pb-24 lg:px-10">
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
            {/* Framework Anchor Card */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-xl border-l-4 border-blue-600 bg-white p-8 shadow-sm md:col-span-12 lg:col-span-4">
              {/* Subtle dot pattern background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                aria-hidden
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              <div className="relative z-10">
                <h2 className="mb-4 text-3xl font-bold text-slate-900">
                  {research.framework.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-slate-500">
                  {research.framework.body}
                </p>
                <div className="space-y-4">
                  {research.framework.points.map((point: string) => (
                    <div key={point} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                      <span className="font-serif text-sm italic text-slate-600">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Research Area Cards */}
            {researchAreas.map((area, index) => (
              <ResearchAreaSection
                key={area.id}
                area={area}
                locale={locale}
                index={index}
                dict={research}
                className={
                  index < 2
                    ? "md:col-span-6 lg:col-span-4"
                    : "md:col-span-12 lg:col-span-5"
                }
              />
            ))}

            {/* Ongoing Projects Card */}
            {ongoingProjects.length > 0 && (
              <div className="flex flex-col rounded-xl border border-slate-200/50 bg-slate-50/80 p-8 md:col-span-12 lg:col-span-7">
                <h3 className="mb-6 text-xl font-bold text-slate-900">
                  {research.ongoingProjects}
                </h3>
                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
                  {ongoingProjects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-lg border border-green-100 bg-green-50/50 p-4 transition-colors hover:bg-green-50"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700">
                          {research.ongoing}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {project.period}
                        </span>
                      </div>
                      <p className="text-sm font-medium leading-snug text-slate-800">
                        {project.title}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-400">
                        {project.agency}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Structural Connectivity Section */}
        <section className="relative overflow-hidden bg-slate-50 py-20">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 md:flex-row lg:px-10">
            {/* Text */}
            <div className="w-full md:w-1/2">
              <h2 className="mb-6 text-4xl font-bold text-slate-900">
                {research.connectivity.title}
              </h2>
              <p className="mb-8 leading-relaxed text-slate-500">
                {research.connectivity.body}
              </p>
              <div className="flex gap-4">
                <Link
                  href={`/${locale}/publications`}
                  className="rounded-md bg-blue-700 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
                >
                  {research.connectivity.cta}
                </Link>
              </div>
            </div>

            {/* Visual */}
            <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-white shadow-inner md:w-1/2">
              <NetworkConstellation className="absolute inset-0 h-full w-full" />
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
