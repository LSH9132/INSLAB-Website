import { readYaml } from "@/lib/content-io";
import {
  MembersSchema,
  PublicationsSchema,
  ResearchAreasSchema,
  NewsItemsSchema,
  AnnouncementsSchema,
} from "@inslab/content-schemas";
import type { MemberRole } from "@inslab/content-schemas";
import Link from "next/link";
import { DashboardBuildCard } from "./dashboard-build-card";
import { DashboardRecentBuilds } from "./dashboard-recent-builds";
import { DashboardStatCard } from "./dashboard-stat-card";
import { DashboardPubChart } from "./dashboard-pub-chart";
import { DashboardTeamComposition } from "./dashboard-team-composition";
import { DashboardContentHealth } from "./dashboard-content-health";
import { DashboardNewsTimeline } from "./dashboard-news-timeline";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  // ── Data loading ──────────────────────────────────────────
  const members = readYaml("team/members.yaml", MembersSchema);
  const journals = readYaml("publications/journals.yaml", PublicationsSchema);
  const conferences = readYaml("publications/conferences.yaml", PublicationsSchema);
  const domestic = readYaml("publications/domestic.yaml", PublicationsSchema);
  const research = readYaml("research/areas.yaml", ResearchAreasSchema);
  const news = readYaml("news/news-items.yaml", NewsItemsSchema);
  const announcements = readYaml("announcements/announcements.yaml", AnnouncementsSchema);

  // ── Derived data ──────────────────────────────────────────
  const allPubs = [...journals, ...conferences, ...domestic];
  const currentYear = new Date().getFullYear();

  // Role counts
  const roleCounts: Record<MemberRole, number> = {
    Professor: 0,
    PhD: 0,
    MS: 0,
    BS: 0,
    Alumni: 0,
  };
  members.forEach((m) => (roleCounts[m.role] += 1));

  // Enroll year range
  const enrollYears = members.map((m) => m.enrollYear);
  const yearRange: [number, number] = [
    Math.min(...enrollYears),
    Math.max(...enrollYears),
  ];

  // Publications by year (last 8 years)
  const years = Array.from({ length: 8 }, (_, i) => currentYear - 7 + i);
  const pubsByYear = years.map((y) => ({
    year: y,
    journal: journals.filter((p) => p.year === y).length,
    conference: conferences.filter((p) => p.year === y).length,
    domestic: domestic.filter((p) => p.year === y).length,
  }));

  // This year's new publications
  const pubsThisYear = allPubs.filter((p) => p.year === currentYear).length;

  // News sorted by date
  const recentNews = [...news]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // News category counts
  const newsCategoryCounts: Record<string, number> = {};
  news.forEach((n) => {
    newsCategoryCounts[n.category] = (newsCategoryCounts[n.category] || 0) + 1;
  });

  // Announcements with links
  const announcementsWithLinks = announcements.filter((a) => a.href).length;

  // Research totals
  const totalKeywords = research.reduce((sum, r) => sum + r.keywords.length, 0);
  const totalResearchPapers = research.reduce((sum, r) => sum + r.papers.length, 0);

  // Content health
  const healthChecks = [
    {
      label: "Members without photo",
      count: members.filter((m) => !m.photo).length,
      total: members.length,
      href: "/team",
    },
    {
      label: "Publications without DOI",
      count: allPubs.filter((p) => !p.doiUrl).length,
      total: allPubs.length,
      href: "/publications",
    },
    {
      label: "Publications without PDF",
      count: allPubs.filter((p) => !p.pdfUrl).length,
      total: allPubs.length,
      href: "/publications",
    },
    {
      label: "News without image",
      count: news.filter((n) => !n.imageUrl).length,
      total: news.length,
      href: "/news",
    },
  ];

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>

      {/* Build Status */}
      <DashboardBuildCard />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <DashboardStatCard label="Team Members" count={members.length} href="/team">
          <div className="flex flex-wrap gap-1">
            {(["PhD", "MS", "BS", "Alumni"] as MemberRole[]).map(
              (role) =>
                roleCounts[role] > 0 && (
                  <span
                    key={role}
                    className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600"
                  >
                    {role} {roleCounts[role]}
                  </span>
                ),
            )}
          </div>
        </DashboardStatCard>

        <DashboardStatCard label="Publications" count={allPubs.length} href="/publications">
          <div className="space-y-1.5">
            <div className="flex h-2 rounded overflow-hidden bg-gray-100">
              {journals.length > 0 && (
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(journals.length / allPubs.length) * 100}%` }}
                />
              )}
              {conferences.length > 0 && (
                <div
                  className="bg-teal-500 h-full"
                  style={{ width: `${(conferences.length / allPubs.length) * 100}%` }}
                />
              )}
              {domestic.length > 0 && (
                <div className="bg-amber-500 h-full flex-1" />
              )}
            </div>
            {pubsThisYear > 0 && (
              <p className="text-[10px] text-gray-400">+{pubsThisYear} this year</p>
            )}
          </div>
        </DashboardStatCard>

        <DashboardStatCard label="Research Areas" count={research.length} href="/research">
          <p className="text-[10px] text-gray-400">
            {totalKeywords} keywords · {totalResearchPapers} papers
          </p>
        </DashboardStatCard>

        <DashboardStatCard label="News" count={news.length} href="/news">
          <div className="flex flex-wrap gap-1">
            {Object.entries(newsCategoryCounts).map(([cat, count]) => (
              <span
                key={cat}
                className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600"
              >
                {cat} {count}
              </span>
            ))}
          </div>
        </DashboardStatCard>

        <DashboardStatCard label="Announcements" count={announcements.length} href="/announcements">
          <p className="text-[10px] text-gray-400">
            {announcementsWithLinks} with links
          </p>
        </DashboardStatCard>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Publications by Year Chart */}
          <DashboardPubChart data={pubsByYear} />

          {/* Recent News */}
          <DashboardNewsTimeline items={recentNews} />

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/team/new"
              className="px-4 py-4 bg-white border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 text-center hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              + Add Member
            </Link>
            <Link
              href="/publications/new"
              className="px-4 py-4 bg-white border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 text-center hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              + Add Publication
            </Link>
            <Link
              href="/news/new"
              className="px-4 py-4 bg-white border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 text-center hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              + Add News
            </Link>
            <Link
              href="/preview"
              className="px-4 py-4 bg-white border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 text-center hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
            >
              Preview Site
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Team Composition */}
          <DashboardTeamComposition
            roleCounts={roleCounts}
            total={members.length}
            yearRange={yearRange}
          />

          {/* Content Health */}
          <DashboardContentHealth checks={healthChecks} />

          {/* Research Areas Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Research Areas</h3>
              <Link href="/research" className="text-xs text-blue-600 hover:underline">
                Edit
              </Link>
            </div>
            <div className="space-y-3">
              {research.map((area) => (
                <div key={area.id} className="space-y-1">
                  <p className="text-sm text-gray-900">{area.title.en}</p>
                  <div className="flex flex-wrap gap-1">
                    {area.keywords.slice(0, 3).map((kw) => (
                      <span
                        key={kw}
                        className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-blue-600"
                      >
                        {kw}
                      </span>
                    ))}
                    {area.keywords.length > 3 && (
                      <span className="text-[10px] text-gray-400">
                        +{area.keywords.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400">{area.papers.length} papers</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Builds */}
          <DashboardRecentBuilds />
        </div>
      </div>
    </div>
  );
}
