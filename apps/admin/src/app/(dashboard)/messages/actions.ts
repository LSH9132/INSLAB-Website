"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readMessages, writeMessages } from "@/lib/content-io";

export type FormState = { errors?: Record<string, string> };

const REQUIRED_KEYS = ["nav", "footer", "home", "publications", "Director", "team", "research", "contact", "news", "join"];

export async function saveMessages(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const locale = formData.get("locale") as string;
    const content = formData.get("content") as string;

    const parsed = JSON.parse(content);

    // Basic structure validation
    const missing = REQUIRED_KEYS.filter((k) => !(k in parsed));
    if (missing.length > 0) {
      return { errors: { content: `Missing required keys: ${missing.join(", ")}` } };
    }

    writeMessages(locale, parsed);
    revalidatePath("/messages");
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { errors: { content: "Invalid JSON: " + err.message } };
    }
    return { errors: { _form: String(err) } };
  }
  redirect("/messages?toast=saved");
}
