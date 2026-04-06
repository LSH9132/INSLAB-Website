"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { readYaml, writeYaml } from "@/lib/content-io";
import { NewsItemsSchema, NewsItemSchema, type NewsItem } from "@inslab/content-schemas";

const FILE = "news/news-items.yaml";

function getAll(): NewsItem[] {
  return readYaml(FILE, NewsItemsSchema);
}

export async function deleteNewsItem(id: string) {
  writeYaml(FILE, getAll().filter((n) => n.id !== id));
  revalidatePath("/news");
}

export async function bulkDeleteNewsItems(ids: string[]) {
  writeYaml(FILE, getAll().filter((n) => !ids.includes(n.id)));
  revalidatePath("/news");
}

export type FormState = { errors?: Record<string, string> };

export async function saveNewsItem(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const items = getAll();
    const entry = {
      id: formData.get("id") as string,
      category: formData.get("category") as NewsItem["category"],
      date: formData.get("date") as string,
      title: {
        ko: formData.get("title_ko") as string,
        en: formData.get("title_en") as string,
      },
      description: {
        ko: formData.get("description_ko") as string,
        en: formData.get("description_en") as string,
      },
      imageUrl: formData.get("imageUrl") as string,
    };

    NewsItemSchema.parse(entry);

    const idx = items.findIndex((n) => n.id === entry.id);
    if (idx >= 0) {
      items[idx] = entry;
    } else {
      items.push(entry);
    }

    writeYaml(FILE, items);
    revalidatePath("/news");
  } catch (err) {
    if (err instanceof ZodError) {
      return { errors: Object.fromEntries(err.issues.map((i) => [i.path.join("."), i.message])) };
    }
    return { errors: { _form: String(err) } };
  }
  redirect("/news?toast=saved");
}
