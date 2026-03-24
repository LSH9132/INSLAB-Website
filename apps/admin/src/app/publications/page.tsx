import { readYaml } from "@/lib/content-io";
import { PublicationsSchema } from "@inslab/content-schemas";
import { ContentTable, type DisplayRow } from "@/components/content-table";
import { deletePublication } from "./actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function PublicationsPage() {
  const journals = readYaml("publications/journals.yaml", PublicationsSchema);
  const conferences = readYaml("publications/conferences.yaml", PublicationsSchema);
  const domestic = readYaml("publications/domestic.yaml", PublicationsSchema);
  const all = [...journals, ...conferences, ...domestic].sort((a, b) => b.year - a.year);

  const columns = [
    { key: "type", label: "Type" },
    { key: "year", label: "Year" },
    { key: "title", label: "Title" },
    { key: "venue", label: "Venue" },
  ];

  const rows: DisplayRow[] = all.map((p) => ({
    id: p.id,
    editHref: `/publications/${p.id}`,
    type: p.type,
    year: String(p.year),
    title: p.title.length > 60 ? p.title.slice(0, 60) + "..." : p.title,
    venue: p.venue,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Publications</h2>
        <Link
          href="/publications/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Add Publication
        </Link>
      </div>
      <ContentTable rows={rows} columns={columns} deleteAction={deletePublication} />
    </div>
  );
}
