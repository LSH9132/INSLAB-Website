"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { readYaml, writeYaml } from "@/lib/content-io";
import { ResearchAreasSchema, ResearchAreaSchema, type ResearchArea } from "@inslab/content-schemas";

const FILE = "research/areas.yaml";

function getAll(): ResearchArea[] {
  return readYaml(FILE, ResearchAreasSchema);
}

export async function deleteResearchArea(id: string) {
  writeYaml(FILE, getAll().filter((a) => a.id !== id));
  revalidatePath("/research");
}

export async function bulkDeleteResearchAreas(ids: string[]) {
  writeYaml(FILE, getAll().filter((a) => !ids.includes(a.id)));
  revalidatePath("/research");
}

export type FormState = { errors?: Record<string, string> };

export async function saveResearchArea(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const areas = getAll();
    const entry = {
      id: formData.get("id") as string,
      title: {
        ko: formData.get("title_ko") as string,
        en: formData.get("title_en") as string,
      },
      description: {
        ko: formData.get("description_ko") as string,
        en: formData.get("description_en") as string,
      },
      keywords: (formData.get("keywords") as string).split(",").map((s) => s.trim()).filter(Boolean),
      papers: JSON.parse((formData.get("papers") as string) || "[]"),
    };

    ResearchAreaSchema.parse(entry);

    const idx = areas.findIndex((a) => a.id === entry.id);
    if (idx >= 0) {
      areas[idx] = entry;
    } else {
      areas.push(entry);
    }

    writeYaml(FILE, areas);
    revalidatePath("/research");
  } catch (err) {
    if (err instanceof ZodError) {
      return { errors: Object.fromEntries(err.issues.map((i) => [i.path.join("."), i.message])) };
    }
    if (err instanceof SyntaxError) {
      return { errors: { papers: "Invalid JSON: " + err.message } };
    }
    return { errors: { _form: String(err) } };
  }
  redirect("/research?toast=saved");
}
