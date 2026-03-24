import { readYaml } from "@/lib/content-io";
import { PublicationsSchema, type Publication } from "@inslab/content-schemas";
import { saveDirectorPublication } from "../../actions";
import { redirect } from "next/navigation";
import { FormField, FormSelect, FormActions, UnsavedChangesGuard } from "@/components/form";

export const dynamic = "force-dynamic";

const TYPES = ["Journal", "Conference", "Domestic"] as const;

export default async function DirectorPubEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);
  const pub: Publication | null = isNew ? null : pubs.find((p) => p.id === id) ?? null;

  if (!isNew && !pub) redirect("/director");

  async function handleSave(formData: FormData) {
    "use server";
    await saveDirectorPublication(formData);
    redirect("/director?toast=saved");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Director Publication" : "Edit Director Publication"}
      </h2>
      <form action={handleSave} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={pub?.id ?? ""} readOnly={!isNew} />
        <FormSelect label="Type" name="type" options={TYPES} defaultValue={pub?.type ?? "Journal"} />
        <FormField label="Year" name="year" type="number" defaultValue={String(pub?.year ?? new Date().getFullYear())} />
        <FormField label="Title" name="title" defaultValue={pub?.title ?? ""} />
        <FormField label="Authors (comma-separated)" name="authors" defaultValue={pub?.authors.join(", ") ?? ""} />
        <FormField label="Venue" name="venue" defaultValue={pub?.venue ?? ""} />
        <FormField label="Details" name="details" defaultValue={pub?.details ?? ""} />
        <FormField label="Date (YYYY-MM-DD)" name="date" defaultValue={pub?.date ?? ""} />
        <FormField label="Tags (comma-separated)" name="tags" defaultValue={pub?.tags.join(", ") ?? ""} />
        <FormField label="PDF URL" name="pdfUrl" defaultValue={pub?.pdfUrl ?? ""} />
        <FormField label="DOI URL" name="doiUrl" defaultValue={pub?.doiUrl ?? ""} />
        <FormActions cancelHref="/director" />
      </form>
    </div>
  );
}
