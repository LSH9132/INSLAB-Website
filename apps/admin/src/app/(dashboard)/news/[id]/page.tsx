import { readYaml } from "@/lib/content-io";
import { NewsItemsSchema } from "@inslab/content-schemas";
import { saveNewsItem } from "../actions";
import { redirect } from "next/navigation";
import { FormField, FormSelect, FormTextarea, FormActions, UnsavedChangesGuard, ValidatedForm } from "@/components/form";
import { ImageUpload } from "@/components/image-upload";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Awards", "Papers", "Events", "Notices"] as const;

export default async function NewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const items = readYaml("news/news-items.yaml", NewsItemsSchema);
  const item = isNew ? null : items.find((n) => n.id === id);
  if (!isNew && !item) redirect("/news");

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{isNew ? "Add News" : "Edit News"}</h2>
      <ValidatedForm action={saveNewsItem} className="space-y-4">
        <UnsavedChangesGuard />
        <FormField label="ID" name="id" defaultValue={item?.id ?? ""} readOnly={!isNew} placeholder="news-2025-icc-award" hint="고유 식별자 (영문 소문자, 하이픈)" />
        <FormSelect label="Category" name="category" options={CATEGORIES} defaultValue={item?.category ?? "Notices"} />
        <FormField label="Date" name="date" defaultValue={item?.date ?? new Date().toISOString().slice(0, 10)} placeholder="2025-06-15" hint="YYYY-MM-DD 형식" />
        <FormField label="Title (KO)" name="title_ko" defaultValue={item?.title.ko ?? ""} />
        <FormField label="Title (EN)" name="title_en" defaultValue={item?.title.en ?? ""} />
        <FormTextarea label="Description (KO)" name="description_ko" defaultValue={item?.description.ko ?? ""} rows={3} />
        <FormTextarea label="Description (EN)" name="description_en" defaultValue={item?.description.en ?? ""} rows={3} />
        <ImageUpload name="imageUrl" subdir="news" defaultValue={item?.imageUrl ?? ""} />
        <FormActions cancelHref="/news" />
      </ValidatedForm>
    </div>
  );
}
