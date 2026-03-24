"use server";

import { revalidatePath } from "next/cache";
import { readYaml, writeYaml } from "@/lib/content-io";
import { MembersSchema, MemberSchema, type Member } from "@inslab/content-schemas";

const FILE = "team/members.yaml";

function getAll(): Member[] {
  return readYaml(FILE, MembersSchema);
}

export async function deleteMember(id: string) {
  const members = getAll().filter((m) => m.id !== id);
  writeYaml(FILE, members);
  revalidatePath("/team");
}

export async function bulkDeleteMembers(ids: string[]) {
  const members = getAll().filter((m) => !ids.includes(m.id));
  writeYaml(FILE, members);
  revalidatePath("/team");
}

export async function saveMember(formData: FormData) {
  const members = getAll();
  const entry = {
    id: formData.get("id") as string,
    name: {
      ko: formData.get("name_ko") as string,
      en: formData.get("name_en") as string,
    },
    role: formData.get("role") as Member["role"],
    photo: formData.get("photo") as string,
    enrollYear: Number(formData.get("enrollYear")),
    interests: (formData.get("interests") as string).split(",").map((s) => s.trim()).filter(Boolean),
    email: (formData.get("email") as string) || undefined,
    links: {
      scholar: (formData.get("links_scholar") as string) || undefined,
      github: (formData.get("links_github") as string) || undefined,
    },
  };

  MemberSchema.parse(entry);

  const idx = members.findIndex((m) => m.id === entry.id);
  if (idx >= 0) {
    members[idx] = entry;
  } else {
    members.push(entry);
  }

  writeYaml(FILE, members);
  revalidatePath("/team");
}
