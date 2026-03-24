import { readYaml } from "@/lib/content-io";
import { DirectorDataSchema, PublicationsSchema } from "@inslab/content-schemas";
import { ContentTable, type DisplayRow } from "@/components/content-table";
import { saveDirectorData, deleteDirectorPublication } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function DirectorPage() {
  const data = readYaml("director/director.yaml", DirectorDataSchema);
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);

  async function handleSave(formData: FormData) {
    "use server";
    await saveDirectorData(formData);
    redirect("/director?toast=saved");
  }

  const pubColumns = [
    { key: "year", label: "Year" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
  ];

  const pubRows: DisplayRow[] = pubs.map((p) => ({
    id: p.id,
    editHref: `/director/pub/${p.id}`,
    year: String(p.year),
    title: p.title.length > 50 ? p.title.slice(0, 50) + "..." : p.title,
    type: p.type,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Director Profile</h2>
        <form action={handleSave} className="space-y-4 max-w-3xl">
          <JsonField label="Education" name="education" defaultValue={data.education} />
          <JsonField label="Career" name="career" defaultValue={data.career} />
          <JsonField label="Projects" name="projects" defaultValue={data.projects} />
          <JsonField label="Patents" name="patents" defaultValue={data.patents} />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            Save Profile
          </button>
        </form>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Director Publications</h3>
          <Link href="/director/pub/new" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
            Add Publication
          </Link>
        </div>
        <ContentTable rows={pubRows} columns={pubColumns} deleteAction={deleteDirectorPublication} />
      </div>
    </div>
  );
}

function JsonField({ label, name, defaultValue }: { label: string; name: string; defaultValue: unknown }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea name={name} defaultValue={JSON.stringify(defaultValue, null, 2)} rows={8}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono" />
    </div>
  );
}
