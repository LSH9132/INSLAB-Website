import { readYaml } from "@/lib/content-io";
import { NewsItemsSchema } from "@inslab/content-schemas";
import { saveNewsItem } from "../actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const CATEGORIES = ["Awards", "Papers", "Events", "Notices"] as const;

export default async function NewsEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const items = readYaml("news/news-items.yaml", NewsItemsSchema);
  const item = isNew ? null : items.find((n) => n.id === id);
  if (!isNew && !item) redirect("/news");

  async function handleSave(formData: FormData) {
    "use server";
    await saveNewsItem(formData);
    redirect("/news");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{isNew ? "Add News" : "Edit News"}</h2>
      <form action={handleSave} className="space-y-4">
        <Field label="ID" name="id" defaultValue={item?.id ?? ""} readOnly={!isNew} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select name="category" defaultValue={item?.category ?? "Notices"} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <Field label="Date (YYYY-MM-DD)" name="date" defaultValue={item?.date ?? new Date().toISOString().slice(0, 10)} />
        <Field label="Title (KO)" name="title_ko" defaultValue={item?.title.ko ?? ""} />
        <Field label="Title (EN)" name="title_en" defaultValue={item?.title.en ?? ""} />
        <Textarea label="Description (KO)" name="description_ko" defaultValue={item?.description.ko ?? ""} />
        <Textarea label="Description (EN)" name="description_en" defaultValue={item?.description.en ?? ""} />
        <Field label="Image URL" name="imageUrl" defaultValue={item?.imageUrl ?? ""} />
        <div className="flex gap-3 pt-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Save</button>
          <a href="/news" className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">Cancel</a>
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

function Textarea({ label, name, defaultValue }: { label: string; name: string; defaultValue: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={3}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
    </div>
  );
}
