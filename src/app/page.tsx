import { PageShell } from "@/components/layout";
import { HomeHero } from "@/features/home/components/home-hero";
import { HomeMission } from "@/features/home/components/home-mission";
import { HomeNews } from "@/features/home/components/home-news";
import { HomeResearchAreas } from "@/features/home/components/home-research-areas";

export default function Home() {
  return (
    <PageShell currentPath="/">
      <HomeHero />
      <HomeMission />
      <HomeResearchAreas />
      <HomeNews />
    </PageShell>
  );
}
