"use server";

import { revalidatePath } from "next/cache";
import { readYaml, writeYaml } from "@/lib/content-io";
import { DirectorDataSchema, PublicationsSchema, PublicationSchema, type Publication } from "@inslab/content-schemas";

export async function saveDirectorData(formData: FormData) {
  const data = {
    education: JSON.parse(formData.get("education") as string),
    career: JSON.parse(formData.get("career") as string),
    projects: JSON.parse(formData.get("projects") as string),
    patents: JSON.parse(formData.get("patents") as string),
  };

  DirectorDataSchema.parse(data);
  writeYaml("director/director.yaml", data);
  revalidatePath("/director");
}

export async function deleteDirectorPublication(id: string) {
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);
  writeYaml("director/publications.yaml", pubs.filter((p) => p.id !== id));
  revalidatePath("/director");
}

export async function saveDirectorPublication(formData: FormData) {
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);
  const entry: Publication = {
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

  const idx = pubs.findIndex((p) => p.id === entry.id);
  if (idx >= 0) pubs[idx] = entry;
  else pubs.push(entry);

  writeYaml("director/publications.yaml", pubs);
  revalidatePath("/director");
}
