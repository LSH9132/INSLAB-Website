import { readYaml } from "@/lib/content-io";
import { PublicationsSchema, type Publication } from "@inslab/content-schemas";
import { savePublication } from "../actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const TYPES = ["Journal", "Conference", "Domestic"] as const;

export default async function PublicationEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isNew = id === "new";

  let pub: Publication | null = null;
  if (!isNew) {
    const all = [
      ...readYaml("publications/journals.yaml", PublicationsSchema),
      ...readYaml("publications/conferences.yaml", PublicationsSchema),
      ...readYaml("publications/domestic.yaml", PublicationsSchema),
    ];
    pub = all.find((p) => p.id === id) ?? null;
    if (!pub) redirect("/publications");
  }

  async function handleSave(formData: FormData) {
    "use server";
    await savePublication(formData);
    redirect("/publications");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Publication" : "Edit Publication"}
      </h2>
      <form action={handleSave} className="space-y-4">
        <Field label="ID" name="id" defaultValue={pub?.id ?? ""} readOnly={!isNew} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select name="type" defaultValue={pub?.type ?? "Journal"} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <Field label="Year" name="year" type="number" defaultValue={String(pub?.year ?? new Date().getFullYear())} />
        <Field label="Title" name="title" defaultValue={pub?.title ?? ""} />
        <Field label="Authors (comma-separated)" name="authors" defaultValue={pub?.authors.join(", ") ?? ""} />
        <Field label="Venue" name="venue" defaultValue={pub?.venue ?? ""} />
        <Field label="Details" name="details" defaultValue={pub?.details ?? ""} />
        <Field label="Date (YYYY-MM-DD)" name="date" defaultValue={pub?.date ?? ""} />
        <Field label="Tags (comma-separated)" name="tags" defaultValue={pub?.tags.join(", ") ?? ""} />
        <Field label="PDF URL" name="pdfUrl" defaultValue={pub?.pdfUrl ?? ""} />
        <Field label="DOI URL" name="doiUrl" defaultValue={pub?.doiUrl ?? ""} />
        <div className="flex gap-3 pt-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Save</button>
          <a href="/publications" className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Cancel</a>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, type = "text", readOnly = false }: {
  label: string; name: string; defaultValue: string; type?: string; readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input name={name} type={type} defaultValue={defaultValue} readOnly={readOnly}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${readOnly ? "bg-gray-100" : ""}`} />
    </div>
  );
}
