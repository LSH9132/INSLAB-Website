import { readYaml } from "@/lib/content-io";
import { PublicationsSchema, type Publication } from "@inslab/content-schemas";
import { saveDirectorPublication } from "../../actions";
import { redirect } from "next/navigation";
import { FormField, FormSelect, FormActions, UnsavedChangesGuard, ValidatedForm } from "@/components/form";

export const dynamic = "force-dynamic";

const TYPES = ["Journal", "Conference", "Domestic"] as const;

export default async function DirectorPubEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);
  const pub: Publication | null = isNew ? null : pubs.find((p) => p.id === id) ?? null;

  if (!isNew && !pub) redirect("/director");

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Director Publication" : "Edit Director Publication"}
      </h2>
      <ValidatedForm action={saveDirectorPublication} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={pub?.id ?? ""} readOnly={!isNew} placeholder="dir-j-2025-kim" hint="dir-타입-연도-저자 형식" />
        <FormSelect label="Type" name="type" options={TYPES} defaultValue={pub?.type ?? "Journal"} />
        <FormField label="Year" name="year" type="number" defaultValue={String(pub?.year ?? new Date().getFullYear())} />
        <FormField label="Title" name="title" defaultValue={pub?.title ?? ""} />
        <FormField label="Authors" name="authors" defaultValue={pub?.authors.join(", ") ?? ""} placeholder="Kim D.Y., Lee S.H." hint="쉼표로 구분" />
        <FormField label="Venue" name="venue" defaultValue={pub?.venue ?? ""} placeholder="IEEE TNSM" />
        <FormField label="Details" name="details" defaultValue={pub?.details ?? ""} placeholder="vol. 21, no. 3, pp. 1234-1245" />
        <FormField label="Date" name="date" defaultValue={pub?.date ?? ""} placeholder="2025-06-15" hint="선택 사항 (YYYY-MM-DD)" />
        <FormField label="Tags" name="tags" defaultValue={pub?.tags.join(", ") ?? ""} placeholder="AI, Networking" hint="쉼표로 구분" />
        <FormField label="PDF URL" name="pdfUrl" defaultValue={pub?.pdfUrl ?? ""} placeholder="https://example.com/paper.pdf" hint="선택 사항" />
        <FormField label="DOI URL" name="doiUrl" defaultValue={pub?.doiUrl ?? ""} placeholder="https://doi.org/10.1109/..." hint="선택 사항" />
        <FormActions cancelHref="/director" />
      </ValidatedForm>
    </div>
  );
}
