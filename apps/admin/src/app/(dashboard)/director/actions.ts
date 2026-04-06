"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ZodError } from "zod";
import { readYaml, writeYaml } from "@/lib/content-io";
import { DirectorDataSchema, PublicationsSchema, PublicationSchema, type Publication } from "@inslab/content-schemas";

export type FormState = { errors?: Record<string, string> };

export async function saveDirectorData(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const data = {
      education: JSON.parse(formData.get("education") as string),
      career: JSON.parse(formData.get("career") as string),
      projects: JSON.parse(formData.get("projects") as string),
      patents: JSON.parse(formData.get("patents") as string),
    };

    DirectorDataSchema.parse(data);
    writeYaml("director/director.yaml", data);
    revalidatePath("/director");
  } catch (err) {
    if (err instanceof ZodError) {
      return { errors: Object.fromEntries(err.issues.map((i) => [i.path.join("."), i.message])) };
    }
    if (err instanceof SyntaxError) {
      return { errors: { _form: "Invalid JSON: " + err.message } };
    }
    return { errors: { _form: String(err) } };
  }
  redirect("/director?toast=saved");
}

export async function deleteDirectorPublication(id: string) {
  const pubs = readYaml("director/publications.yaml", PublicationsSchema);
  writeYaml("director/publications.yaml", pubs.filter((p) => p.id !== id));
  revalidatePath("/director");
}

export async function saveDirectorPublication(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
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
      pdfUrl: (formData.get("pdfUrl") as string) || "",
      doiUrl: (formData.get("doiUrl") as string) || "",
    };

    PublicationSchema.parse(entry);

    const idx = pubs.findIndex((p) => p.id === entry.id);
    if (idx >= 0) pubs[idx] = entry;
    else pubs.push(entry);

    writeYaml("director/publications.yaml", pubs);
    revalidatePath("/director");
  } catch (err) {
    if (err instanceof ZodError) {
      return { errors: Object.fromEntries(err.issues.map((i) => [i.path.join("."), i.message])) };
    }
    return { errors: { _form: String(err) } };
  }
  redirect("/director?toast=saved");
}
