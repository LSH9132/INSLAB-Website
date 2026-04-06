"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
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

export type FormState = { errors?: Record<string, string> };

export async function saveAnnouncement(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
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
  } catch (err) {
    if (err instanceof ZodError) {
      return { errors: Object.fromEntries(err.issues.map((i) => [i.path.join("."), i.message])) };
    }
    return { errors: { _form: String(err) } };
  }
  redirect("/announcements?toast=saved");
}
