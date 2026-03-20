import type en from "@/dictionaries/en.json";
import type { Locale } from "./i18n-config";

export type Dictionary = typeof en;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await import(`@/dictionaries/${locale}.json`)) as Dictionary;
}
