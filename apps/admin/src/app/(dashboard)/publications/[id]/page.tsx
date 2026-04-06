import { readYaml } from "@/lib/content-io";
import { PublicationsSchema, type Publication } from "@inslab/content-schemas";
import { savePublication } from "../actions";
import { redirect } from "next/navigation";
import { FormField, FormSelect, FormActions, UnsavedChangesGuard, ValidatedForm } from "@/components/form";

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

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {isNew ? "Add Publication" : "Edit Publication"}
      </h2>
      <ValidatedForm action={savePublication} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={pub?.id ?? ""} readOnly={!isNew} placeholder="j-2025-kim" hint="타입-연도-저자 형식 (예: j-2025-kim, c-2025-lee)" />
        <FormSelect label="Type" name="type" options={TYPES} defaultValue={pub?.type ?? "Journal"} />
        <FormField label="Year" name="year" type="number" defaultValue={String(pub?.year ?? new Date().getFullYear())} />
        <FormField label="Title" name="title" defaultValue={pub?.title ?? ""} />
        <FormField label="Authors" name="authors" defaultValue={pub?.authors.join(", ") ?? ""} placeholder="Kim D.Y., Lee S.H., Park J.W." hint="쉼표로 구분" />
        <FormField label="Venue" name="venue" defaultValue={pub?.venue ?? ""} placeholder="IEEE Transactions on Network and Service Management" />
        <FormField label="Details" name="details" defaultValue={pub?.details ?? ""} placeholder="vol. 21, no. 3, pp. 1234-1245" />
        <FormField label="Date" name="date" defaultValue={pub?.date ?? ""} placeholder="2025-06-15" hint="선택 사항 (YYYY-MM-DD)" />
        <FormField label="Tags" name="tags" defaultValue={pub?.tags.join(", ") ?? ""} placeholder="AI, Networking, Edge Computing" hint="쉼표로 구분" />
        <FormField label="PDF URL" name="pdfUrl" defaultValue={pub?.pdfUrl ?? ""} placeholder="https://example.com/paper.pdf" hint="선택 사항" />
        <FormField label="DOI URL" name="doiUrl" defaultValue={pub?.doiUrl ?? ""} placeholder="https://doi.org/10.1109/TNSM.2025.1234" hint="선택 사항" />
        <FormActions cancelHref="/publications" />
      </ValidatedForm>
    </div>
  );
}
