import { setRequestLocale } from "next-intl/server";
import { DirectorHero } from "@/features/director/components/director-hero";
import { DirectorEducation } from "@/features/director/components/director-education";
import { DirectorResearch } from "@/features/director/components/director-research";
import { DirectorPublications } from "@/features/director/components/director-publications";
import { DirectorPatents } from "@/features/director/components/director-patents";
import { DirectorProjects } from "@/features/director/components/director-projects";
import { FadeInUp } from "@/components/shared/animations/fade-in-up";

export default async function DirectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <FadeInUp>
        <DirectorHero />
      </FadeInUp>
      <DirectorEducation />
      <DirectorResearch />
      <DirectorPublications />
      <DirectorPatents />
      <DirectorProjects />
    </div>
  );
}
