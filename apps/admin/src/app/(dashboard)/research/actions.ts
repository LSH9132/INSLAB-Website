"use server";

import { revalidatePath } from "next/cache";
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

export async function saveResearchArea(formData: FormData) {
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
}
