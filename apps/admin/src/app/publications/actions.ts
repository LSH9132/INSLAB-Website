"use server";

import { revalidatePath } from "next/cache";
import { readYaml, writeYaml } from "@/lib/content-io";
import { PublicationsSchema, PublicationSchema, type Publication } from "@inslab/content-schemas";

const FILES: Record<string, string> = {
  Journal: "publications/journals.yaml",
  Conference: "publications/conferences.yaml",
  Domestic: "publications/domestic.yaml",
};

function getAll(type: string): Publication[] {
  return readYaml(FILES[type], PublicationsSchema);
}

export async function deletePublication(id: string) {
  for (const [type, file] of Object.entries(FILES)) {
    const pubs = getAll(type);
    const filtered = pubs.filter((p) => p.id !== id);
    if (filtered.length < pubs.length) {
      writeYaml(file, filtered);
      break;
    }
  }
  revalidatePath("/publications");
}

export async function bulkDeletePublications(ids: string[]) {
  const idSet = new Set(ids);
  for (const [type, file] of Object.entries(FILES)) {
    const pubs = getAll(type).filter((p) => !idSet.has(p.id));
    writeYaml(file, pubs);
  }
  revalidatePath("/publications");
}

export async function savePublication(formData: FormData) {
  const entry = {
    id: formData.get("id") as string,
    year: Number(formData.get("year")),
    type: formData.get("type") as Publication["type"],
    title: formData.get("title") as string,
    authors: (formData.get("authors") as string).split(",").map((s) => s.trim()).filter(Boolean),
    venue: formData.get("venue") as string,
    details: formData.get("details") as string,
    date: (formData.get("date") as string) || undefined,
    tags: (formData.get("tags") as string).split(",").map((s) => s.trim()).filter(Boolean),
    pdfUrl: formData.get("pdfUrl") as string,
    doiUrl: formData.get("doiUrl") as string,
  };

  PublicationSchema.parse(entry);

  const file = FILES[entry.type];
  const pubs = getAll(entry.type);
  const idx = pubs.findIndex((p) => p.id === entry.id);

  if (idx >= 0) {
    pubs[idx] = entry;
  } else {
    // Remove from other type files if type changed
    for (const [t, f] of Object.entries(FILES)) {
      if (t !== entry.type) {
        const others = getAll(t);
        const filtered = others.filter((p) => p.id !== entry.id);
        if (filtered.length < others.length) writeYaml(f, filtered);
      }
    }
    pubs.push(entry);
  }

  writeYaml(file, pubs);
  revalidatePath("/publications");
}
