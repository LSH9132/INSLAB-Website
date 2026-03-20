export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isValidLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}
