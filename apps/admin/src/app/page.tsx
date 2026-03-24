import { readYaml } from "@/lib/content-io";
import {
  MembersSchema,
  PublicationsSchema,
  ResearchAreasSchema,
  NewsItemsSchema,
  AnnouncementsSchema,
} from "@inslab/content-schemas";

function count(label: string, n: number) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{n}</p>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const members = readYaml("team/members.yaml", MembersSchema);
  const journals = readYaml("publications/journals.yaml", PublicationsSchema);
  const conferences = readYaml("publications/conferences.yaml", PublicationsSchema);
  const domestic = readYaml("publications/domestic.yaml", PublicationsSchema);
  const research = readYaml("research/areas.yaml", ResearchAreasSchema);
  const news = readYaml("news/news-items.yaml", NewsItemsSchema);
  const announcements = readYaml("announcements/announcements.yaml", AnnouncementsSchema);

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {count("Team Members", members.length)}
        {count("Publications", journals.length + conferences.length + domestic.length)}
        {count("Research Areas", research.length)}
        {count("News", news.length)}
        {count("Announcements", announcements.length)}
      </div>
    </div>
  );
}
