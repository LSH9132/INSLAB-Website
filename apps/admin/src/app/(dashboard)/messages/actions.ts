"use server";

import { revalidatePath } from "next/cache";
import { readMessages, writeMessages } from "@/lib/content-io";

export async function saveMessages(formData: FormData) {
  const locale = formData.get("locale") as string;
  const content = formData.get("content") as string;

  const parsed = JSON.parse(content);
  writeMessages(locale, parsed);
  revalidatePath("/messages");
}
