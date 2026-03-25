import { readYaml } from "@/lib/content-io";
import {
  MembersSchema,
  PublicationsSchema,
  ResearchAreasSchema,
  NewsItemsSchema,
  AnnouncementsSchema,
} from "@inslab/content-schemas";
import Link from "next/link";
import { DashboardBuildCard } from "./dashboard-build-card";
import { DashboardRecentBuilds } from "./dashboard-recent-builds";

export const dynamic = "force-dynamic";

function SummaryCard({ label, count, href }: { label: string; count: number; href: string }) {
  return (
    <Link
      href={href}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all"
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{count}</p>
    </Link>
  );
}

export default function DashboardPage() {
  const members = readYaml("team/members.yaml", MembersSchema);
  const journals = readYaml("publications/journals.yaml", PublicationsSchema);
  const conferences = readYaml("publications/conferences.yaml", PublicationsSchema);
  const domestic = readYaml("publications/domestic.yaml", PublicationsSchema);
  const research = readYaml("research/areas.yaml", ResearchAreasSchema);
  const news = readYaml("news/news-items.yaml", NewsItemsSchema);
  const announcements = readYaml("announcements/announcements.yaml", AnnouncementsSchema);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>

      {/* Build Status */}
      <DashboardBuildCard />

      {/* Quick Actions */}
      <div className="flex gap-3 flex-wrap">
        <Link
          href="/team/new"
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          + Add Member
        </Link>
        <Link
          href="/publications/new"
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          + Add Publication
        </Link>
        <Link
          href="/news/new"
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          + Add News
        </Link>
        <Link
          href="/preview"
          className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          Preview Site
        </Link>
      </div>

      {/* Content Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <SummaryCard label="Team Members" count={members.length} href="/team" />
        <SummaryCard label="Publications" count={journals.length + conferences.length + domestic.length} href="/publications" />
        <SummaryCard label="Research Areas" count={research.length} href="/research" />
        <SummaryCard label="News" count={news.length} href="/news" />
        <SummaryCard label="Announcements" count={announcements.length} href="/announcements" />
      </div>

      {/* Recent Builds */}
      <DashboardRecentBuilds />
    </div>
  );
}
