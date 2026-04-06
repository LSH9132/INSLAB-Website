import { readYaml } from "@/lib/content-io";
import { AnnouncementsSchema } from "@inslab/content-schemas";
import { saveAnnouncement, deleteAnnouncement } from "./actions";
import { redirect } from "next/navigation";
import { AnnouncementCard } from "./announcement-card";

export const dynamic = "force-dynamic";

export default function AnnouncementsPage() {
  const items = readYaml("announcements/announcements.yaml", AnnouncementsSchema);

  async function handleAdd(formData: FormData) {
    "use server";
    formData.set("index", "-1");
    const result = await saveAnnouncement({}, formData);
    if (result.errors) return; // redirect happens inside saveAnnouncement on success
  }

  async function handleCardSave(formData: FormData) {
    "use server";
    await saveAnnouncement({}, formData);
  }

  async function handleDelete(formData: FormData) {
    "use server";
    await deleteAnnouncement(Number(formData.get("index")));
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Announcements</h2>

      <div className="space-y-3 mb-8">
        {items.map((item, i) => (
          <AnnouncementCard
            key={i}
            item={item}
            index={i}
            saveAction={handleCardSave}
            deleteAction={handleDelete}
          />
        ))}
        {items.length === 0 && <p className="text-gray-400 text-sm">No announcements.</p>}
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-4">Add Announcement</h3>
      <form action={handleAdd} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Korean</label>
          <input name="ko" required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="🏆 ICC 2024 최우수 논문상 수상" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">English</label>
          <input name="en" required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="🏆 ICC 2024 Best Paper Award" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
          <p className="text-xs text-gray-400 mb-1">선택 사항. 내부 경로 (/news) 또는 외부 URL (https://...)</p>
          <input name="href" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="/news 또는 https://..." />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Add</button>
      </form>
    </div>
  );
}
