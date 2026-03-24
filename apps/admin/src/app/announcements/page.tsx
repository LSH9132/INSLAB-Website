import { readYaml } from "@/lib/content-io";
import { AnnouncementsSchema } from "@inslab/content-schemas";
import { saveAnnouncement, deleteAnnouncement } from "./actions";
import { ConfirmDeleteButton } from "@/components/confirm-delete-button";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AnnouncementsPage() {
  const items = readYaml("announcements/announcements.yaml", AnnouncementsSchema);

  async function handleAdd(formData: FormData) {
    "use server";
    formData.set("index", "-1");
    await saveAnnouncement(formData);
    redirect("/announcements");
  }

  async function handleDelete(formData: FormData) {
    "use server";
    await deleteAnnouncement(Number(formData.get("index")));
    redirect("/announcements");
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Announcements</h2>

      <div className="space-y-3 mb-8">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start justify-between gap-4">
            <div className="flex-1 text-sm">
              <p className="font-medium">{item.ko}</p>
              <p className="text-gray-500">{item.en}</p>
              {item.href && <p className="text-blue-600 text-xs mt-1">{item.href}</p>}
            </div>
            <form action={handleDelete}>
              <input type="hidden" name="index" value={i} />
              <ConfirmDeleteButton />
            </form>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-400 text-sm">No announcements.</p>}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4">Add Announcement</h3>
      <form action={handleAdd} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Korean</label>
          <input name="ko" required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">English</label>
          <input name="en" required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
          <input name="href" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Add</button>
      </form>
    </div>
  );
}
