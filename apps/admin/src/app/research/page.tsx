import { readYaml } from "@/lib/content-io";
import { ResearchAreasSchema } from "@inslab/content-schemas";
import { ContentTable, type DisplayRow } from "@/components/content-table";
import { deleteResearchArea, bulkDeleteResearchAreas } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function ResearchPage() {
  const areas = readYaml("research/areas.yaml", ResearchAreasSchema);

  const columns = [
    { key: "areaId", label: "ID" },
    { key: "title", label: "Title" },
    { key: "keywords", label: "Keywords" },
    { key: "papers", label: "Papers" },
  ];

  const rows: DisplayRow[] = areas.map((a) => ({
    id: a.id,
    editHref: `/research/${a.id}`,
    areaId: a.id,
    title: a.title.ko,
    keywords: a.keywords.join(", "),
    papers: String(a.papers.length),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Research Areas</h2>
        <Link href="/research/new" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
          Add Area
        </Link>
      </div>
      <ContentTable rows={rows} columns={columns} deleteAction={deleteResearchArea} bulkDeleteAction={bulkDeleteResearchAreas} searchable />
    </div>
  );
}
