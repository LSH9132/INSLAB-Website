"use server";

import { revalidatePath } from "next/cache";
import { readYaml, writeYaml } from "@/lib/content-io";
import { AnnouncementsSchema, AnnouncementSchema, type Announcement } from "@inslab/content-schemas";

const FILE = "announcements/announcements.yaml";

function getAll(): Announcement[] {
  return readYaml(FILE, AnnouncementsSchema);
}

export async function deleteAnnouncement(index: number) {
  const items = getAll();
  items.splice(index, 1);
  writeYaml(FILE, items);
  revalidatePath("/announcements");
}

export async function saveAnnouncement(formData: FormData) {
  const items = getAll();
  const entry = {
    ko: formData.get("ko") as string,
    en: formData.get("en") as string,
    href: (formData.get("href") as string) || undefined,
  };

  AnnouncementSchema.parse(entry);

  const idx = Number(formData.get("index"));
  if (idx >= 0 && idx < items.length) {
    items[idx] = entry;
  } else {
    items.push(entry);
  }

  writeYaml(FILE, items);
  revalidatePath("/announcements");
}
