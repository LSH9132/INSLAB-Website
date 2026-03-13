import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { HomeHero } from "@/features/home/components/home-hero";
import { HomeMission } from "@/features/home/components/home-mission";
import { HomeNews } from "@/features/home/components/home-news";
import { HomeResearchAreas } from "@/features/home/components/home-research-areas";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <SiteHeader currentPath="/" />
      <main className="flex-1">
        <HomeHero />
        <HomeMission />
        <HomeResearchAreas />
        <HomeNews />
      </main>
      <SiteFooter />
    </div>
  );
}
