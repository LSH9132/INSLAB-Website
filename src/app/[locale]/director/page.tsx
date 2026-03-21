import { setRequestLocale } from "next-intl/server";
import { DirectorHero } from "@/features/director/components/director-hero";
import { DirectorEducation } from "@/features/director/components/director-education";
import { DirectorResearch } from "@/features/director/components/director-research";
import { DirectorPublications } from "@/features/director/components/director-publications";
import { DirectorPatents } from "@/features/director/components/director-patents";
import { DirectorProjects } from "@/features/director/components/director-projects";
import { FadeInUp } from "@/components/shared/animations/fade-in-up";
import {
  getDirectorEducation,
  getDirectorCareer,
  getDirectorProjects,
  getDirectorPatents,
  getDirectorPublications,
} from "@/lib/content";

export default async function DirectorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const education = getDirectorEducation();
  const career = getDirectorCareer();
  const projects = getDirectorProjects();
  const patents = getDirectorPatents();
  const publications = getDirectorPublications();

  return (
    <div className="flex flex-col min-h-screen pt-20">
      <FadeInUp>
        <DirectorHero />
      </FadeInUp>
      <DirectorEducation education={education} career={career} />
      <DirectorResearch />
      <DirectorPublications publications={publications} />
      <DirectorPatents patents={patents} />
      <DirectorProjects projects={projects} />
    </div>
  );
}
