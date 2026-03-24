import { readYaml } from "@/lib/content-io";
import { ResearchAreasSchema } from "@inslab/content-schemas";
import { saveResearchArea } from "../actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ResearchEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const areas = readYaml("research/areas.yaml", ResearchAreasSchema);
  const area = isNew ? null : areas.find((a) => a.id === id);
  if (!isNew && !area) redirect("/research");

  async function handleSave(formData: FormData) {
    "use server";
    await saveResearchArea(formData);
    redirect("/research");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{isNew ? "Add Research Area" : "Edit Research Area"}</h2>
      <form action={handleSave} className="space-y-4">
        <Field label="ID" name="id" defaultValue={area?.id ?? ""} readOnly={!isNew} />
        <Field label="Title (KO)" name="title_ko" defaultValue={area?.title.ko ?? ""} />
        <Field label="Title (EN)" name="title_en" defaultValue={area?.title.en ?? ""} />
        <Textarea label="Description (KO)" name="description_ko" defaultValue={area?.description.ko ?? ""} />
        <Textarea label="Description (EN)" name="description_en" defaultValue={area?.description.en ?? ""} />
        <Field label="Keywords (comma-separated)" name="keywords" defaultValue={area?.keywords.join(", ") ?? ""} />
        <Textarea label="Papers (JSON array)" name="papers" defaultValue={JSON.stringify(area?.papers ?? [], null, 2)} />
        <div className="flex gap-3 pt-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Save</button>
          <a href="/research" className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Cancel</a>
        </div>
      </form>
    </div>
  );
}

function Field({ label, name, defaultValue, readOnly = false }: {
  label: string; name: string; defaultValue: string; readOnly?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input name={name} defaultValue={defaultValue} readOnly={readOnly}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-sm ${readOnly ? "bg-gray-100" : ""}`} />
    </div>
  );
}

function Textarea({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={4}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm font-mono" />
    </div>
  );
}
