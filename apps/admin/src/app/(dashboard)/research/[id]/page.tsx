import { readYaml } from "@/lib/content-io";
import { ResearchAreasSchema } from "@inslab/content-schemas";
import { saveResearchArea } from "../actions";
import { redirect } from "next/navigation";
import { FormField, FormTextarea, FormActions, UnsavedChangesGuard } from "@/components/form";

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
    redirect("/research?toast=saved");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{isNew ? "Add Research Area" : "Edit Research Area"}</h2>
      <form action={handleSave} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={area?.id ?? ""} readOnly={!isNew} />
        <FormField label="Title (KO)" name="title_ko" defaultValue={area?.title.ko ?? ""} />
        <FormField label="Title (EN)" name="title_en" defaultValue={area?.title.en ?? ""} />
        <FormTextarea label="Description (KO)" name="description_ko" defaultValue={area?.description.ko ?? ""} />
        <FormTextarea label="Description (EN)" name="description_en" defaultValue={area?.description.en ?? ""} />
        <FormField label="Keywords (comma-separated)" name="keywords" defaultValue={area?.keywords.join(", ") ?? ""} />
        <FormTextarea label="Papers (JSON array)" name="papers" defaultValue={JSON.stringify(area?.papers ?? [], null, 2)} mono />
        <FormActions cancelHref="/research" />
      </form>
    </div>
  );
}
